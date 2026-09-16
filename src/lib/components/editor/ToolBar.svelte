<script lang="ts">
  let { tool, onToolChange } = $props<{
    tool: "select" | "city" | "route";
    onToolChange: (tool: "select" | "city" | "route") => void;
  }>();
</script>

<aside class="tools">
  <button
    type="button"
    class:active={tool === "select"}
    onclick={() => onToolChange("select")}
    title="Select"
  >
    Select
  </button>

  <button
    type="button"
    class:active={tool === "city"}
    onclick={() => onToolChange("city")}
    title="City"
  >
    City
  </button>

  <button
    type="button"
    class:active={tool === "route"}
    onclick={() => onToolChange("route")}
    title="Route"
  >
    Route
  </button>
</aside>

<style>
  .tools {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-sm);
    border-right: var(--border-thin);
  }

  .tools button {
    width: 48px;
    height: 48px;
    padding: var(--space-xs);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
  }

  .tools button:hover {
    background: var(--color-surface-hover);
  }

  .tools button.active {
    background: var(--color-surface-active);
  }
</style>
