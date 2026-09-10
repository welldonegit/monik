// Decorative floating blobs inside category bands.
// Same bounce physics as the original startBlobs(); seeds come from data-*.
export function initCategoryBlobs() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const blobs = Array.from(document.querySelectorAll('.category__blob'))
  if (!blobs.length) return

  const items = blobs.map((el) => ({
    el,
    x: null,
    y: null,
    sx: parseFloat(el.dataset.sx),
    sy: parseFloat(el.dataset.sy),
    vx: parseFloat(el.dataset.vx),
    vy: parseFloat(el.dataset.vy),
    rot: el.dataset.rot || '',
  }))

  let last = 0
  const step = (t) => {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0
    last = t
    for (const b of items) {
      const p = b.el.parentElement
      if (!p) continue
      const maxX = Math.max(0, p.clientWidth - b.el.offsetWidth)
      const maxY = Math.max(0, p.clientHeight - b.el.offsetHeight)
      if (b.x === null) {
        b.x = maxX * b.sx
        b.y = maxY * b.sy
      }
      b.x += b.vx * dt
      b.y += b.vy * dt
      if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx) }
      else if (b.x >= maxX) { b.x = maxX; b.vx = -Math.abs(b.vx) }
      if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy) }
      else if (b.y >= maxY) { b.y = maxY; b.vy = -Math.abs(b.vy) }
      b.el.style.transform =
        `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0)` + (b.rot ? ' ' + b.rot : '')
    }
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
