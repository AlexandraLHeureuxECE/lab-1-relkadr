# SE4471 Lab 1 — Vibe Coding Tic-Tac-Toe (Web)

A simple web-based Tic-Tac-Toe game for **two players on the same device**, built for **SE4471 (Selected Topics in Software Engineering) — Lab 1 Part 1**.  
This lab focuses on documenting an **LLM-assisted development process** (“vibe coding”) while producing a working browser application.

## Features
- 3×3 interactive grid
- Alternating turns (X / O)
- Win detection (rows, columns, diagonals)
- Draw detection
- Status updates during play and at game end
- Restart game **without refreshing** the page

## Required Extra Feature: Enhanced Game Feedback
This project implements **Enhanced game feedback** (additional visual feedback beyond plain text), including:
- Hover effects on playable (empty) cells
- Disabled states for non-playable (filled) cells
- Winning-line highlight (winning cells visually highlighted)
- Draw feedback (all cells receive a subtle draw tint)

## Run Locally
This is a plain HTML/CSS/JavaScript project (no build step).

### Option 1 — Open in browser
1. Download/clone the repository
2. Open `index.html` in your web browser

### Option 2 — Local server (recommended)
If you have Python installed, run:
```bash
python3 -m http.server 8000


LLM Tool Disclosure
LLM tool(s) used: Cursor (LLM-assisted coding)

How it was used:

Generated the initial Tic-Tac-Toe implementation (HTML/CSS/JS)

Iteratively refined the UI (status banner) and added enhanced game feedback (hover effects, disabled states, win highlighting, draw tint) through follow-up prompts documented in the LLM Interaction Log

Notes

Development and deployment were completed in the provided GitHub Classroom repository.

The LLM Interaction Log (submitted separately as a PDF) contains the full prompt record and selected interaction analyses.