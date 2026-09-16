<script lang="ts">
  import ToolBar from "$lib/components/editor/ToolBar.svelte";

  let tool = $state<"select" | "city" | "route">("select");
</script>

<div class="editor">
  <ToolBar {tool} onToolChange={(newTool) => (tool = newTool)} />

  <main class="viewport">
    <p>Board viewport</p>
  </main>

  <aside class="properties">
    <h2>Properties</h2>
    <p>Nothing selected</p>
  </aside>
</div>

<style>
  .editor {
    display: grid;
    grid-template-columns: var(--toolbar-width) 1fr var(--properties-width);
    height: calc(100vh - 65px);
  }

  .viewport {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 0;
    background: var(--color-viewport);
  }

  .properties {
    padding: var(--space-lg);
    overflow: auto;
    border-left: var(--border-thin);
  }
</style>
