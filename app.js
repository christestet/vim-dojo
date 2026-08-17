const missions = [
  {
    id: "balance", chapter: "The home row", chapterNo: 1, glyph: "h", title: "Find your balance", filename: "balance.txt",
    kicker: "MOVE WITHOUT ARROWS", briefTitle: "Land on the spark.",
    copy: "Use the four keys under your right hand to reach the highlighted character.", targetText: "the glowing a in balance",
    lines: ["stillness before speed", "keep your hands at home", "find your balance"], start: [1, 15], target: [2, 11],
    keys: [["h", "left"], ["j", "down"], ["k", "up"], ["l", "right"]], hint: "Move down with <code>j</code>, then use <code>h</code> to travel left.", par: 5,
    success: s => s.row === 2 && s.col === 11
  },
  {
    id: "words", chapter: "The home row", chapterNo: 1, glyph: "w", title: "Leap by words", filename: "dispatch.js",
    kicker: "THINK IN WORDS", briefTitle: "Reach the harbor.",
    copy: "Stop crawling character by character. Jump to the start of the target word.", targetText: "the word harbor",
    lines: ["send the little boat toward the quiet harbor", "slow keys make long journeys"], start: [0, 0], target: [0, 38],
    keys: [["w", "next word"], ["b", "previous word"], ["e", "word end"]], hint: "Tap <code>w</code> once per word. Vim treats punctuation as its own stop.", par: 7,
    success: s => s.row === 0 && s.col === 38
  },
  {
    id: "edges", chapter: "The home row", chapterNo: 1, glyph: "$", title: "Own the line", filename: "edges.py",
    kicker: "SKIP THE COMMUTE", briefTitle: "Jump to the edge.",
    copy: "A whole line is only one motion wide. Land on its final character.", targetText: "the final semicolon",
    lines: ["const message = prepare_for_launch();", "const delay = 200;"], start: [0, 8], target: [0, 36],
    keys: [["0", "line start"], ["^", "first text"], ["$", "line end"]], hint: "The end-of-line symbol in many terminals is also the answer: <code>$</code>.", par: 1,
    success: s => s.row === 0 && s.col === 36
  },
  {
    id: "file-jumps", chapter: "Fast travel", chapterNo: 2, glyph: "G", title: "Cross the file", filename: "waypoints.md",
    kicker: "TRAVEL FARTHER", briefTitle: "Reach the last waypoint.",
    copy: "Jump across the whole buffer without paying per line.", targetText: "the start of LAST STOP",
    lines: ["FIRST STOP", "mist on the ridge", "a bridge over stone", "cedars bend slowly", "the path narrows", "LAST STOP"], start: [0, 0], target: [5, 0],
    keys: [["gg", "file start"], ["G", "file end"]], hint: "A capital <code>G</code> goes to the last line. Lowercase <code>gg</code> returns home.", par: 1,
    success: s => s.row === 5 && s.col === 0
  },
  {
    id: "find-char", chapter: "Fast travel", chapterNo: 2, glyph: "f", title: "Find the character", filename: "signal.txt",
    kicker: "AIM, THEN MOVE", briefTitle: "Catch the signal.",
    copy: "Tell Vim which character you want next. Land on the x in one command.", targetText: "the x in transmission",
    lines: ["incoming transmission: x marks the signal"], start: [0, 0], target: [0, 23],
    keys: [["f{char}", "find forward"], ["F{char}", "find backward"]], hint: "Type <code>fx</code>: find the next x on this line.", par: 1,
    success: s => s.row === 0 && s.col === 23
  },
  {
    id: "delete-char", chapter: "Make a change", chapterNo: 3, glyph: "x", title: "Remove the splinter", filename: "fixme.js",
    kicker: "EDIT IN NORMAL MODE", briefTitle: "Delete the extra p.",
    copy: "The cursor is already on the typo. Remove exactly one character without entering Insert mode.", targetText: "print(message);",
    lines: ["pprint(message);", "return true;"], start: [0, 0], target: null,
    keys: [["x", "delete character"], ["u", "undo"]], hint: "In Normal mode, <code>x</code> deletes the character under the cursor.", par: 1,
    success: s => s.lines[0] === "print(message);"
  },
  {
    id: "delete-word", chapter: "Make a change", chapterNo: 3, glyph: "dw", title: "Cut the clutter", filename: "clean.txt",
    kicker: "VERB + MOTION", briefTitle: "Delete one word.",
    copy: "Combine delete with a word motion. Remove “very ” while leaving the sentence clean.", targetText: "A focused editor moves fast.",
    lines: ["A focused editor moves very fast."], start: [0, 23], target: null,
    keys: [["d", "delete…"], ["w", "…to next word"]], hint: "Compose the command: <code>d</code> (delete) + <code>w</code> (to next word).", par: 2,
    success: s => s.lines[0] === "A focused editor moves fast."
  },
  {
    id: "delete-line", chapter: "Make a change", chapterNo: 3, glyph: "dd", title: "Drop the bad line", filename: "recipe.txt",
    kicker: "DOUBLE THE OPERATOR", briefTitle: "Remove the burnt step.",
    copy: "Delete the entire active line. Repeating a linewise operator applies it to the whole line.", targetText: "three clean recipe steps",
    lines: ["mix the flour", "burn everything", "fold in the butter", "bake until golden"], start: [1, 0], target: null,
    keys: [["dd", "delete line"], ["u", "undo"]], hint: "Repeat delete: <code>dd</code> removes the current line.", par: 2,
    success: s => s.lines.length === 3 && !s.lines.includes("burn everything")
  },
  {
    id: "insert", chapter: "Change modes", chapterNo: 4, glyph: "i", title: "Step into Insert", filename: "greeting.txt",
    kicker: "CHANGE MODES ON PURPOSE", briefTitle: "Complete the greeting.",
    copy: "Enter Insert mode, type “Hello, ” before Vim, then return to Normal mode with Escape.", targetText: "Hello, Vim! in Normal mode",
    lines: ["Vim!"], start: [0, 0], target: null,
    keys: [["i", "insert before"], ["Esc", "back to Normal"]], hint: "Type <code>i</code>, then <code>Hello, </code>, then press <code>Esc</code>.", par: 9,
    success: s => s.lines[0] === "Hello, Vim!" && s.mode === "normal"
  },
  {
    id: "change-word", chapter: "Speak Vim", chapterNo: 5, glyph: "ciw", title: "Change from within", filename: "status.js",
    kicker: "OPERATOR + TEXT OBJECT", briefTitle: "Change the status.",
    copy: "Replace the word “broken” with “ready” without first selecting its boundaries.", targetText: "const status = \"ready\";",
    lines: ["const status = \"broken\";"], start: [0, 17], target: null,
    keys: [["c", "change…"], ["iw", "…inside word"], ["Esc", "finish"]], hint: "Use <code>ciw</code>, type <code>ready</code>, then press <code>Esc</code>.", par: 9,
    success: s => s.lines[0] === "const status = \"ready\";" && s.mode === "normal"
  },
  {
    id: "count", chapter: "Speak Vim", chapterNo: 5, glyph: "3w", title: "Count your steps", filename: "market.txt",
    kicker: "MULTIPLY A MOTION", briefTitle: "Jump three words.",
    copy: "Prefix a motion with a count. Reach “plums” with one composed command.", targetText: "the word plums",
    lines: ["apples pears peaches plums cherries"], start: [0, 0], target: [0, 21],
    keys: [["3", "three times"], ["w", "next word"]], hint: "Counts come before motions. Type <code>3w</code> as a single thought.", par: 2,
    success: s => s.row === 0 && s.col === 21
  },
  {
    id: "final", chapter: "First belt", chapterNo: 6, glyph: "✦", title: "The first belt", filename: "final.kata",
    kicker: "MIX WHAT YOU KNOW", briefTitle: "Repair the launch note.",
    copy: "Delete the bad line. Then change “almost” to “ready” and finish in Normal mode.", targetText: "a clean, ready launch note",
    lines: ["launch status: almost", "ignore this broken line", "systems are steady"], start: [1, 0], target: null,
    keys: [["dd", "delete line"], ["ciw", "change word"], ["Esc", "finish"]], hint: "First <code>dd</code>. Move with <code>k</code> then <code>3w</code>, use <code>ciw</code>, type ready, and <code>Esc</code>.", par: 14,
    success: s => s.lines.length === 2 && s.lines[0] === "launch status: ready" && s.mode === "normal"
  },
  {
    id: "diff-next", chapter: "Patch patrol", chapterNo: 7, glyph: "]c", world: "diff", title: "Track the change", filename: "timeout.diff",
    kicker: "PATCH PATROL · 01", briefTitle: "Jump to the first change.",
    copy: "A patch just landed. Skip its context and jump straight to the next changed block.", targetText: "the removed timeout line",
    lines: ["@@ -12,4 +12,4 @@", " const retries = 3;", "-const timeout = 3000;", "+const timeout = 5000;", " return connect();"], start: [0, 0], target: [2, 0],
    keys: [["]c", "next change"], ["[c", "previous change"]], hint: "In Vim diff mode, <code>]c</code> jumps forward to the next change.", par: 2,
    success: s => s.row === 2 && s.col === 0
  },
  {
    id: "diff-previous", chapter: "Patch patrol", chapterNo: 7, glyph: "[c", world: "diff", title: "Backtrack the patch", filename: "timeout.diff",
    kicker: "PATCH PATROL · 02", briefTitle: "Return to the addition.",
    copy: "You overshot the patch. Jump backward to the previous changed line.", targetText: "the added timeout line",
    lines: ["@@ -12,4 +12,4 @@", " const retries = 3;", "-const timeout = 3000;", "+const timeout = 5000;", " return connect();"], start: [4, 0], target: [3, 0],
    keys: [["[c", "previous change"], ["]c", "next change"]], hint: "Square bracket points backward: type <code>[c</code>.", par: 2,
    success: s => s.row === 3 && s.col === 0
  },
  {
    id: "diff-hunk", chapter: "Patch patrol", chapterNo: 7, glyph: "/@@", world: "diff", title: "Find the next hunk", filename: "release.diff",
    kicker: "PATCH PATROL · 03", briefTitle: "Scan the patch header.",
    copy: "Large patches have hunk markers. Search forward for the next one instead of scrolling.", targetText: "the second @@ hunk header",
    lines: ["@@ -4,3 +4,4 @@ render()", " const view = mount();", "+track(view);", " return view;", "", "@@ -28,2 +29,2 @@ save()", "-flush(false);", "+flush(true);"], start: [1, 0], target: [5, 0],
    keys: [["/", "search"], ["Enter", "jump"], ["n", "next match"]], hint: "Type <code>/@@</code> and press <code>Enter</code>.", par: 4,
    success: s => s.row === 5 && s.col === 0
  },
  {
    id: "diff-fix", chapter: "Patch patrol", chapterNo: 7, glyph: "ciw", world: "diff", title: "Repair the addition", filename: "theme.diff",
    kicker: "PATCH PATROL · FINAL", briefTitle: "Fix the suspicious value.",
    copy: "The new line contains a typo. Change only the value inside the word, then return to Normal mode.", targetText: "+const colour = \"blue\";",
    lines: ["@@ -8,1 +8,1 @@", "-const colour = \"navy\";", "+const colour = \"bleu\";"], start: [2, 18], target: null,
    keys: [["ciw", "change word"], ["Esc", "finish patch"]], hint: "Use <code>ciw</code>, type <code>blue</code>, then press <code>Esc</code>.", par: 8,
    success: s => s.lines[2] === "+const colour = \"blue\";" && s.mode === "normal"
  },
  {
    id: "log-search", chapter: "Incident room", chapterNo: 8, glyph: "/", world: "logs", title: "Raise the alarm", filename: "payments.log",
    kicker: "INCIDENT · 02:17 AM", briefTitle: "Find the first error.",
    copy: "Production is noisy. Search for the signal instead of reading every line.", targetText: "ERROR in the fourth log line",
    lines: ["[INFO] worker started", "[DEBUG] heartbeat ok", "[WARN] queue depth 91", "[ERROR] payment timed out", "[INFO] retry scheduled"], start: [0, 0], target: [3, 1],
    keys: [["/ERROR", "search forward"], ["Enter", "run search"]], hint: "Type <code>/ERROR</code>, then press <code>Enter</code>.", par: 7,
    success: s => s.row === 3 && s.col === 1
  },
  {
    id: "log-next", chapter: "Incident room", chapterNo: 8, glyph: "n", world: "logs", title: "Follow the failures", filename: "checkout.log",
    kicker: "INCIDENT · TRACE", briefTitle: "Find the next error.",
    copy: "The first failure is selected and the search is remembered. Repeat it to find the next occurrence.", targetText: "the second ERROR",
    lines: ["[INFO] checkout opened", "[ERROR] card declined", "[INFO] fallback started", "[WARN] fallback slow", "[ERROR] fallback failed"], start: [1, 1], target: [4, 1], presetSearch: "ERROR",
    keys: [["n", "next result"], ["N", "previous result"]], hint: "Vim remembers the last search. Press lowercase <code>n</code>.", par: 1,
    success: s => s.row === 4 && s.col === 1
  },
  {
    id: "log-previous", chapter: "Incident room", chapterNo: 8, glyph: "N", world: "logs", title: "Reverse the trail", filename: "checkout.log",
    kicker: "INCIDENT · TRACE", briefTitle: "Return to the first failure.",
    copy: "Search direction matters. Walk the remembered search backward.", targetText: "the previous ERROR",
    lines: ["[INFO] checkout opened", "[ERROR] card declined", "[INFO] fallback started", "[WARN] fallback slow", "[ERROR] fallback failed"], start: [4, 1], target: [1, 1], presetSearch: "ERROR",
    keys: [["N", "opposite direction"], ["n", "same direction"]], hint: "Capital <code>N</code> repeats the search in the opposite direction.", par: 1,
    success: s => s.row === 1 && s.col === 1
  },
  {
    id: "log-star", chapter: "Incident room", chapterNo: 8, glyph: "*", world: "logs", title: "Trace the request", filename: "gateway.log",
    kicker: "INCIDENT · CORRELATE", briefTitle: "Find this request again.",
    copy: "The request ID is already under your cursor. Search for its next appearance without typing it.", targetText: "req7 on the retry line",
    lines: ["[ERROR] req7 failed", "[INFO] req8 completed", "[WARN] req7 retrying", "[INFO] req9 completed"], start: [0, 8], target: [2, 7],
    keys: [["*", "word under cursor"], ["n", "next occurrence"]], hint: "Press <code>*</code> to search forward for the word beneath the cursor.", par: 1,
    success: s => s.row === 2 && s.col === 7
  },
  {
    id: "log-trim", chapter: "Incident room", chapterNo: 8, glyph: "dG", world: "logs", title: "Cut the stack noise", filename: "crash.log",
    kicker: "INCIDENT · CLEANUP", briefTitle: "Keep only the summary.",
    copy: "The useful summary is followed by disposable stack noise. Delete from here to the end of the file.", targetText: "only the failure summary remains",
    lines: ["summary: request failed", "stack: at charge()", "stack: at retry()", "debug: payload dumped"], start: [1, 0], target: null,
    keys: [["d", "delete…"], ["G", "…to file end"]], hint: "Compose <code>dG</code>: delete from the cursor line to the end of the file.", par: 2,
    success: s => s.lines.length === 1 && s.lines[0] === "summary: request failed"
  },
  {
    id: "json-match", chapter: "Structure lab", chapterNo: 9, glyph: "%", world: "json", title: "Match the boundary", filename: "service.json",
    kicker: "STRUCTURE LAB · JSON", briefTitle: "Close the service object.",
    copy: "Nested data is easier when braces become doorways. Jump from this opening brace to its match.", targetText: "the matching service brace",
    lines: ["{", "  \"service\": {", "    \"name\": \"keiko\",", "    \"port\": 8787", "  }", "}"], start: [1, 13], target: [4, 2],
    keys: [["%", "matching bracket"], ["[{", "outer opening"]], hint: "With the cursor on <code>{</code>, press <code>%</code>.", par: 1,
    success: s => s.row === 4 && s.col === 2
  },
  {
    id: "json-string", chapter: "Structure lab", chapterNo: 9, glyph: "ci\"", world: "json", title: "Change the value", filename: "deploy.json",
    kicker: "STRUCTURE LAB · JSON", briefTitle: "Ready the deployment.",
    copy: "Change only the text inside the quotes. Leave the JSON punctuation untouched.", targetText: "status is \"ready\"",
    lines: ["{", "  \"status\": \"broken\",", "  \"retries\": 3", "}"], start: [1, 15], target: null,
    keys: [["ci\"", "change in quotes"], ["Esc", "finish"]], hint: "Type <code>ci\"</code>, enter <code>ready</code>, then press <code>Esc</code>.", par: 9,
    success: s => s.lines[1] === "  \"status\": \"ready\"," && s.mode === "normal"
  },
  {
    id: "json-object", chapter: "Structure lab", chapterNo: 9, glyph: "di{", world: "json", title: "Empty the debug object", filename: "profile.json",
    kicker: "STRUCTURE LAB · JSON", briefTitle: "Remove the object contents.",
    copy: "Delete everything inside the nearest braces while preserving the JSON object itself.", targetText: "an empty debug object: {}",
    lines: ["{", "  \"user\": \"ada\",", "  \"debug\": {", "    \"trace\": true", "  },", "  \"ready\": true", "}"], start: [3, 8], target: null,
    keys: [["di{", "delete in braces"], ["u", "undo"]], hint: "Use the brace text object: <code>di{</code>.", par: 3,
    success: s => s.lines.length === 5 && s.lines[2] === "  \"debug\": {},"
  },
  {
    id: "xml-inner", chapter: "Markup temple", chapterNo: 10, glyph: "cit", world: "xml", title: "Change inside the tag", filename: "status.xml",
    kicker: "MARKUP TEMPLE · XML", briefTitle: "Repair the status node.",
    copy: "Replace the element’s text while preserving both opening and closing tags.", targetText: "<status>ready</status>",
    lines: ["<service>", "  <status>broken</status>", "  <port>8787</port>", "</service>"], start: [1, 12], target: null,
    keys: [["cit", "change inside tag"], ["Esc", "finish"]], hint: "Type <code>cit</code>, enter <code>ready</code>, then press <code>Esc</code>.", par: 9,
    success: s => s.lines[1] === "  <status>ready</status>" && s.mode === "normal"
  },
  {
    id: "xml-around", chapter: "Markup temple", chapterNo: 10, glyph: "dat", world: "xml", title: "Remove the debug node", filename: "service.xml",
    kicker: "MARKUP TEMPLE · FINAL", briefTitle: "Delete the whole element.",
    copy: "Remove the debug text and both surrounding tags as one structural object.", targetText: "the debug element is gone",
    lines: ["<service>", "  <debug>temporary trace</debug>", "  <status>ready</status>", "</service>"], start: [1, 12], target: null,
    keys: [["dat", "delete around tag"], ["u", "undo"]], hint: "Use <code>dat</code>: delete around the current tag.", par: 3,
    success: s => s.lines[1].trim() === "" && !s.lines.join("\n").includes("<debug>")
  }
];

