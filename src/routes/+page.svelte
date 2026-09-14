<script lang="ts">
  let workspace = $state<"editor" | "calculator">("editor");
</script>

<main>
  <header>
    <h1>Ticket Graph</h1>

    <nav>
      <button
        type="button"
        class:active={workspace === "editor"}
        onclick={() => workspace = "editor"}
      >
        Editor
      </button>

      <button
        type="button"
        class:active={workspace === "calculator"}
        onclick={() => workspace = "calculator"}
      >
        Calculator
      </button>
    </nav>
  </header>

  <section>
    {#if workspace === "editor"}
      <h2>Editor</h2>
      <p>Board editor goes here.</p>
    {:else}
      <h2>Calculator</h2>
      <p>Calculator goes here.</p>
    {/if}
  </section>
</main>

<style>
  :global(html, body) {
    margin: 0;
    min-height: 100%;
  }

  :global(body) {
    font-family: system-ui, sans-serif;
  }

  main {
    min-height: 100vh;
  }

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

  section {
    padding: 24px;
  }
</style>