# Ticket to Ride Grapher

This should be a simple tool to graph the routes in Ticket to Ride. It will allow you to use the predefined maps or create your own maps. You can then use the graph to find the shortest path between two cities, or to find the longest path that visits a set of cities.

Nice. That gives us a clean baseline. 🎉

Now I'd do the **editor shell before the board model or image import**. We want the application to start feeling like an actual editor first, while keeping the code structure sane.

The next milestone:

```text
Current
✅ Tauri app
✅ Svelte 5 + TypeScript
✅ Biome
✅ Editor / Calculator switching

Next
⬜ Split UI into components
⬜ Editor toolbar
⬜ Board viewport
⬜ Properties panel
⬜ Basic canvas navigation
```

I’d make this our next commit:

> `feat: create editor workspace layout`

### 1. First, split `+page.svelte`

Right now `+page.svelte` is doing everything. We're going to make it the **workspace coordinator** rather than the entire application.

I'd create:

```text
src/
├── lib/
│   └── components/
│       ├── AppHeader.svelte
│       ├── WorkspaceTabs.svelte
│       └── editor/
│           ├── Editor.svelte
│           ├── EditorToolbar.svelte
│           ├── BoardViewport.svelte
│           └── PropertiesPanel.svelte
│
└── routes/
    └── +page.svelte
```

Don't worry about whether this ends up being the final folder structure. We're keeping the first component split small and obvious.

The responsibilities are:

```text
+page.svelte
    "Which workspace is active?"

Editor.svelte
    "How is the editor arranged?"

EditorToolbar.svelte
    "Which editing tool is active?"

BoardViewport.svelte
    "Where does the board live?"

PropertiesPanel.svelte
    "What are the properties of the selection?"
```

That's already teaching us a useful Svelte principle: **components should have a reason to exist**, rather than splitting things arbitrarily because we can.

### 2. The editor layout

I'd make the actual editor look like:

```text
┌──────────────────────────────────────────────────────────────┐
│ Ticket Graph                         Editor   Calculator     │
├──────────┬───────────────────────────────────────┬───────────┤
│          │                                       │           │
│ Select   │                                       │ Properties│
│          │                                       │           │
│ City     │                                       │           │
│          │              BOARD                     │           │
│ Route    │             VIEWPORT                  │           │
│          │                                       │           │
│ Ticket   │                                       │           │
│          │                                       │           │
├──────────┴───────────────────────────────────────┴───────────┤
│ Zoom 100%                                      Ready          │
└──────────────────────────────────────────────────────────────┘
```

At this stage:

**Toolbar:** buttons exist, but only Select needs to actually work.

**Viewport:** empty dark/neutral canvas.

**Properties:** says something like `Nothing selected`.

No image yet.

That sounds a little boring, but it's valuable because we're establishing the geometry of the application before introducing the much more complicated image/canvas behavior.

### 3. One Svelte concept we'll introduce

This is where we start passing state between components.

`+page.svelte` owns:

```ts
let workspace = $state<"editor" | "calculator">("editor");
```

and renders:

```svelte
<Editor />
```

The editor will eventually own something like:

```ts
let activeTool = $state<"select" | "city" | "route" | "ticket">("select");
```

Then `EditorToolbar` needs to know which tool is selected.

Svelte's component props are the mechanism we'll learn here.

Conceptually:

```text
Editor
    │
    │ activeTool
    ▼
EditorToolbar
```

Later it'll become:

```text
Editor
 ├── activeTool
 ├── selection
 └── board
       │
       ├── BoardViewport
       └── PropertiesPanel
```

This is a much better point to learn Svelte's state/props system than trying to learn it while simultaneously writing a zoomable SVG editor.

### 4. Don't implement the board yet

This is the bit I'd be strict about.

We're **not** going to:

* design the JSON schema yet
* implement cities
* implement routes
* implement zoom
* implement optimization

until the shell exists.

Once the shell is running, the next milestone becomes much more concrete:

> **Import an image and display it inside the viewport, with pan and zoom.**

That will be our first genuinely interesting feature.

So your next move is simply to create the component files and move the existing workspace UI into them. Once you've done that, paste your resulting `+page.svelte` and `Editor.svelte` here and we'll tackle the component props/state together.
