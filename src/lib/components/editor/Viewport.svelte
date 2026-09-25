<script lang="ts">
  // temp
  import type { City } from "$lib/models/City";
  import { imageToNormalized, normalizedToImage } from "$lib/utils/coordinates";

  let {
    tool,
    cities,
    selectedCityId,
    onCityCreate,
    onCitySelect,
  }: {
    tool: "select" | "city" | "route";
    cities: City[];
    selectedCityId: string | null;
    onCityCreate: (city: City) => void;
    onCitySelect: (cityId: string) => void;
  } = $props();

  function handleWheel(event: WheelEvent) {
    event.preventDefault();

    const viewport = event.currentTarget as HTMLElement;
    const rect = viewport.getBoundingClientRect();

    const mouseX = event.clientX - (rect.left + rect.width / 2);
    const mouseY = event.clientY - (rect.top + rect.height / 2);

    const oldZoom = zoom;
    const factor = event.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.max(0.25, Math.min(4, oldZoom * factor));

    const r = newZoom / oldZoom;
    panX -= (mouseX - panX) * (r - 1);
    panY -= (mouseY - panY) * (r - 1);

    zoom = newZoom;
  }

  function handleCityPlacement(event: PointerEvent) {
    console.log("CITY PLACEMENT FIRED");
    if (imageWidth === 0 || imageHeight === 0) return;

    const viewport = event.currentTarget as HTMLElement;
    const rect = viewport.getBoundingClientRect();

    const screenX = event.clientX - (rect.left + rect.width / 2);

    const screenY = event.clientY - (rect.top + rect.height / 2);

    const imageX = (screenX - panX) / zoom;
    const imageY = (screenY - panY) / zoom;

    const imagePosition = {
      x: (screenX - panX) / zoom,
      y: (screenY - panY) / zoom,
    };

    const position = imageToNormalized(imagePosition, {
      width: imageWidth,
      height: imageHeight,
    });

    const city: City = {
      id: crypto.randomUUID(),
      name: "New City",
      position,
    };

    onCityCreate(city);
  }

  function handlePointerDown(event: PointerEvent) {
    if (event.button === 1) {
      isPanning = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      return;
    }

    if (event.button === 0 && tool === "city") {
      handleCityPlacement(event);
    }
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isPanning) return;

    panX += event.clientX - lastMouseX;
    panY += event.clientY - lastMouseY;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  function handlePointerUp(event: PointerEvent) {
    if (!isPanning) return;

    isPanning = false;

    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  }

  function handleImageLoad(event: Event) {
    const image = event.currentTarget as HTMLImageElement;

    imageWidth = image.naturalWidth;
    imageHeight = image.naturalHeight;
  }

  let panX = $state(0);
  let panY = $state(0);
  let zoom = $state(1);

  let isPanning = $state(false);
  let lastMouseX = $state(0);
  let lastMouseY = $state(0);

  let imageWidth = $state(0);
  let imageHeight = $state(0);
</script>

<div
  class="viewport"
  role="application"
  onwheel={handleWheel}
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  onpointercancel={handlePointerUp}
  class:panning={isPanning}
>
  <div
    class="camera"
    style={`transform: translate(${panX}px, ${panY}px) scale(${zoom})`}
  >
    <div class="board">
      <img src="/boards/board-usa.jpeg" alt="Board" onload={handleImageLoad} />

      {#if imageWidth > 0 && imageHeight > 0}
        <svg
          class="overlay"
          viewBox={`0 0 ${imageWidth} ${imageHeight}`}
          preserveAspectRatio="none"
        >
          {#each cities as city}
            {@const position = normalizedToImage(city.position, {
              width: imageWidth,
              height: imageHeight,
            })}

            <circle
              cx={position.x}
              cy={position.y}
              r="12"
              class:selected={city.id === selectedCityId}
              role="button"
              tabindex="0"
              aria-label={`Select city ${city.name}`}
              onclick={(event) => {
                event.stopPropagation();
                onCitySelect(city.id);
              }}
              onkeydown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  onCitySelect(city.id);
                }
              }}
            />
          {/each}
        </svg>
      {/if}
    </div>
  </div>
</div>

<style>
  .viewport {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;

    background: var(--color-viewport);
    cursor: grab;

    &.panning {
      cursor: grabbing;
    }
  }

  .camera {
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 0;
  }

  .board {
    position: relative;
    transform: translate(-50%, -50%);
  }

  .board img {
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;
  }

  .overlay circle {
    fill: red;
    stroke: white;
    stroke-width: 2px;
    cursor: pointer;
  }

  .overlay circle.selected {
    fill: orange;
    stroke: black;
    stroke-width: 3px;
  }
</style>
