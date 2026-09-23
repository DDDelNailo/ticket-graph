# Ticket Graph

A desktop application for creating, editing, and analyzing route-based game boards.

Ticket Graph is designed around games where players connect locations through routes and complete objectives by finding useful paths across a board. The project started around *Ticket to Ride* but is intentionally being built as a generic route-board editor and calculator.

## Features

Currently implemented:

* Editor and Calculator workspaces
* Board image displayed in the editor
* Viewport zooming centered around the mouse cursor
* Middle-mouse viewport panning
* Select, City, and Route editor tools

Planned:

* Place and edit cities
* Create and edit routes
* Route colors and lengths
* Board and project persistence
* Objective/ticket definitions
* Route calculation and optimization
* Visualizing calculated routes on the board
* Support for different route-based games and rule sets

## Tech Stack

* **Desktop:** Tauri 2
* **Frontend:** Svelte + TypeScript
* **Rendering:** SVG
* **Core:** Rust
* **Persistence:** JSON
* **Package manager:** pnpm

## Development

Install dependencies:

```bash
pnpm install
```

Start the development application:

```bash
pnpm tauri dev
```

Check the Svelte/TypeScript project:

```bash
pnpm check
```

Format the codebase:

```bash
pnpm format
```

Build the frontend:

```bash
pnpm build
```

## Status

Ticket Graph is currently in early development. The editor foundation is being built first, followed by the board model and route calculator.
