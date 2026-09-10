// Brands slider: prev/next scroll by one card width + gap.
export function initBrands() {
  const track = document.querySelector('.brands__track')
  if (!track) return

  const step = (dir) => {
    const first = track.firstElementChild
    if (!first) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24
    track.scrollBy({ left: dir * (first.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  document.querySelector('.brands__btn--prev')?.addEventListener('click', () => step(-1))
  document.querySelector('.brands__btn--next')?.addEventListener('click', () => step(1))
}
