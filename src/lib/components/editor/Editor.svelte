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
    grid-template-columns: 64px 1fr 240px;
    height: calc(100vh - 65px);
  }

  .viewport {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 0;
    background: #eee;
  }

  .properties {
    padding: 16px;
    overflow: auto;
    border-left: 1px solid #ccc;
  }
</style>
