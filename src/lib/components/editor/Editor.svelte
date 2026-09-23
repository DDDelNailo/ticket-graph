<script lang="ts">
  import ToolBar from "$lib/components/editor/ToolBar.svelte";
  import Viewport from "$lib/components/editor/Viewport.svelte";
  import Properties from "$lib/components/editor/Properties.svelte";

  let tool = $state<"select" | "city" | "route">("select");
</script>

<div class="editor">
  <ToolBar {tool} onToolChange={(newTool) => (tool = newTool)} />
  <Viewport />
  <Properties />
</div>

<style>
  .editor {
    flex: 1;
    min-height: 0;

    display: grid;
    grid-template-columns: var(--toolbar-width) 1fr var(--properties-width);
  }
</style>