const xpathLessons = [
  {
    chapter: "Roots", concept: "DESCENDANTS", title: "Call every card",
    prompt: "Select every recipe card.", explanation: "Double slash searches through every descendant in the document.",
    syntax: "//element", answer: "//article", placeholder: "//article",
    hint: "Use the element name after a double slash: <code>//article</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card" data-kind="tea">
    <h3>Matcha Cloud</h3><p>green tea · rice</p>
  </article>
  <article class="treat-card special" data-kind="fruit">
    <h3>Citrus Moon</h3><p>lemon · yuzu</p>
  </article>
  <article class="treat-card" data-kind="tea">
    <h3>Hojicha Ember</h3><p>roasted tea · cocoa</p>
  </article>
</section>`
  },
  {
    chapter: "Roots", concept: "NESTED NODES", title: "Name the dishes",
    prompt: "Select every heading inside a recipe card.", explanation: "Chain descendant steps to move from a broad container to a specific node.",
    syntax: "//ancestor//descendant", answer: "//article//h3", placeholder: "//article//h3",
    hint: "First find every <code>article</code>, then descend to each <code>h3</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Predicates", concept: "ATTRIBUTES", title: "Steep only tea",
    prompt: "Select cards whose data-kind is tea.", explanation: "Square brackets filter a node set. Prefix an attribute name with @.",
    syntax: "//*[@attribute='value']", answer: "//article[@data-kind='tea']", placeholder: "//article[@data-kind='tea']",
    hint: "Filter <code>article</code> with <code>[@data-kind='tea']</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card" data-kind="tea"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card" data-kind="fruit"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card" data-kind="tea"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Predicates", concept: "CONTAINS", title: "Find the specials",
    prompt: "Select cards whose class contains special.", explanation: "contains() handles attributes that hold several tokens or partial values.",
    syntax: "contains(@attribute, 'text')", answer: "//article[contains(@class, 'special')]", placeholder: "//article[contains(@class, 'special')]",
    hint: "Inside the predicate, test <code>contains(@class, 'special')</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card special" data-kind="tea"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card special seasonal"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Text", concept: "NORMALIZE SPACE", title: "Ignore the whitespace",
    prompt: "Select the card titled “Matcha Cloud”.", explanation: "normalize-space() trims edges and collapses repeated whitespace before comparing text.",
    syntax: "normalize-space()='text'", answer: "//article[h3[normalize-space()='Matcha Cloud']]", placeholder: "//article[h3[normalize-space()='Matcha Cloud']]",
    hint: "Filter the <code>article</code> by its child: <code>h3[normalize-space()='Matcha Cloud']</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card"><h3>  Matcha   Cloud  </h3><p>green tea · rice</p></article>
  <article class="treat-card"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Text", concept: "NESTED CONDITION", title: "Spot the sell-out",
    prompt: "Select the card that contains a sold-out badge.", explanation: "A dot anchors the nested search to each candidate node instead of the whole document.",
    syntax: "[.//descendant]", answer: "//article[.//span[@class='sold-out']]", placeholder: "//article[.//span[@class='sold-out']]",
    hint: "Ask each card whether it has <code>.//span[@class='sold-out']</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card"><h3>Citrus Moon</h3><p>lemon · yuzu</p><span class="sold-out">sold out</span></article>
  <article class="treat-card"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Position", concept: "GROUPED POSITION", title: "Choose the second topping",
    prompt: "Select the second topping in the list.", explanation: "Parentheses form one result set before the positional predicate is applied.",
    syntax: "(//path)[2]", answer: "(//ul[@class='toppings']/li)[2]", placeholder: "(//ul[@class='toppings']/li)[2]",
    hint: "Wrap the full list path in parentheses, then add <code>[2]</code>.",
    source: `<section class="tasting-board single">
  <article class="treat-card wide"><h3>Build a parfait</h3>
    <ul class="toppings"><li>sesame</li><li>matcha</li><li>yuzu</li><li>azuki</li></ul>
  </article>
</section>`
  },
  {
    chapter: "Position", concept: "LAST", title: "Take the final topping",
    prompt: "Select the last topping, whatever the list length.", explanation: "last() returns the size of the current node set, so the expression survives changing data.",
    syntax: "path[last()]", answer: "//ul[@class='toppings']/li[last()]", placeholder: "//ul[@class='toppings']/li[last()]",
    hint: "Filter the <code>li</code> step with the function <code>[last()]</code>.",
    source: `<section class="tasting-board single">
  <article class="treat-card wide"><h3>Build a parfait</h3>
    <ul class="toppings"><li>sesame</li><li>matcha</li><li>yuzu</li><li>azuki</li></ul>
  </article>
</section>`
  },
  {
    chapter: "Axes", concept: "SIBLING AXIS", title: "Follow every tea",
    prompt: "Select the first card immediately following each tea card.", explanation: "Axes describe relationships. following-sibling:: moves sideways without returning to the parent.",
    syntax: "following-sibling::element[1]", answer: "//article[@data-kind='tea']/following-sibling::article[1]", placeholder: "//article[@data-kind='tea']/following-sibling::article[1]",
    hint: "From each tea article, walk the <code>following-sibling::article</code> axis and keep <code>[1]</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card" data-kind="tea"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card" data-kind="fruit"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card" data-kind="tea"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
  <article class="treat-card" data-kind="nut"><h3>Sesame Stone</h3><p>black sesame · salt</p></article>
</section>`
  },
  {
    chapter: "Logic", concept: "NOT", title: "Keep what is available",
    prompt: "Select every card without a data-sold-out attribute.", explanation: "not() turns a condition inside out; missing attributes become useful evidence.",
    syntax: "not(@attribute)", answer: "//article[not(@data-sold-out)]", placeholder: "//article[not(@data-sold-out)]",
    hint: "Filter cards with <code>[not(@data-sold-out)]</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card" data-sold-out="true"><h3>Citrus Moon</h3><p>lemon · yuzu</p></article>
  <article class="treat-card"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  },
  {
    chapter: "Logic", concept: "COUNT", title: "Find the loaded parfait",
    prompt: "Select cards with at least three toppings.", explanation: "count() turns a selected node set into a number you can compare.",
    syntax: "count(path) >= number", answer: "//article[count(.//li) >= 3]", placeholder: "//article[count(.//li) >= 3]",
    hint: "Count list items inside each card with <code>count(.//li)</code>, then compare it with 3.",
    source: `<section class="tasting-board duo">
  <article class="treat-card"><h3>Small bowl</h3><ul class="toppings"><li>sesame</li><li>matcha</li></ul></article>
  <article class="treat-card"><h3>Loaded parfait</h3><ul class="toppings"><li>yuzu</li><li>azuki</li><li>mochi</li><li>kinako</li></ul></article>
</section>`
  },
  {
    chapter: "Mastery", concept: "FUNCTION COMPOSITION", title: "Read without case or clutter",
    prompt: "Select the card whose full text contains “citrus”, ignoring case and whitespace.", explanation: "Compose functions: normalize the text, translate capitals to lowercase, then test the result.",
    syntax: "contains(translate(normalize-space(.), …), 'text')", answer: "//article[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'citrus')]", placeholder: "//article[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'citrus')]",
    hint: "Normalize <code>.</code>, translate A–Z to a–z, then wrap that result in <code>contains(…, 'citrus')</code>.",
    source: `<section class="tasting-board">
  <article class="treat-card"><h3>Matcha Cloud</h3><p>green tea · rice</p></article>
  <article class="treat-card"><h3>  CITRUS   Moon </h3><p>lemon · yuzu</p></article>
  <article class="treat-card"><h3>Hojicha Ember</h3><p>roasted tea · cocoa</p></article>
</section>`
  }
];

