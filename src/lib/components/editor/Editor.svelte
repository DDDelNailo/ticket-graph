<script lang="ts">
  import type { City } from "$lib/models/City";
  import Properties from "$lib/components/editor/Properties.svelte";
  import ToolBar from "$lib/components/editor/ToolBar.svelte";
  import Viewport from "$lib/components/editor/Viewport.svelte";

  let tool = $state<"select" | "city" | "route">("select");

  let cities = $state<City[]>([]);
  let selectedCityId = $state<string | null>(null);

  let selectedCity = $derived(
    cities.find((city) => city.id === selectedCityId) ?? null,
  );

  function handleCityCreate(city: City) {
    cities.push(city);
    selectedCityId = city.id;
  }

  function handleCitySelect(cityId: string) {
    selectedCityId = cityId;
  }
</script>

<div class="editor">
  <ToolBar {tool} onToolChange={(newTool) => (tool = newTool)} />

  <Viewport
    {tool}
    {cities}
    {selectedCityId}
    onCityCreate={handleCityCreate}
    onCitySelect={handleCitySelect}
  />

  <Properties
    city={selectedCity}
    onCityNameChange={(name) => {
      if (!selectedCityId) return;

      const city = cities.find((city) => city.id === selectedCityId);

      if (city) {
        city.name = name;
      }
    }}
  />
</div>

<style>
  .editor {
    flex: 1;
    height: 100%;
    min-height: 0;

    display: grid;
    grid-template-columns: var(--toolbar-width) 1fr var(--properties-width);
  }
</style>
