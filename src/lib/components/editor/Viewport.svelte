<script lang="ts">
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

  function handlePointerDown(event: PointerEvent) {
    if (event.button !== 1) return;

    isPanning = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
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

  let panX = $state(0);
  let panY = $state(0);
  let zoom = $state(1);

  let isPanning = $state(false);
  let lastMouseX = $state(0);
  let lastMouseY = $state(0);
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
      <img src="/boards/board-usa.jpeg" alt="Board" />
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
    transform: translate(-50%, -50%);
  }

  .board img {
    display: block;
  }
</style>