const commandGroups = [
  { title: "Move", items: [["h", "one character left"], ["j", "one line down"], ["k", "one line up"], ["l", "one character right"], ["w", "next word start"], ["b", "previous word start"], ["e", "end of word"]] },
  { title: "Travel", items: [["0", "start of line"], ["^", "first non-blank"], ["$", "end of line"], ["gg", "first line"], ["G", "last line"], ["f?", "next ? on line"], ["F?", "previous ? on line"]] },
  { title: "Edit", items: [["x", "delete character"], ["dd", "delete line"], ["dw", "delete to next word"], ["d$", "delete to line end"], ["u", "undo last change"], [".", "repeat last change"]] },
  { title: "Insert", items: [["i", "insert before cursor"], ["a", "insert after cursor"], ["I", "insert at line start"], ["A", "insert at line end"], ["o", "open line below"], ["Esc", "return to Normal"]] },
  { title: "Text objects", items: [["iw", "inside word"], ["aw", "a word + space"], ["i\"", "inside quotes"], ["i(", "inside parentheses"], ["ciw", "change current word"], ["diw", "delete current word"]] },
  { title: "Compose", items: [["2w", "move two words"], ["3dd", "delete three lines"], ["2dw", "delete two words"], ["dG", "delete to file end"], ["c$", "change to line end"], ["5j", "move down five lines"]] },
  { title: "Search logs", items: [["/text", "search forward"], ["Enter", "run the search"], ["n", "next result"], ["N", "previous result"], ["*", "search word under cursor"], ["#", "search word backward"]] },
  { title: "Diff patrol", items: [["]c", "next change"], ["[c", "previous change"], [":diffget", "take other change"], [":diffput", "send current change"], ["zo", "open diff fold"], ["zc", "close diff fold"]] },
  { title: "Structure", items: [["%", "matching bracket"], ["ci\"", "change inside quotes"], ["di{", "delete inside braces"], ["cit", "change inside tag"], ["dat", "delete around tag"], ["[{", "outer opening brace"]] }
];

const STORAGE_KEY = "keiko-vim-dojo-v1";
const defaultProgress = { completed: [], xpathCompleted: [], xp: 0, best: {}, daily: {}, vimDaily: {}, xpathDaily: {}, reviews: {}, welcomed: false, sound: true, contrast: false, theme: "system" };
let progress = loadProgress();
let missionIndex = Math.min(progress.completed.length, missions.length - 1);
let editor = null;
let reviewMode = false;
let undoStack = [];
let keyTrail = [];
let moveCount = 0;
let errors = 0;
let successLocked = false;
let toastTimer;
let activeCommandGroup = "All";
let baseView = "train";
let xpathLessonIndex = 0;
let xpathDocument = null;
let welcomeDestination = "train";

const $ = id => document.getElementById(id);
const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

function freshProgress() {
  return { ...defaultProgress, completed: [], xpathCompleted: [], best: {}, daily: {}, vimDaily: {}, xpathDaily: {}, reviews: {} };
}

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const saved = { ...freshProgress(), ...parsed };
    if (!Array.isArray(saved.completed)) saved.completed = [];
    if (!Array.isArray(saved.xpathCompleted)) saved.xpathCompleted = [];
    if (!parsed.vimDaily || typeof parsed.vimDaily !== "object") saved.vimDaily = { ...saved.daily };
    if (!saved.xpathDaily || typeof saved.xpathDaily !== "object") saved.xpathDaily = {};
    return saved;
  }
  catch { return freshProgress(); }
}

function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
function localDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function todayKey() { return localDayKey(); }
function cloneState() { return { lines: [...editor.lines], row: editor.row, col: editor.col, mode: editor.mode, lastSearch: editor.lastSearch, searchDirection: editor.searchDirection }; }
function currentMission() { return missions[missionIndex]; }

function init() {
  applyTheme(progress.theme || "system");
  xpathLessonIndex = Math.min(progress.xpathCompleted.length, xpathLessons.length - 1);
  bindEvents();
  renderKataList();
  renderCurriculum();
  renderCommandFilters();
  renderHandbook();
  updateProgressUI();
  renderXPathLesson(false);
  loadMission(missionIndex, false, false);
  if (progress.welcomed) focusEditor();
  else $("welcomeModal").showModal();
  document.body.classList.toggle("high-contrast", progress.contrast);
  $("soundToggle").checked = progress.sound;
  $("contrastToggle").checked = progress.contrast;
}

function bindEvents() {
  document.querySelectorAll("[data-view-link]").forEach(button => button.addEventListener("click", () => showView(button.dataset.viewLink)));
  $("startTraining").addEventListener("click", () => closeWelcome("train"));
  $("startXPath").addEventListener("click", () => closeWelcome("xpath"));
  $("closeWelcome").addEventListener("click", () => closeWelcome("train"));
  $("welcomeModal").addEventListener("close", finishWelcome);
  $("successModal").addEventListener("cancel", event => { event.preventDefault(); repeatMission(); });
  $("resetMission").addEventListener("click", () => runTransition(() => loadMission(missionIndex)));
  $("previousMission").addEventListener("click", () => runTransition(() => loadMission(missionIndex - 1)));
  $("nextUnlockedMission").addEventListener("click", () => runTransition(() => loadMission(missionIndex + 1)));
  $("toggleFocus").addEventListener("click", toggleFocusMode);
  $("editorShell").addEventListener("click", () => $("editorShell").focus());
  $("editorShell").addEventListener("focus", () => $("editorShell").classList.add("is-focused"));
  $("editorShell").addEventListener("blur", () => $("editorShell").classList.remove("is-focused"));
  $("editorShell").addEventListener("keydown", handleKeydown);
  $("hintButton").addEventListener("click", toggleHint);
  $("nextMission").addEventListener("click", goNext);
  $("repeatMission").addEventListener("click", repeatMission);
  $("reviewButton").addEventListener("click", startReview);
  $("resumeTraining").addEventListener("click", () => { showView("train"); loadMission(Math.min(progress.completed.length, missions.length - 1)); });
  $("openSettings").addEventListener("click", openSettings);
  $("openShortcuts").addEventListener("click", openShortcutPalette);
  document.querySelectorAll("[data-quick-action]").forEach(button => button.addEventListener("click", () => runQuickAction(button.dataset.quickAction)));
  $("commandPalette").querySelectorAll("[data-shortcut-command]").forEach(button => button.addEventListener("click", () => runShortcutCommand(button.dataset.shortcutCommand)));
  document.querySelectorAll(".overlay-view").forEach(dialog => dialog.addEventListener("close", restoreTrainingView));
  $("themeCycle").addEventListener("click", cycleTheme);
  document.querySelectorAll('input[name="theme"]').forEach(input => input.addEventListener("change", event => {
    if (event.target.checked) applyTheme(event.target.value, true, true);
  }));
  themeMedia.addEventListener("change", () => {
    if (progress.theme === "system") applyTheme("system");
  });
  $("closeSettings").addEventListener("click", closeSettings);
  $("soundToggle").addEventListener("change", e => { progress.sound = e.target.checked; saveProgress(); });
  $("contrastToggle").addEventListener("change", e => { progress.contrast = e.target.checked; document.body.classList.toggle("high-contrast", progress.contrast); saveProgress(); });
  $("resetProgress").addEventListener("click", resetAllProgress);
  $("commandSearch").addEventListener("input", e => renderHandbook(e.target.value));
  $("xpathForm").addEventListener("submit", runXPathSelection);
  $("xpathInput").addEventListener("input", clearXPathRunState);
  $("xpathReset").addEventListener("click", () => renderXPathLesson(true));
  $("xpathPrevious").addEventListener("click", () => loadXPathLesson(xpathLessonIndex - 1));
  $("xpathNext").addEventListener("click", () => loadXPathLesson(xpathLessonIndex + 1));
  document.addEventListener("keydown", globalShortcuts);
}

