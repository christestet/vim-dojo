#!/bin/sh
set -eu

port="${PORT:-4174}"
session="vim-dojo-smoke-$$"
log_file="$(mktemp)"

python3 -m http.server "$port" --bind 127.0.0.1 >"$log_file" 2>&1 &
server_pid=$!
trap 'agent-browser --session "$session" close >/dev/null 2>&1 || true; kill "$server_pid" >/dev/null 2>&1 || true; wait "$server_pid" 2>/dev/null || true; rm -f "$log_file"' EXIT

attempt=0
until curl --fail --silent --output /dev/null "http://127.0.0.1:$port"; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 50 ]; then
    echo "Local test server did not become ready" >&2
    exit 1
  fi
  sleep 0.1
done

agent-browser --session "$session" open "http://127.0.0.1:$port" >/dev/null
agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map(registration => registration.unregister()));
  await Promise.all((await caches.keys()).map(key => caches.delete(key)));
  localStorage.setItem("keiko-vim-dojo-v1", JSON.stringify({ welcomed: true }));
  location.reload();
})();
JS
agent-browser --session "$session" wait --load networkidle >/dev/null

agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(() => {
  const editorElement = document.querySelector("#editorShell");
  const hint = document.querySelector("#hintBox");
  const fire = (target, key, extra = {}) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...extra });
    target.dispatchEvent(event);
    return event;
  };
  if (document.activeElement !== editorElement) throw new Error("Editor did not receive initial focus");
  if (fire(editorElement, "ArrowLeft", { ctrlKey: true }).defaultPrevented) throw new Error("Modified arrow was intercepted");
  if (fire(editorElement, "Tab", { ctrlKey: true }).defaultPrevented) throw new Error("Browser tab shortcut was intercepted");
  const hintWasHidden = hint.hidden;
  fire(editorElement, "?");
  if (hint.hidden !== hintWasHidden) throw new Error("Vim ? toggled the app hint");
  fire(editorElement, "g");
  if (document.querySelector("#commandPalette").open) throw new Error("App command opened inside Vim");
  document.body.classList.add("focus-mode");
  fire(editorElement, "Tab");
  if (document.activeElement !== document.querySelector("#toggleFocus")) throw new Error("Focus mode trapped Tab in Vim");
  document.body.classList.remove("focus-mode");
})();
JS

agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(() => {
  const fire = (target, key) => target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  const hintButton = document.querySelector("#hintButton");
  const palette = document.querySelector("#commandPalette");
  hintButton.focus();
  fire(hintButton, "g");
  fire(palette, "p");
  if (!document.querySelector("#pathView").open) throw new Error("g p did not open Path");
})();
JS
agent-browser --session "$session" press Escape >/dev/null
agent-browser --session "$session" wait 250 >/dev/null

agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(() => {
  const fire = (target, key) => target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  const palette = document.querySelector("#commandPalette");
  const hintButton = document.querySelector("#hintButton");
  if (document.activeElement !== document.querySelector("#editorShell")) {
    throw new Error(`Path did not return focus to Vim (focused: ${document.activeElement.id || document.activeElement.tagName})`);
  }
  hintButton.focus();
  fire(hintButton, "g");
  fire(palette, "b");
  const handbook = document.querySelector("#handbookView");
  const search = document.querySelector("#commandSearch");
  search.focus();
  fire(search, "g");
  if (!handbook.open || palette.open) throw new Error("Typing context leaked into app commands");
})();
JS
agent-browser --session "$session" press Shift+Tab >/dev/null
agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
if (!document.querySelector("#handbookView").contains(document.activeElement)) throw new Error("Dialog focus escaped");
JS

agent-browser --session "$session" press Escape >/dev/null
agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(() => {
  showView("xpath");
  if (xpathInput.placeholder === xpathLessons[0].answer) throw new Error("XPath placeholder reveals the answer");
  if (xpathSpecimen.querySelectorAll("plate").length !== 3) throw new Error("XPath diner did not render its opening plate set");
  const dinerTags = new Set(xpathLessons.flatMap(lesson => [...new DOMParser().parseFromString(lesson.source, "text/html").body.querySelectorAll("*")].map(node => node.localName)));
  ["plate", "bento", "apple", "orange", "pickle"].forEach(tag => {
    if (!dinerTags.has(tag)) throw new Error(`XPath diner is missing its ${tag} object`);
  });
  for (let index = 0; index < xpathLessons.length; index++) {
    loadXPathLesson(index);
    xpathInput.value = xpathLessons[index].answer;
    runXPathSelection({ preventDefault() {} });
    if (!progress.xpathCompleted.includes(index)) throw new Error(`XPath lesson ${index + 1} did not complete`);
  }
  if (!xpathFeedback.textContent.startsWith("Path complete")) throw new Error("Final XPath lesson has no completion state");
  if ((progress.vimDaily[todayKey()] || 0) !== 0) throw new Error("XPath work leaked into the Vim daily goal");
  if ((progress.xpathDaily[todayKey()] || 0) !== xpathLessons.length) throw new Error("XPath daily goal did not track XPath lessons");

  loadXPathLesson(0);
  xpathInput.value = "//section/*";
  runXPathSelection({ preventDefault() {} });
  if (!xpathFeedback.classList.contains("good")) throw new Error("Equivalent XPath expression was rejected");

  xpathInput.value = "///";
  runXPathSelection({ preventDefault() {} });
  if (!xpathFeedback.classList.contains("error") || xpathMatchCount.textContent !== "syntax error") throw new Error("Invalid XPath was not explained");

  xpathHint.click();
  if (!xpathHintDetails.open) throw new Error("Native XPath clue disclosure did not open");
})();
JS

echo "browser smoke: ok"
