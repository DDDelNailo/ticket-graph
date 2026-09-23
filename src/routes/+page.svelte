<script lang="ts">
  import AppHeader from "$lib/components/AppHeader.svelte";
  import Calculator from "$lib/components/calculator/Calculator.svelte";
  import Editor from "$lib/components/editor/Editor.svelte";

  let workspace = $state<"editor" | "calculator">("editor");
</script>

<main>
  <AppHeader
    {workspace}
    onWorkspaceChange={(newWorkspace) => (workspace = newWorkspace)}
  />

  {#if workspace === "editor"}
    <Editor />
  {:else}
    <Calculator />
  {/if}
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