function closeWelcome(destination = "train") {
  welcomeDestination = destination;
  $("welcomeModal").close();
}

function finishWelcome() {
  progress.welcomed = true;
  saveProgress();
  showView(welcomeDestination);
}

function showView(view) {
  const isBaseView = view === "train" || view === "xpath";
  const target = isBaseView ? null : $(`${view}View`);
  document.querySelectorAll(".overlay-view[open]").forEach(dialog => {
    if (dialog !== target) dialog.close();
  });
  updateNavigation(view);
  if (isBaseView) {
    baseView = view;
    $("trainView").hidden = view !== "train";
    $("trainView").classList.toggle("active", view === "train");
    $("xpathView").hidden = view !== "xpath";
    $("xpathView").classList.toggle("active", view === "xpath");
    if (view === "train") focusEditor();
    else focusAfterDialog($("xpathInput"));
    return;
  }
  if (!target.open) target.showModal();
  requestAnimationFrame(() => (view === "handbook" ? $("commandSearch") : $("resumeTraining")).focus());
}

function updateNavigation(view) {
  document.querySelectorAll(".nav-item").forEach(el => {
    const active = el.dataset.viewLink === view;
    el.classList.toggle("active", active);
    if (active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
}

function restoreTrainingView() {
  const openOverlay = document.querySelector(".overlay-view[open]");
  updateNavigation(openOverlay ? openOverlay.id.replace("View", "") : baseView);
  if (!openOverlay) {
    if (baseView === "train") focusEditor();
    else focusAfterDialog($("xpathInput"));
  }
}

function focusAfterDialog(element) {
  setTimeout(() => element.focus({ preventScroll: true }), 80);
}

function focusEditor() { focusAfterDialog($("editorShell")); }

function loadMission(index, asReview = false, refocus = true) {
  missionIndex = index;
  reviewMode = asReview;
  const mission = currentMission();
  editor = { lines: [...mission.lines], row: mission.start[0], col: mission.start[1], preferredCol: mission.start[1], mode: "normal", pending: "", count: "", findMode: "", insertChanged: false, searchQuery: "", lastSearch: mission.presetSearch || "", searchDirection: 1 };
  undoStack = [];
  keyTrail = [];
  moveCount = 0;
  errors = 0;
  successLocked = false;
  if ($("successModal").open) $("successModal").close();
  $("hintBox").hidden = true;
  $("hintButton").setAttribute("aria-expanded", "false");
  $("hintButton").querySelector(".hint-button-label").textContent = "Show a hint";
  $("feedbackStrip").className = "feedback-strip";
  $("feedbackMark").textContent = "→";
  $("feedbackText").textContent = "Editor ready. Use Vim keys; press Tab when you want app controls.";
  $("previousMission").disabled = missionIndex === 0;
  $("nextUnlockedMission").disabled = missionIndex >= missions.length - 1 || missionIndex >= progress.completed.length;
  renderMissionMeta();
  renderEditor();
  renderKataList();
  updateProgressUI();
  if (refocus) focusEditor();
}

function renderMissionMeta() {
  const m = currentMission();
  $("missionLabel").textContent = reviewMode ? "MIXED REVIEW" : `KATA ${missionIndex + 1} OF ${missions.length}`;
  $("missionTitle").textContent = m.title;
  $("filename").textContent = m.filename;
  $("editorShell").dataset.world = m.world || "basics";
  $("briefKicker").textContent = m.kicker;
  $("briefTitle").textContent = m.briefTitle;
  $("briefCopy").textContent = m.copy;
  $("targetText").textContent = m.targetText;
  $("targetMini").textContent = m.target ? (m.lines[m.target[0]][m.target[1]] || m.glyph) : m.glyph;
  $("chapterNumber").textContent = String(m.chapterNo).padStart(2, "0");
  $("chapterName").textContent = m.chapter;
  $("parMoves").textContent = `${m.par} ${m.par === 1 ? "move" : "moves"}`;
  $("bestMoves").textContent = progress.best[m.id] ? `${progress.best[m.id]} moves` : "—";
  $("hintBox").innerHTML = m.hint;
  $("keyLesson").innerHTML = m.keys.map(([key, label]) => `<div class="key-explain"><kbd>${escapeHtml(key)}</kbd><span>${escapeHtml(label)}</span></div>`).join("");
}

function renderEditor() {
  clampCursor();
  $("lineNumbers").innerHTML = editor.lines.map((_, i) => `<span class="${i === editor.row ? "active" : ""}">${i + 1}</span>`).join("");
  const target = currentMission().target;
  $("codeLines").innerHTML = editor.lines.map((line, row) => {
    const chars = line.length ? [...line] : [" "];
    const html = chars.map((char, col) => {
      const classes = ["code-char"];
      if (row === editor.row && col === editor.col) classes.push("cursor");
      if (target && row === target[0] && col === target[1]) classes.push("target");
      return `<span class="${classes.join(" ")}">${char === " " ? "&nbsp;" : escapeHtml(char)}</span>`;
    }).join("");
    return `<div class="code-line ${row === editor.row ? "active-line" : ""} ${lineTone(line)}">${html}</div>`;
  }).join("");
  $("modeBadge").textContent = editor.mode.toUpperCase();
  $("modeBadge").classList.toggle("insert", editor.mode === "insert");
  $("modeBadge").classList.toggle("search", editor.mode === "search");
  $("pendingCommand").textContent = editor.mode === "insert" ? "type text · Esc to finish" : editor.mode === "search" ? `/${editor.searchQuery}` : (editor.count + editor.pending + editor.findMode || "ready");
  $("cursorPosition").textContent = `${editor.row + 1}:${editor.col + 1}`;
  $("moveCount").textContent = moveCount;
  renderKeyTrail();
}

function renderKeyTrail() {
  if (!keyTrail.length) { $("keyTrail").innerHTML = '<span class="trail-empty">Your keys land here</span>'; return; }
  $("keyTrail").innerHTML = keyTrail.slice(-7).map((key, i, arr) => `<span class="key-cap">${escapeHtml(key)}</span>${i < arr.length - 1 ? '<span class="trail-arrow">→</span>' : ''}`).join("");
}

function handleKeydown(event) {
  if ($("successModal").open || $("welcomeModal").open) return;
  if (event.key === "Tab" && !event.ctrlKey && !event.metaKey && !event.altKey && document.body.classList.contains("focus-mode")) { event.preventDefault(); $("toggleFocus").focus(); return; }
  if (event.ctrlKey || event.metaKey || event.altKey || event.key === "Tab") return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    errors++;
    feedback("error", "Arrow keys work—but they skip the skill you're here to build. Try h, j, k, or l.");
    return;
  }
  event.preventDefault();
  processKey(event.key);
}

function processKey(rawKey) {
  const key = rawKey === "Escape" ? "Esc" : rawKey;
  if (key === "Shift" || key === "Control" || key === "Alt" || key === "Meta" || key === "CapsLock") return;
  keyTrail.push(key === " " ? "Space" : key);
  moveCount++;

  if (editor.mode === "insert") {
    handleInsertKey(rawKey);
    renderEditor();
    checkSuccess();
    return;
  }

  if (editor.mode === "search") {
    handleSearchKey(rawKey);
    renderEditor();
    checkSuccess();
    return;
  }

  if (key === "Esc") {
    editor.pending = ""; editor.count = ""; editor.findMode = "";
    feedback("neutral", "Already in Normal mode. You’re safe here.");
    renderEditor();
    return;
  }

  if (editor.findMode) {
    performFind(key);
    renderEditor(); checkSuccess(); return;
  }

  if (/^[1-9]$/.test(key) || (key === "0" && editor.count)) {
    editor.count += key;
    feedback("neutral", `Count ${editor.count} is waiting for a motion or operator.`);
    renderEditor(); return;
  }

  if (editor.pending) {
    if (handlePending(key)) { renderEditor(); checkSuccess(); return; }
  }

  const count = consumeCount();
  let recognized = true;
  if (["h", "j", "k", "l", "w", "b", "e"].includes(key)) moveBy(key, count);
  else if (key === "0") editor.col = 0;
  else if (key === "^") editor.col = firstNonBlank(editor.lines[editor.row]);
  else if (key === "$") editor.col = Math.max(0, editor.lines[editor.row].length - 1);
  else if (key === "G") { editor.row = Math.max(0, editor.lines.length - 1); editor.col = firstNonBlank(editor.lines[editor.row]); }
  else if (key === "g") editor.pending = "g";
  else if (["d", "c"].includes(key)) editor.pending = key;
  else if (["[", "]"].includes(key)) editor.pending = key;
  else if (["f", "F"].includes(key)) editor.findMode = key;
  else if (key === "/") enterSearch();
  else if (key === "n") repeatSearch(1);
  else if (key === "N") repeatSearch(-1);
  else if (key === "*") searchWordUnderCursor();
  else if (key === "%") matchPair();
  else if (key === "x") { saveUndo(); deleteChars(count); feedback("good", "Character removed. Normal mode is for editing too."); }
  else if (key === "u") undo();
  else if (["i", "a", "A", "I", "o", "O"].includes(key)) enterInsert(key);
  else recognized = false;

  if (!recognized) {
    errors++;
    feedback("error", `“${key}” isn't part of this dojo yet. Press Tab, then g h for a hint.`);
  } else if (!["d", "c", "g", "[", "]", "f", "F", "x", "u", "/", "n", "N", "*", "%"].includes(key)) {
    feedback("neutral", motionFeedback(key, count));
  }
  renderEditor();
  checkSuccess();
}

function handleInsertKey(key) {
  if (key === "Escape") {
    editor.mode = "normal";
    if (editor.insertChanged) editor.col = Math.max(0, editor.col - 1);
    editor.insertChanged = false;
    feedback("good", "Back in Normal mode. That mode change was intentional.");
    return;
  }
  if (key === "Backspace") {
    if (editor.col > 0) {
      const line = editor.lines[editor.row];
      editor.lines[editor.row] = line.slice(0, editor.col - 1) + line.slice(editor.col);
      editor.col--;
      editor.insertChanged = true;
    }
    return;
  }
  if (key === "Enter") {
    const line = editor.lines[editor.row];
    editor.lines.splice(editor.row, 1, line.slice(0, editor.col), line.slice(editor.col));
    editor.row++; editor.col = 0; editor.insertChanged = true;
    return;
  }
  if (key.length === 1) {
    const line = editor.lines[editor.row];
    editor.lines[editor.row] = line.slice(0, editor.col) + key + line.slice(editor.col);
    editor.col++; editor.insertChanged = true;
    feedback("neutral", "INSERT mode — type freely, then Esc when the edit is complete.");
  }
}

function handleSearchKey(key) {
  if (key === "Escape") {
    editor.mode = "normal";
    editor.searchQuery = "";
    feedback("neutral", "Search cancelled. Back in Normal mode.");
    return;
  }
  if (key === "Backspace") {
    editor.searchQuery = editor.searchQuery.slice(0, -1);
    return;
  }
  if (key === "Enter") {
    const query = editor.searchQuery || editor.lastSearch;
    editor.mode = "normal";
    editor.searchQuery = "";
    if (!query) { errors++; feedback("error", "Type something after / before pressing Enter."); return; }
    editor.lastSearch = query;
    editor.searchDirection = 1;
    performSearch(query, 1);
    return;
  }
  if (key.length === 1) {
    editor.searchQuery += key;
    feedback("neutral", `Searching for “${editor.searchQuery}”… press Enter to jump.`);
  }
}

function handlePending(key) {
  const op = editor.pending;
  if (op === "[" || op === "]") {
    editor.pending = "";
    if (key === "c") { jumpDiffChange(op === "]" ? 1 : -1); return true; }
    if (op === "[" && key === "{") { jumpBlockBoundary(-1); return true; }
    if (op === "]" && key === "}") { jumpBlockBoundary(1); return true; }
    errors++; feedback("error", `${op}${key} isn't available. Use c for a diff or a brace for a block boundary.`); return true;
  }
  if (op === "g") {
    editor.pending = "";
    if (key === "g") { editor.row = 0; editor.col = firstNonBlank(editor.lines[0]); feedback("good", "Jumped to the first line with gg."); return true; }
    errors++; feedback("error", `g${key} isn't available in this dojo.`); return true;
  }
  if ((op === "d" || op === "c") && (key === "i" || key === "a")) { editor.pending += key; return true; }
  if (op === "di" || op === "ci") {
    const change = op.startsWith("c");
    editor.pending = "";
    saveUndo();
    if (key === "w") { changeInsideWord(change); feedback("good", change ? "Word cleared. INSERT mode is ready for its replacement." : "Deleted inside the current word."); return true; }
    if (key === '"') { changeInsideQuotes(change); return true; }
    if (key === "{") { deleteInsideBraces(change); return true; }
    if (key === "t") { changeInsideTag(change); return true; }
    errors++; feedback("error", `${op}${key} isn't available. Try a word, quote, brace, or tag text object.`); return true;
  }
  if (op === "da" || op === "ca") {
    editor.pending = "";
    saveUndo();
    if (key === "t") { deleteAroundTag(op.startsWith("c")); return true; }
    errors++; feedback("error", `${op}${key} isn't available. Use t for the current tag.`); return true;
  }
  if (op === "d" || op === "c") {
    editor.pending = "";
    saveUndo();
    const count = consumeCount();
    if (key === op) { deleteLines(count); if (op === "c") enterInsert("I"); feedback("good", op === "d" ? "The whole line is gone." : "Line cleared; now type the replacement."); return true; }
    if (["w", "$", "G"].includes(key)) { deleteWithMotion(key, count, op === "c"); return true; }
    errors++; feedback("error", `${op}${key} doesn't form a command here. Vim expects a motion after ${op}.`); return true;
  }
  editor.pending = "";
  return false;
}

function enterSearch() {
  editor.mode = "search";
  editor.searchQuery = "";
  feedback("neutral", "SEARCH mode — type a literal pattern and press Enter.");
}

function repeatSearch(directionMultiplier) {
  if (!editor.lastSearch) { errors++; feedback("error", "No search to repeat yet. Start one with /pattern."); return; }
  performSearch(editor.lastSearch, editor.searchDirection * directionMultiplier);
}

function performSearch(query, direction) {
  const text = editor.lines.join("\n");
  const current = positionToOffset(editor.row, editor.col);
  let found = direction > 0 ? text.indexOf(query, current + 1) : text.lastIndexOf(query, current - 1);
  let wrapped = false;
  if (found < 0) {
    found = direction > 0 ? text.indexOf(query) : text.lastIndexOf(query);
    wrapped = found >= 0;
  }
  if (found < 0 || found === current) { errors++; feedback("error", `No other match for “${query}”.`); return false; }
  const position = offsetToPosition(found);
  editor.row = position.row;
  editor.col = position.col;
  editor.preferredCol = editor.col;
  feedback("good", `${wrapped ? "Wrapped and found" : "Found"} “${query}”.`);
  return true;
}

function searchWordUnderCursor() {
  const line = editor.lines[editor.row];
  if (!/[A-Za-z0-9_]/.test(line[editor.col] || "")) { errors++; feedback("error", "Place the cursor on a word before using *."); return; }
  let start = editor.col;
  let end = editor.col + 1;
  while (start > 0 && /[A-Za-z0-9_]/.test(line[start - 1])) start--;
  while (end < line.length && /[A-Za-z0-9_]/.test(line[end])) end++;
  editor.lastSearch = line.slice(start, end);
  editor.searchDirection = 1;
  performSearch(editor.lastSearch, 1);
}

function jumpDiffChange(direction) {
  const isChange = line => (/^[+-]/.test(line) && !/^(\+\+\+|---)/.test(line));
  for (let row = editor.row + direction; row >= 0 && row < editor.lines.length; row += direction) {
    if (isChange(editor.lines[row])) {
      editor.row = row;
      editor.col = 0;
      editor.preferredCol = 0;
      feedback("good", `Jumped to the ${direction > 0 ? "next" : "previous"} diff change.`);
      return;
    }
  }
  errors++;
  feedback("error", `No ${direction > 0 ? "next" : "previous"} diff change.`);
}

function jumpBlockBoundary(direction) {
  const text = editor.lines.join("\n");
  const cursor = positionToOffset(editor.row, editor.col);
  let depth = 0;
  for (let i = cursor + direction; i >= 0 && i < text.length; i += direction) {
    if (direction < 0) {
      if (text[i] === "}") depth++;
      if (text[i] === "{") {
        if (depth === 0) { moveToOffset(i, "Jumped to the surrounding opening brace."); return; }
        depth--;
      }
    } else {
      if (text[i] === "{") depth++;
      if (text[i] === "}") {
        if (depth === 0) { moveToOffset(i, "Jumped to the surrounding closing brace."); return; }
        depth--;
      }
    }
  }
  errors++; feedback("error", `No surrounding ${direction < 0 ? "opening" : "closing"} brace found.`);
}

function moveToOffset(offset, message) {
  const position = offsetToPosition(offset);
  editor.row = position.row; editor.col = position.col; editor.preferredCol = editor.col;
  feedback("good", message);
}

function matchPair() {
  const text = editor.lines.join("\n");
  let offset = positionToOffset(editor.row, editor.col);
  const lineEnd = positionToOffset(editor.row, editor.lines[editor.row].length);
  while (offset < lineEnd && !"()[]{}".includes(text[offset])) offset++;
  const char = text[offset];
  const pairs = { "(": ")", "[": "]", "{": "}", ")": "(", "]": "[", "}": "{" };
  if (!pairs[char]) { errors++; feedback("error", "No bracket at or after the cursor on this line."); return; }
  const forward = "([{ ".trim().includes(char);
  const direction = forward ? 1 : -1;
  let depth = 0;
  for (let i = offset; i >= 0 && i < text.length; i += direction) {
    if (text[i] === char) depth++;
    if (text[i] === pairs[char]) depth--;
    if (depth === 0) {
      const position = offsetToPosition(i);
      editor.row = position.row; editor.col = position.col; editor.preferredCol = editor.col;
      feedback("good", `Matched ${char} with ${pairs[char]}.`);
      return;
    }
  }
  errors++; feedback("error", `No matching ${pairs[char]} found.`);
}

function performFind(char) {
  const direction = editor.findMode;
  editor.findMode = "";
  const line = editor.lines[editor.row];
  const position = direction === "f" ? line.indexOf(char, editor.col + 1) : line.lastIndexOf(char, editor.col - 1);
  if (position >= 0) { editor.col = position; feedback("good", `Found “${char}” on this line.`); }
  else { errors++; feedback("error", `No “${char}” ${direction === "f" ? "after" : "before"} the cursor on this line.`); }
}

function enterInsert(command) {
  saveUndo();
  if (command === "a") editor.col = Math.min(editor.lines[editor.row].length, editor.col + 1);
  if (command === "A") editor.col = editor.lines[editor.row].length;
  if (command === "I") editor.col = firstNonBlank(editor.lines[editor.row]);
  if (command === "o") { editor.lines.splice(editor.row + 1, 0, ""); editor.row++; editor.col = 0; }
  if (command === "O") { editor.lines.splice(editor.row, 0, ""); editor.col = 0; }
  editor.mode = "insert";
  editor.insertChanged = false;
  feedback("neutral", "INSERT mode — type your text, then press Esc to return to Normal.");
}

function moveBy(key, count) {
  for (let i = 0; i < count; i++) {
    if (key === "h") editor.col--;
    if (key === "l") editor.col++;
    if (key === "j") { editor.row++; editor.col = Math.min(editor.preferredCol ?? editor.col, Math.max(0, editor.lines[Math.min(editor.row, editor.lines.length - 1)].length - 1)); }
    if (key === "k") { editor.row--; editor.col = Math.min(editor.preferredCol ?? editor.col, Math.max(0, editor.lines[Math.max(editor.row, 0)].length - 1)); }
    if (key === "w") moveWordForward();
    if (key === "b") moveWordBackward();
    if (key === "e") moveWordEnd();
    clampCursor();
    if (["h", "l", "w", "b", "e"].includes(key)) editor.preferredCol = editor.col;
  }
}

function moveWordForward() {
  const line = editor.lines[editor.row];
  let i = editor.col + 1;
  const typeAt = n => n >= line.length ? "end" : /\s/.test(line[n]) ? "space" : /\w/.test(line[n]) ? "word" : "punct";
  const startType = typeAt(editor.col);
  if (startType === "word") while (i < line.length && typeAt(i) === "word") i++;
  else if (startType === "punct") while (i < line.length && typeAt(i) === "punct") i++;
  while (i < line.length && typeAt(i) === "space") i++;
  if (i < line.length) editor.col = i;
  else if (editor.row < editor.lines.length - 1) { editor.row++; editor.col = firstNonBlank(editor.lines[editor.row]); }
  else editor.col = Math.max(0, line.length - 1);
}

function moveWordBackward() {
  const line = editor.lines[editor.row];
  let i = editor.col - 1;
  while (i >= 0 && /\s/.test(line[i])) i--;
  if (i < 0 && editor.row > 0) { editor.row--; editor.col = Math.max(0, editor.lines[editor.row].length - 1); return; }
  const isWord = /\w/.test(line[i] || "");
  while (i > 0 && (/\w/.test(line[i - 1]) === isWord) && !/\s/.test(line[i - 1])) i--;
  editor.col = Math.max(0, i);
}

function moveWordEnd() {
  const line = editor.lines[editor.row];
  let i = editor.col;
  if (i < line.length - 1) i++;
  while (i < line.length && /\s/.test(line[i])) i++;
  const isWord = /\w/.test(line[i] || "");
  while (i < line.length - 1 && (/\w/.test(line[i + 1]) === isWord) && !/\s/.test(line[i + 1])) i++;
  editor.col = Math.min(i, Math.max(0, line.length - 1));
}

function deleteChars(count) {
  const line = editor.lines[editor.row];
  editor.lines[editor.row] = line.slice(0, editor.col) + line.slice(editor.col + count);
  clampCursor();
}

function deleteLines(count) {
  editor.lines.splice(editor.row, Math.min(count, editor.lines.length));
  if (!editor.lines.length) editor.lines.push("");
  editor.row = Math.min(editor.row, editor.lines.length - 1);
  editor.col = firstNonBlank(editor.lines[editor.row]);
}

function deleteWithMotion(motion, count, change) {
  const line = editor.lines[editor.row];
  if (motion === "w") {
    let end = editor.col;
    for (let n = 0; n < count; n++) {
      let i = end;
      const isWord = /\w/.test(line[i] || "");
      while (i < line.length && !/\s/.test(line[i]) && (/\w/.test(line[i]) === isWord)) i++;
      while (i < line.length && /\s/.test(line[i])) i++;
      end = i;
    }
    editor.lines[editor.row] = line.slice(0, editor.col) + line.slice(end);
  } else if (motion === "$") editor.lines[editor.row] = line.slice(0, editor.col);
  else if (motion === "G") editor.lines.splice(editor.row);
  clampCursor();
  if (change) { editor.mode = "insert"; editor.insertChanged = false; }
  feedback("good", change ? "Text changed; type the replacement." : "Operator + motion: one complete Vim sentence.");
}

function changeInsideWord(change) {
  const line = editor.lines[editor.row];
  let start = editor.col;
  let end = editor.col;
  const isWord = /\w/.test(line[editor.col] || "");
  while (start > 0 && !/\s/.test(line[start - 1]) && (/\w/.test(line[start - 1]) === isWord)) start--;
  while (end < line.length && !/\s/.test(line[end]) && (/\w/.test(line[end]) === isWord)) end++;
  editor.lines[editor.row] = line.slice(0, start) + line.slice(end);
  editor.col = start;
  if (change) { editor.mode = "insert"; editor.insertChanged = false; }
}

function changeInsideQuotes(change) {
  const line = editor.lines[editor.row];
  const open = line.lastIndexOf('"', editor.col);
  const close = line.indexOf('"', Math.max(editor.col + 1, open + 1));
  if (open < 0 || close < 0 || open === close) { errors++; feedback("error", "The cursor is not inside a quoted string."); return; }
  editor.lines[editor.row] = line.slice(0, open + 1) + line.slice(close);
  editor.col = open + 1;
  if (change) { editor.mode = "insert"; editor.insertChanged = false; feedback("good", "Quoted value cleared. Type its replacement, then press Esc."); }
  else feedback("good", "Deleted the text inside the quotes.");
}

function deleteInsideBraces(change) {
  const text = editor.lines.join("\n");
  const cursor = positionToOffset(editor.row, editor.col);
  let open = -1;
  let depth = 0;
  for (let i = cursor; i >= 0; i--) {
    if (text[i] === "}") depth++;
    if (text[i] === "{") {
      if (depth === 0) { open = i; break; }
      depth--;
    }
  }
  if (open < 0) { errors++; feedback("error", "No surrounding { object was found."); return; }
  let close = -1;
  depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    if (text[i] === "}") depth--;
    if (depth === 0) { close = i; break; }
  }
  if (close < 0) { errors++; feedback("error", "The surrounding { has no matching }."); return; }
  const updated = text.slice(0, open + 1) + text.slice(close);
  editor.lines = updated.split("\n");
  const position = offsetToPosition(open + 1);
  editor.row = position.row; editor.col = position.col;
  if (change) { editor.mode = "insert"; editor.insertChanged = false; feedback("good", "Object contents cleared. Type the replacement."); }
  else feedback("good", "Deleted everything inside the surrounding braces.");
}

function findCurrentTag() {
  const line = editor.lines[editor.row];
  const openingPattern = /<([A-Za-z][\w:.-]*)(?:\s[^>]*)?>/g;
  let match;
  let candidate = null;
  while ((match = openingPattern.exec(line))) {
    const contentStart = match.index + match[0].length;
    const closeText = `</${match[1]}>`;
    const closeStart = line.indexOf(closeText, contentStart);
    if (closeStart >= 0 && editor.col >= match.index && editor.col <= closeStart + closeText.length) {
      candidate = { openStart: match.index, contentStart, closeStart, closeEnd: closeStart + closeText.length, tag: match[1] };
    }
  }
  return candidate;
}

function changeInsideTag(change) {
  const tag = findCurrentTag();
  if (!tag) { errors++; feedback("error", "The cursor is not inside a complete XML tag pair on this line."); return; }
  const line = editor.lines[editor.row];
  editor.lines[editor.row] = line.slice(0, tag.contentStart) + line.slice(tag.closeStart);
  editor.col = tag.contentStart;
  if (change) { editor.mode = "insert"; editor.insertChanged = false; feedback("good", `<${tag.tag}> is empty. Type its new content, then press Esc.`); }
  else feedback("good", `Deleted the content inside <${tag.tag}>.`);
}

function deleteAroundTag(change) {
  const tag = findCurrentTag();
  if (!tag) { errors++; feedback("error", "The cursor is not inside a complete XML tag pair on this line."); return; }
  const line = editor.lines[editor.row];
  editor.lines[editor.row] = line.slice(0, tag.openStart) + line.slice(tag.closeEnd);
  editor.col = Math.min(tag.openStart, Math.max(0, editor.lines[editor.row].length - 1));
  if (change) { editor.mode = "insert"; editor.insertChanged = false; feedback("good", `Removed <${tag.tag}>. Type a replacement element.`); }
  else feedback("good", `Deleted <${tag.tag}> and everything around its content.`);
}

function positionToOffset(row, col) {
  let offset = 0;
  for (let i = 0; i < row; i++) offset += editor.lines[i].length + 1;
  return offset + col;
}

function offsetToPosition(offset) {
  let remaining = Math.max(0, offset);
  for (let row = 0; row < editor.lines.length; row++) {
    if (remaining <= editor.lines[row].length) return { row, col: remaining };
    remaining -= editor.lines[row].length + 1;
  }
  const row = editor.lines.length - 1;
  return { row, col: Math.max(0, editor.lines[row].length - 1) };
}

function lineTone(line) {
  if (line.startsWith("@@")) return "tone-hunk";
  if (line.startsWith("+") && !line.startsWith("+++")) return "tone-add";
  if (line.startsWith("-") && !line.startsWith("---")) return "tone-remove";
  if (line.includes("[ERROR]")) return "tone-error";
  if (line.includes("[WARN]")) return "tone-warn";
  if (line.includes("[INFO]")) return "tone-info";
  if (line.includes("[DEBUG]")) return "tone-debug";
  if (["json", "xml"].includes(currentMission().world)) return "tone-structure";
  return "";
}

function saveUndo() { undoStack.push(cloneState()); if (undoStack.length > 25) undoStack.shift(); }
function undo() {
  const state = undoStack.pop();
  if (!state) { errors++; feedback("error", "Nothing to undo yet."); return; }
  editor.lines = state.lines; editor.row = state.row; editor.col = state.col; editor.mode = state.mode; editor.lastSearch = state.lastSearch; editor.searchDirection = state.searchDirection;
  feedback("good", "Last change undone.");
}

function consumeCount() { const value = Number(editor.count) || 1; editor.count = ""; return value; }
function firstNonBlank(line) { const found = line.search(/\S/); return found < 0 ? 0 : found; }
function clampCursor() { editor.row = Math.max(0, Math.min(editor.row, editor.lines.length - 1)); editor.col = Math.max(0, Math.min(editor.col, Math.max(0, editor.lines[editor.row].length - (editor.mode === "insert" ? 0 : 1)))); }

function checkSuccess() {
  if (successLocked || !currentMission().success(editor)) return;
  successLocked = true;
  setTimeout(showSuccess, 260);
}

function showSuccess() {
  const mission = currentMission();
  const firstCompletion = !progress.completed.includes(mission.id);
  const efficiency = Math.min(100, Math.round((mission.par / Math.max(moveCount, mission.par)) * 100));
  const earned = firstCompletion ? Math.max(10, 20 - errors * 2) : 5;
  if (firstCompletion) progress.completed.push(mission.id);
  progress.xp += earned;
  progress.best[mission.id] = Math.min(progress.best[mission.id] || Infinity, moveCount);
  progress.reviews[mission.id] = Date.now();
  progress.daily[todayKey()] = (progress.daily[todayKey()] || 0) + 1;
  progress.vimDaily[todayKey()] = (progress.vimDaily[todayKey()] || 0) + 1;
  saveProgress();
  updateProgressUI(); renderKataList(); renderCurriculum();
  $("earnedXp").textContent = `+${earned}`;
  $("efficiencyScore").textContent = `${efficiency}%`;
  $("successMoves").textContent = moveCount;
  $("successTitle").textContent = errors ? "You corrected the course." : efficiency === 100 ? "Clean movement." : "Target reached.";
  $("successMessage").textContent = reviewMode ? "That older motion is stronger now." : mission.id === "xml-around" ? "You can now navigate code, patches, logs, and structured data with intent." : mission.id === "final" ? "Your first belt is earned. Keep the practice small and steady." : "Your hands just learned one more Vim sentence.";
  $("nextMission").innerHTML = missionIndex === missions.length - 1 ? "Open the practice path <span>→</span>" : "Next kata <span>→</span>";
  $("successModal").showModal();
  $("nextMission").focus();
  if (progress.sound) playSuccessTone();
}

function goNext() {
  $("successModal").close();
  if (reviewMode) { startReview(); return; }
  if (missionIndex < missions.length - 1) runTransition(() => loadMission(missionIndex + 1));
  else showView("path");
}

function repeatMission() { $("successModal").close(); runTransition(() => loadMission(missionIndex, reviewMode)); }

function startReview() {
  if (!progress.completed.length) return;
  const candidates = missions.filter(m => progress.completed.includes(m.id));
  candidates.sort((a, b) => (progress.reviews[a.id] || 0) - (progress.reviews[b.id] || 0));
  const picked = candidates[0];
  showView("train");
  loadMission(missions.indexOf(picked), true);
  feedback("neutral", "No new explanation: retrieve this motion from memory. The hint is still there if you need it.");
}

function renderKataList() {
  const currentChapter = currentMission().chapterNo;
  const nearby = missions.filter(m => m.chapterNo === currentChapter);
  $("kataList").innerHTML = nearby.map(m => {
    const index = missions.indexOf(m);
    const complete = progress.completed.includes(m.id);
    const unlocked = index <= progress.completed.length;
    return `<button class="kata-item ${index === missionIndex ? "active" : ""} ${complete ? "complete" : ""}" data-index="${index}" ${!unlocked ? "disabled" : ""}><span class="kata-dot">${complete ? "✓" : index + 1}</span><strong>${escapeHtml(m.title)}</strong><span class="kata-state">${!unlocked ? "⌁" : complete ? "+" : "→"}</span></button>`;
  }).join("");
  $("kataList").querySelectorAll(".kata-item:not(:disabled)").forEach(button => button.addEventListener("click", () => runTransition(() => loadMission(Number(button.dataset.index)))));
}

function renderCurriculum() {
  const chapters = [...new Map(missions.map(m => [m.chapterNo, m.chapter])).entries()];
  $("curriculumGrid").innerHTML = chapters.map(([chapterNo, chapter]) => {
    const chapterMissions = missions.filter(m => m.chapterNo === chapterNo);
    const mastered = chapterMissions.filter(m => progress.completed.includes(m.id)).length;
    const cards = chapterMissions.map(m => {
      const index = missions.indexOf(m);
      const complete = progress.completed.includes(m.id);
      const unlocked = index <= progress.completed.length;
      return `<button class="path-card ${complete ? "complete" : ""} ${index === missionIndex ? "current" : ""} ${!unlocked ? "locked" : ""}" data-index="${index}" data-glyph="${escapeHtml(m.glyph)}" ${!unlocked ? "disabled" : ""}><span class="path-card-index">KATA ${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.copy)}</p><span class="path-card-footer">${complete ? "✓ mastered" : unlocked ? "→ ready to train" : "⌁ locked"}</span></button>`;
    }).join("");
    return `<section class="chapter-section"><header class="chapter-section-head"><span aria-hidden="true">${String(chapterNo).padStart(2, "0")}</span><div><p>CHAPTER ${String(chapterNo).padStart(2, "0")}</p><h2>${escapeHtml(chapter)}</h2></div><small>${mastered} / ${chapterMissions.length} mastered</small></header><div class="chapter-levels">${cards}</div></section>`;
  }).join("");
  $("curriculumGrid").querySelectorAll(".path-card:not(:disabled)").forEach(button => button.addEventListener("click", () => runTransition(() => { loadMission(Number(button.dataset.index)); showView("train"); })));
}

function loadXPathLesson(index) {
  if (index < 0 || index >= xpathLessons.length || index > progress.xpathCompleted.length) return;
  xpathLessonIndex = index;
  renderXPathLesson(true);
}

function renderXPathLesson(refocus = true) {
  const lesson = xpathLessons[xpathLessonIndex];
  const parser = new DOMParser();
  xpathDocument = parser.parseFromString(`<!doctype html><html><body>${lesson.source}</body></html>`, "text/html");
  [...xpathDocument.body.querySelectorAll("*")].forEach((node, index) => node.dataset.xkey = `node-${index}`);

  $("xpathMissionLabel").textContent = `LESSON ${String(xpathLessonIndex + 1).padStart(2, "0")} OF ${xpathLessons.length}`;
  $("xpathMissionTitle").textContent = lesson.title;
  $("xpathBriefNo").textContent = String(xpathLessonIndex + 1).padStart(2, "0");
  $("xpathConcept").textContent = lesson.concept;
  $("xpathPrompt").textContent = lesson.prompt;
  $("xpathExplanation").textContent = lesson.explanation;
  $("xpathSyntax").textContent = lesson.syntax;
  $("xpathSpecimen").innerHTML = xpathDocument.body.innerHTML;
  $("xpathSource").textContent = lesson.source;
  $("xpathInput").value = "";
  $("xpathInput").placeholder = "Write an XPath expression…";
  $("xpathFeedback").textContent = "Your matches will light up in the specimen.";
  $("xpathFeedback").className = "xpath-feedback";
  $("xpathMatchCount").textContent = "0 nodes selected";
  $("xpathHintText").innerHTML = lesson.hint;
  $("xpathHintDetails").open = false;
  $("xpathPrevious").disabled = xpathLessonIndex === 0;
  $("xpathNext").disabled = xpathLessonIndex >= xpathLessons.length - 1 || xpathLessonIndex >= progress.xpathCompleted.length;
  $("xpathSpecimen").closest(".xpath-specimen-shell").classList.remove("success", "has-run");

  const expected = evaluateXPathNodes(lesson.answer).nodes;
  expected.forEach(node => {
    const key = node.nodeType === Node.ELEMENT_NODE ? node.dataset.xkey : node.parentElement?.dataset.xkey;
    if (key) $("xpathSpecimen").querySelector(`[data-xkey="${key}"]`)?.classList.add("xpath-target");
  });
  renderXPathLessonList();
  updateXPathProgress();
  if (refocus) requestAnimationFrame(() => $("xpathInput").focus());
}

function renderXPathLessonList() {
  let previousChapter = "";
  $("xpathLessonList").innerHTML = xpathLessons.map((lesson, index) => {
    const complete = progress.xpathCompleted.includes(index);
    const unlocked = index <= progress.xpathCompleted.length;
    const chapter = lesson.chapter !== previousChapter ? `<p>${escapeHtml(lesson.chapter)}</p>` : "";
    previousChapter = lesson.chapter;
    return `${chapter}<button type="button" data-xpath-lesson="${index}" class="${index === xpathLessonIndex ? "active" : ""} ${complete ? "complete" : ""}" title="${escapeHtml(lesson.title)}" ${unlocked ? "" : "disabled"}><span>${complete ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(lesson.title)}</strong><i>${unlocked ? "→" : "⌁"}</i></button>`;
  }).join("");
  $("xpathLessonList").querySelectorAll("button:not(:disabled)").forEach(button => button.addEventListener("click", () => loadXPathLesson(Number(button.dataset.xpathLesson))));
  $("xpathChapterLabel").textContent = `${String(xpathLessonIndex + 1).padStart(2, "0")} · ${xpathLessons[xpathLessonIndex].chapter.toUpperCase()}`;
}

function updateXPathProgress() {
  const completed = progress.xpathCompleted.length;
  const today = progress.xpathDaily[todayKey()] || 0;
  $("xpathProgressText").textContent = `${completed} / ${xpathLessons.length}`;
  $("xpathMeterFill").style.width = `${completed / xpathLessons.length * 100}%`;
  $("xpathProgressGlyph").textContent = completed === xpathLessons.length ? "✓" : "//";
  $("xpathDailyText").textContent = `${Math.min(today, 5)} / 5 lessons`;
}

function evaluateXPathNodes(expression) {
  if (!xpathDocument) return { nodes: [], kind: "empty" };
  const result = xpathDocument.evaluate(expression, xpathDocument, null, XPathResult.ANY_TYPE, null);
  const nodes = [];
  if (result.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE || result.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
    let node;
    while ((node = result.iterateNext())) nodes.push(node);
    return { nodes, kind: "nodes" };
  }
  if (result.resultType === XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE || result.resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
    for (let index = 0; index < result.snapshotLength; index++) nodes.push(result.snapshotItem(index));
    return { nodes, kind: "nodes" };
  }
  if (result.resultType === XPathResult.ANY_UNORDERED_NODE_TYPE || result.resultType === XPathResult.FIRST_ORDERED_NODE_TYPE) {
    if (result.singleNodeValue) nodes.push(result.singleNodeValue);
    return { nodes, kind: "nodes" };
  }
  const kind = result.resultType === XPathResult.BOOLEAN_TYPE ? "boolean" : result.resultType === XPathResult.NUMBER_TYPE ? "number" : "string";
  return { nodes, kind };
}

function xpathNodeKey(node) {
  if (node.nodeType === Node.ELEMENT_NODE) return node.dataset.xkey || "";
  return node.parentElement?.dataset.xkey || "";
}

function clearXPathRunState() {
  $("xpathSpecimen").querySelectorAll(".xpath-match").forEach(node => node.classList.remove("xpath-match"));
  $("xpathSpecimen").closest(".xpath-specimen-shell").classList.remove("success", "has-run");
  $("xpathFeedback").textContent = "Press Enter to run this expression.";
  $("xpathFeedback").className = "xpath-feedback";
  $("xpathMatchCount").textContent = "0 nodes selected";
}

function runXPathSelection(event) {
  event.preventDefault();
  const expression = $("xpathInput").value.trim();
  const specimenShell = $("xpathSpecimen").closest(".xpath-specimen-shell");
  $("xpathSpecimen").querySelectorAll(".xpath-match").forEach(node => node.classList.remove("xpath-match"));
  specimenShell.classList.remove("success");
  if (!expression) {
    $("xpathFeedback").textContent = "Write an XPath expression first.";
    $("xpathFeedback").className = "xpath-feedback error";
    return;
  }

  let selected;
  try { selected = evaluateXPathNodes(expression); }
  catch (error) {
    $("xpathFeedback").textContent = `XPath could not be parsed: ${error.message.replace(/^.*?:\s*/, "")}`;
    $("xpathFeedback").className = "xpath-feedback error";
    $("xpathMatchCount").textContent = "syntax error";
    specimenShell.classList.add("has-run");
    return;
  }

  if (selected.kind !== "nodes") {
    $("xpathFeedback").textContent = `That expression returns a ${selected.kind}. This lesson needs a set of nodes.`;
    $("xpathFeedback").className = "xpath-feedback error";
    $("xpathMatchCount").textContent = `returned ${selected.kind}`;
    specimenShell.classList.add("has-run");
    return;
  }

  const selectedKeys = [...new Set(selected.nodes.map(xpathNodeKey).filter(Boolean))];
  selectedKeys.forEach(key => $("xpathSpecimen").querySelector(`[data-xkey="${key}"]`)?.classList.add("xpath-match"));
  const expectedKeys = [...new Set(evaluateXPathNodes(xpathLessons[xpathLessonIndex].answer).nodes.map(xpathNodeKey).filter(Boolean))];
  const exact = selectedKeys.length === expectedKeys.length && selectedKeys.every(key => expectedKeys.includes(key));
  $("xpathMatchCount").textContent = `${selectedKeys.length} node${selectedKeys.length === 1 ? "" : "s"} selected`;
  specimenShell.classList.add("has-run");

  if (exact) completeXPathLesson();
  else {
    const direction = selectedKeys.length > expectedKeys.length ? "Too broad" : selectedKeys.length ? "Not quite" : "No matches";
    $("xpathFeedback").textContent = `${direction}: the target is ${expectedKeys.length} node${expectedKeys.length === 1 ? "" : "s"}, and your expression selected ${selectedKeys.length}.`;
    $("xpathFeedback").className = "xpath-feedback error";
  }
}

function completeXPathLesson() {
  const firstCompletion = !progress.xpathCompleted.includes(xpathLessonIndex);
  if (firstCompletion) {
    progress.xpathCompleted.push(xpathLessonIndex);
    progress.xpathCompleted.sort((a, b) => a - b);
    progress.xp += 20;
    progress.daily[todayKey()] = (progress.daily[todayKey()] || 0) + 1;
    progress.xpathDaily[todayKey()] = (progress.xpathDaily[todayKey()] || 0) + 1;
    saveProgress();
    updateProgressUI();
  }
  $("xpathSpecimen").closest(".xpath-specimen-shell").classList.add("success");
  const finalLesson = xpathLessonIndex === xpathLessons.length - 1;
  $("xpathFeedback").textContent = finalLesson
    ? firstCompletion ? "Path complete. +20 XP — every XPath lesson is now open for review." : "Path complete. Revisit any lesson from the DOM trail."
    : firstCompletion ? "Exact match. +20 XP — the next branch is now open." : "Exact match. This branch is already mastered.";
  $("xpathFeedback").className = "xpath-feedback good";
  $("xpathNext").disabled = xpathLessonIndex >= xpathLessons.length - 1;
  renderXPathLessonList();
  updateXPathProgress();
  if (firstCompletion && progress.sound) playSuccessTone();
}

function renderCommandFilters() {
  const groups = ["All", ...commandGroups.map(group => group.title)];
  $("commandFilters").innerHTML = groups.map(group => `<button type="button" data-command-group="${escapeHtml(group)}" aria-pressed="${group === activeCommandGroup}" class="${group === activeCommandGroup ? "active" : ""}">${escapeHtml(group)}</button>`).join("");
  $("commandFilters").querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    activeCommandGroup = button.dataset.commandGroup;
    renderCommandFilters();
    renderHandbook($("commandSearch").value);
    [...$("commandFilters").querySelectorAll("button")].find(filter => filter.dataset.commandGroup === activeCommandGroup)?.focus();
  }));
}

