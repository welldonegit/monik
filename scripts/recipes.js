// Recipes carousel: prev/next buttons, drag-to-scroll, and arrow dimming at
// the track ends.
export function initRecipes() {
  const track = document.querySelector('.recipes__track')
  if (!track) return

  const prev = document.querySelector('.recipes__nav-btn--prev')
  const next = document.querySelector('.recipes__nav-btn--next')

  const step = () => {
    const first = track.firstElementChild
    if (!first) return 300
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24
    return first.getBoundingClientRect().width + gap
  }
  const scroll = (dir) => track.scrollBy({ left: dir * step(), behavior: 'smooth' })
  prev?.addEventListener('click', () => scroll(-1))
  next?.addEventListener('click', () => scroll(1))

  const update = () => {
    const max = track.scrollWidth - track.clientWidth
    prev?.classList.toggle('is-end', track.scrollLeft <= 2)
    next?.classList.toggle('is-end', track.scrollLeft >= max - 2)
  }
  track.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()

  // Drag to scroll (pointer). Suppress the click that follows a real drag.
  let drag = null
  let justDragged = false
  track.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, left: track.scrollLeft }
    justDragged = false
    track.classList.add('is-dragging')
  })
  track.addEventListener('pointermove', (e) => {
    if (!drag) return
    const dx = e.clientX - drag.x
    if (Math.abs(dx) > 4) justDragged = true
    track.scrollLeft = drag.left - dx
  })
  const end = () => {
    drag = null
    track.classList.remove('is-dragging')
  }
  track.addEventListener('pointerup', end)
  track.addEventListener('pointerleave', end)
  track.addEventListener(
    'click',
    (e) => {
      if (justDragged) {
        e.preventDefault()
        justDragged = false
      }
    },
    true
  )
}
