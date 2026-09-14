<script lang="ts">
    let {
  workspace,
  onWorkspaceChange
} = $props<{
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
    padding: 12px 20px;
    border-bottom: 1px solid #ccc;
  }

  h1 {
    margin: 0;
    font-size: 1.1rem;
  }

  nav {
    display: flex;
    gap: 4px;
  }

  button {
    padding: 8px 14px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
  }

  button.active {
    background: #ddd;
  }
</style> 