function renderHandbook(query = "") {
  const needle = query.trim().toLowerCase();
  let matches = 0;
  $("commandGrid").innerHTML = commandGroups.map(group => {
    if (activeCommandGroup !== "All" && group.title !== activeCommandGroup) return "";
    const filtered = group.items.filter(([key, text]) => !needle || key.toLowerCase().includes(needle) || text.toLowerCase().includes(needle) || group.title.toLowerCase().includes(needle));
    matches += filtered.length;
    if (!filtered.length) return "";
    return `<section class="command-group"><h2>${escapeHtml(group.title)}</h2>${filtered.map(([key, text]) => `<div class="command-row"><code>${escapeHtml(key)}</code><span>${escapeHtml(text)}</span></div>`).join("")}</section>`;
  }).join("");
  if (!matches) $("commandGrid").innerHTML = `<p class="command-empty">No command matches “${escapeHtml(query)}”. Try “word”, “delete”, or “line”.</p>`;
  $("commandResultCount").textContent = `${matches} command${matches === 1 ? "" : "s"}`;
}

function updateProgressUI() {
  const today = progress.vimDaily[todayKey()] || 0;
  const completed = progress.completed.length;
  $("xpCount").textContent = progress.xp;
  $("dailyProgressText").textContent = `${Math.min(today, 5)} / 5`;
  $("dailyMeterFill").style.width = `${Math.min(100, today / 5 * 100)}%`;
  $("dailyMeter").setAttribute("aria-valuenow", Math.min(today, 5));
  $("pathMeterFill").style.width = `${completed / missions.length * 100}%`;
  $("pathCompleted").textContent = `${completed} of ${missions.length}`;
  $("reviewCount").textContent = completed ? `${completed} motion${completed === 1 ? "" : "s"} in rotation` : "Complete a kata first";
  $("reviewButton").disabled = completed === 0;
  const streak = calculateStreak();
  $("streakCount").textContent = streak;
  const rank = completed >= missions.length ? ["構", "Structure master"] : completed >= 22 ? ["読", "Syntax scout"] : completed >= 17 ? ["調", "Incident responder"] : completed >= 12 ? ["帯", "First belt"] : completed >= 8 ? ["練", "Apprentice"] : completed >= 4 ? ["歩", "Walker"] : ["初", "Beginner"];
  $("rankGlyph").textContent = rank[0]; $("rankName").textContent = rank[1];
}

