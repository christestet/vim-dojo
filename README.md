# Keiko — Vim and XPath Dojo

Keiko is a dependency-free, interactive practice dojo. It teaches Vim motion and editing through 26 keyboard katas, and XPath selection through a second, visual 12-lesson path inspired by CSS Diner.

Try it at [christestet.github.io/vim-dojo](https://christestet.github.io/vim-dojo/).

## Run it

Open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## What is included

- A small Vim simulator with Normal and Insert modes
- A complete XPath 1.0 path with live DOM specimens and exact node-set validation
- XPath predicates, attributes, `contains()`, `normalize-space()`, positions, `last()`, sibling axes, `not()`, `count()`, and composed text functions
- Equivalent XPath expressions are accepted when they select exactly the requested nodes
- `h j k l`, word motions, line/file jumps, character finding, counts, and undo
- Operator + motion commands including `dw`, `dd`, `ciw`, and `d$`
- 26 progressive katas and a mixed-review queue
- Objective-first responsive training, direct kata navigation, and chapter-grouped curriculum browsing
- Practical chapters for diff navigation, production-log analysis, JSON objects, and XML tags
- Search practice with `/`, `n`, `N`, and `*`; structure practice with `%`, `ci\"`, `di{`, `cit`, and `dat`
- Daily goal, XP, streak, efficiency, hints, and persistent browser-local progress
- Searchable, category-filtered command handbook and command-grammar explainer
- Focus mode, optional sound, high-contrast cursor, mobile layout, reduced-motion support
- Contextual quick-control ribbons and keyboard hints throughout the training flow
- Persistent Light, Dark, and System appearance modes with live OS-theme updates
- Installable offline app support through a small service worker and web manifest

## Learning design

The curriculum favors execution over rereading. Each kata introduces one idea, makes the learner retrieve and perform it immediately, gives precise feedback, and returns completed motions through mixed review. This draws on retrieval practice, spacing, interleaving, and concrete examples while following Vim's own operator–motion model.

Progress is stored in `localStorage`; no account, analytics, or network service is used.

## Run with Docker

The container serves Keiko on the non-standard port `8787`:

```bash
docker build -t keiko-vim-dojo .
docker run --rm -p 8787:8787 --name keiko-vim-dojo keiko-vim-dojo
```

Open `http://localhost:8787`. The container includes a health check that requests the app on port `8787`.
