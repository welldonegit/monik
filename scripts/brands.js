// Brands slider: prev/next + looped autoplay (every 4s).
export function initBrands() {
  const track = document.querySelector('.brands__track')
  if (!track) return

  const step = (dir) => {
    const first = track.firstElementChild
    if (!first) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24
    track.scrollBy({ left: dir * (first.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let timer = null

  const advance = () => {
    const max = track.scrollWidth - track.clientWidth
    if (max <= 4) return // all cards already visible — nothing to scroll
    if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' })
    else step(1)
  }
  const start = () => {
    if (reduce) return
    stop()
    timer = setInterval(advance, 4000)
  }
  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const nudge = (dir) => {
    step(dir)
    start() // reset the autoplay clock after a manual move
  }
  document.querySelector('.brands__btn--prev')?.addEventListener('click', () => nudge(-1))
  document.querySelector('.brands__btn--next')?.addEventListener('click', () => nudge(1))

  track.addEventListener('pointerenter', stop)
  track.addEventListener('pointerleave', start)

  start()
}
