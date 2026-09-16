<script lang="ts">
  let { workspace, onWorkspaceChange } = $props<{
    workspace: "editor" | "calculator";
    onWorkspaceChange: (workspace: "editor" | "calculator") => void;
  }>();
</script>

<header>
  <h1>Ticket Graph</h1>

  <nav>
    <button
      type="button"
      class:active={workspace === "editor"}
      onclick={() => onWorkspaceChange("editor")}
    >
      Editor
    </button>

    <button
      type="button"
      class:active={workspace === "calculator"}
      onclick={() => onWorkspaceChange("calculator")}
    >
      Calculator
    </button>
  </nav>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
    border-bottom: var(--border-simple);
  }

  h1 {
    margin: 0;
    font-size: 1.1rem;
  }

  nav {
    display: flex;
    gap: var(--space-xs);
  }

  button {
    padding: var(--space-sm) 14px;
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
  }

  button:hover {
    background: var(--color-surface-hover);
  }

  button.active {
    background: var(--color-surface-active);
  }
</style>
