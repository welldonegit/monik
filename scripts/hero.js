// Hero interactivity:
//  - plate slowly rotates as the page scrolls (eased)
//  - lead paragraph brightens as it enters the viewport (whole node, no span
//    splitting — keeps it a single text layer for Figma)
//  - scroll-down button
export function initHero() {
  const wrap = document.querySelector('.hero-wrap')
  if (!wrap) return

  const btn = wrap.querySelector('.hero__scroll-btn')
  btn?.addEventListener('click', () =>
    window.scrollBy({ top: Math.round(window.innerHeight * 0.92), behavior: 'smooth' })
  )

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const plate = document.querySelector('.hero__plate')
  const lead = document.querySelector('.hero__lead')

  let plateAngle = 0
  let plateTarget = 0
  let plateRaf = null
  let leadRaf = null
  let lastAlpha = -1

  const spin = () => {
    const diff = plateTarget - plateAngle
    if (Math.abs(diff) < 0.02) {
      plateRaf = null
      return
    }
    plateAngle += diff * 0.07
    if (plate) plate.style.transform = `translate(-50%,-50%) rotate(${plateAngle.toFixed(2)}deg)`
    plateRaf = requestAnimationFrame(spin)
  }

  const DIM = 0.22
  const LIT = 0.9

  const onScroll = () => {
    plateTarget = (window.pageYOffset || document.documentElement.scrollTop || 0) * 0.16
    if (!plateRaf) plateRaf = requestAnimationFrame(spin)

    if (leadRaf || !lead) return
    leadRaf = requestAnimationFrame(() => {
      leadRaf = null
      const r = lead.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const start = vh * 0.88
      const end = vh * 0.32
      const p = Math.max(0, Math.min(1, (start - r.top) / Math.max(1, start - end)))
      const a = DIM + p * (LIT - DIM)
      if (Math.abs(a - lastAlpha) < 0.005) return
      lastAlpha = a
      lead.style.color = `rgba(246,244,239,${a.toFixed(3)})`
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
}
