<script lang="ts">
  import type { City } from "$lib/models/City";

  let {
    city,
    onCityNameChange,
  }: {
    city: City | null;
    onCityNameChange: (name: string) => void;
  } = $props();
</script>

<aside>
  {#if city}
    <h2>City</h2>

    <label>
      Name
      <input
        type="text"
        value={city.name}
        oninput={(event) =>
          onCityNameChange((event.currentTarget as HTMLInputElement).value)}
      />
    </label>

    <div class="position">
      <span>
        X
        <strong>{city.position.x.toFixed(3)}</strong>
      </span>

      <span>
        Y
        <strong>{city.position.y.toFixed(3)}</strong>
      </span>
    </div>
  {:else}
    <h2>Properties</h2>
    <p>Nothing selected</p>
  {/if}
</aside>

<style>
  aside {
    padding: var(--space-lg);
    overflow: auto;
    border-left: var(--border-thin);
  }

  h2 {
    margin-top: 0;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  input {
    padding: var(--space-sm);
    border: var(--border-thin);
    border-radius: var(--radius-sm);
    font: inherit;
  }

  .position {
    display: flex;
    gap: var(--space-lg);
    margin-top: var(--space-lg);
  }

  .position span {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
</style>
