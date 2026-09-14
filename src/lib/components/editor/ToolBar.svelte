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
    gap: 4px;
    padding: 8px;
    border-right: 1px solid #ccc;
  }

  .tools button {
    width: 48px;
    height: 48px;
    padding: 4px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
  }

  .tools button.active {
    background: #ddd;
  }
</style>
