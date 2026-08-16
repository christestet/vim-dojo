#!/bin/sh
set -eu

port="${PORT:-4174}"
session="vim-dojo-smoke-$$"
log_file="$(mktemp)"

python3 -m http.server "$port" --bind 127.0.0.1 >"$log_file" 2>&1 &
server_pid=$!
trap 'agent-browser --session "$session" close >/dev/null 2>&1 || true; kill "$server_pid" >/dev/null 2>&1 || true; wait "$server_pid" 2>/dev/null || true; rm -f "$log_file"' EXIT

agent-browser --session "$session" open "http://127.0.0.1:$port" >/dev/null
agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
localStorage.setItem("keiko-vim-dojo-v1", JSON.stringify({ welcomed: true }));
location.reload();
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
agent-browser --session "$session" wait 50 >/dev/null

agent-browser --session "$session" eval --stdin >/dev/null <<'JS'
(() => {
  const fire = (target, key) => target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  const palette = document.querySelector("#commandPalette");
  const hintButton = document.querySelector("#hintButton");
  if (document.activeElement !== document.querySelector("#editorShell")) throw new Error("Path did not return focus to Vim");
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

echo "keyboard smoke: ok"
