# Keiko — Vim Practice Hall

Keiko is a dependency-free, interactive Vim dojo for beginners. It teaches motion and editing through 26 short keyboard katas, immediate feedback, efficiency scoring, and mixed review.

Try it at [christestet.github.io/vim-dojo](https://christestet.github.io/vim-dojo/).

## Run it

Open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## What is included

- A small Vim simulator with Normal and Insert modes
- `h j k l`, word motions, line/file jumps, character finding, counts, and undo
- Operator + motion commands including `dw`, `dd`, `ciw`, and `d$`
- 26 progressive katas and a mixed-review queue
- Objective-first responsive training, direct kata navigation, and chapter-grouped curriculum browsing
- Practical chapters for diff navigation, production-log analysis, JSON objects, and XML tags
- Search practice with `/`, `n`, `N`, and `*`; structure practice with `%`, `ci\"`, `di{`, `cit`, and `dat`
- Daily goal, XP, streak, efficiency, hints, and persistent browser-local progress
- Searchable, category-filtered command handbook and command-grammar explainer
- Focus mode, optional sound, high-contrast cursor, mobile layout, reduced-motion support
- Persistent Light, Dark, and System appearance modes with live OS-theme updates

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