function calculateStreak() {
  let streak = 0;
  const day = new Date();
  for (let i = 0; i < 365; i++) {
    const key = localDayKey(day);
    if (progress.daily[key]) streak++;
    else if (i > 0 || progress.daily[todayKey()]) break;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

function toggleHint() {
  $("hintBox").hidden = !$("hintBox").hidden;
  $("hintButton").setAttribute("aria-expanded", String(!$("hintBox").hidden));
  $("hintButton").querySelector(".hint-button-label").textContent = $("hintBox").hidden ? "Show a hint" : "Hide hint";
}

function feedback(type, text) {
  $("feedbackStrip").className = `feedback-strip ${type === "neutral" ? "" : type}`;
  $("feedbackMark").textContent = type === "error" ? "!" : type === "good" ? "✓" : "→";
  $("feedbackText").textContent = text;
}

function motionFeedback(key, count) {
  const names = { h: "left", j: "down", k: "up", l: "right", w: "to the next word", b: "to the previous word", e: "to the word end", "0": "to line start", "^": "to first text", "$": "to line end", G: "to the last line", i: "into Insert mode", a: "into Insert mode after the cursor", A: "to the end in Insert mode", I: "to the start in Insert mode", o: "to a new line", O: "to a new line" };
  return `Moved ${names[key] || key}${count > 1 ? ` × ${count}` : ""}.`;
}

function toggleFocusMode() {
  runTransition(() => {
    const active = document.body.classList.toggle("focus-mode");
    $("toggleFocus").setAttribute("aria-pressed", String(active));
    $("toggleFocus").title = active ? "Exit focus mode · g then f" : "Focus mode · g then f";
    $("toggleFocus").setAttribute("aria-label", active ? "Exit focus mode" : "Toggle focus mode");
  });
}

function runTransition(update) {
  if (document.startViewTransition && !document.activeViewTransition && !motionMedia.matches) return document.startViewTransition(update);
  return update();
}

function resolvedTheme(theme) {
  return theme === "dark" || (theme === "system" && themeMedia.matches) ? "dark" : "light";
}

function applyTheme(theme, persist = false, announce = false) {
  const choices = ["system", "light", "dark"];
  const selected = choices.includes(theme) ? theme : "system";
  const resolved = resolvedTheme(selected);
  const labels = { light: "Light", system: "System", dark: "Dark" };
  const icons = { light: "☼", system: "◐", dark: "☾" };
  const next = choices[(choices.indexOf(selected) + 1) % choices.length];

  progress.theme = selected;
  document.documentElement.dataset.theme = selected;
  document.documentElement.dataset.colorScheme = resolved;
  document.documentElement.style.colorScheme = resolved;
  document.querySelectorAll('input[name="theme"]').forEach(input => { input.checked = input.value === selected; });
  $("themeCycleIcon").textContent = icons[selected];
  $("themeCycleLabel").textContent = labels[selected];
  $("themeCycle").setAttribute("aria-label", `Appearance: ${labels[selected]}${selected === "system" ? ` (${labels[resolved]} now)` : ""}. Switch to ${labels[next]}.`);
  $("themeCycle").title = `Appearance: ${labels[selected]}${selected === "system" ? ` · ${labels[resolved]} now` : ""}`;
  $("themeHelp").textContent = selected === "system" ? `Following this device · ${labels[resolved]} now.` : `${labels[selected]} stays on until you change it.`;

  if (persist) saveProgress();
  if (announce) showToast(`Appearance set to ${labels[selected]}.`);
}

function cycleTheme() {
  const choices = ["system", "light", "dark"];
  const next = choices[(choices.indexOf(progress.theme) + 1) % choices.length];
  applyTheme(next, true, true);
}

function openSettings() {
  if (!$("settingsDrawer").open) $("settingsDrawer").showModal();
  $("closeSettings").focus();
}
function closeSettings() {
  if ($("settingsDrawer").open) $("settingsDrawer").close();
}
function resetAllProgress() {
  if (!window.confirm("Reset every completed kata, score, and streak?")) return;
  localStorage.removeItem(STORAGE_KEY);
  progress = freshProgress();
  applyTheme(progress.theme);
  $("soundToggle").checked = progress.sound;
  $("contrastToggle").checked = progress.contrast;
  document.body.classList.remove("high-contrast");
  missionIndex = 0;
  closeSettings();
  loadMission(0);
  renderCurriculum();
  updateProgressUI();
  showToast("Progress reset. A fresh mat is ready.");
}

function globalShortcuts(event) {
  if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  const key = event.key.toLowerCase();
  const palette = $("commandPalette");
  if (palette.open) {
    const command = { t: "train", x: "xpath", p: "path", b: "handbook", h: "hint", f: "focus", s: "settings" }[key];
    if (command) { event.preventDefault(); runShortcutCommand(command); }
    return;
  }
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("#editorShell, input, textarea, select, [contenteditable]")) return;
  if (key === "g") { event.preventDefault(); openShortcutPalette(); }
  else if (event.key === "/" && $("handbookView").open) { event.preventDefault(); $("commandSearch").focus(); }
}

function openShortcutPalette() {
  if ($("welcomeModal").open || $("successModal").open || $("commandPalette").open) return;
  $("commandPalette").showModal();
  requestAnimationFrame(() => $("commandPalette").querySelector("[data-shortcut-command]").focus());
}

function runQuickAction(action) {
  if (action === "shortcuts") openShortcutPalette();
  else runShortcutCommand(action);
}

function runShortcutCommand(command) {
  if ($("commandPalette").open) $("commandPalette").close();
  if ($("settingsDrawer").open) closeSettings();
  if (command === "train") showView("train");
  else if (command === "xpath") showView("xpath");
  else if (command === "path") showView("path");
  else if (command === "handbook") showView("handbook");
  else if (command === "hint") { showView("train"); toggleHint(); }
  else if (command === "focus") { showView("train"); toggleFocusMode(); }
  else if (command === "settings") { showView("train"); openSettings(); }
}

function playSuccessTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    [523.25, 659.25, 783.99].forEach((frequency, i) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine"; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * .08);
      gain.gain.linearRampToValueAtTime(.055, ctx.currentTime + i * .08 + .015);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + i * .08 + .25);
      oscillator.connect(gain); gain.connect(ctx.destination);
      oscillator.start(ctx.currentTime + i * .08); oscillator.stop(ctx.currentTime + i * .08 + .27);
    });
  } catch { /* Sound is a bonus, not a dependency. */ }
}

function showToast(message) {
  clearTimeout(toastTimer); $("toast").textContent = message; $("toast").classList.add("show");
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2300);
}

function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }

init();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
