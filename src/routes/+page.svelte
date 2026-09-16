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

  <section>
    {#if workspace === "editor"}
      <Editor />
    {:else}
      <Calculator />
    {/if}
  </section>
</main>
