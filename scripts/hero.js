// Hero interactivity:
//  - plate slowly rotates as the page scrolls (eased)
//  - lead paragraph fills in letter-by-letter as it enters the viewport
//    (progressive enhancement — see note below)
//  - scroll-down button
//
// Figma note: the reveal splits the lead into per-character <span>s at runtime.
// The SOURCE markup keeps the lead as a single <p> text node (clean for
// html.to.design). If you import from the live/rendered DOM, disable JS first
// (or import index.html statically) to avoid one layer per letter.
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

  // --- split the lead into per-character spans, preserving <br> --------
  const chars = []
  const DIM = 'rgba(246,244,239,0.22)'
  const LIT = 'rgba(246,244,239,0.9)'
  if (lead && !lead.dataset.split) {
    lead.dataset.split = '1'
    const nodes = Array.from(lead.childNodes)
    for (const node of nodes) {
      if (node.nodeType !== 3) continue // keep <br> as-is
      const frag = document.createDocumentFragment()
      const words = node.textContent.split(' ')
      words.forEach((word, wi) => {
        if (word) {
          const w = document.createElement('span')
          w.style.display = 'inline-block'
          w.style.whiteSpace = 'nowrap'
          for (const ch of word) {
            const s = document.createElement('span')
            s.textContent = ch
            s.style.color = DIM
            s.style.transition = 'color 420ms cubic-bezier(0.22,0.61,0.36,1)'
            w.appendChild(s)
            chars.push(s)
          }
          frag.appendChild(w)
        }
        if (wi < words.length - 1) frag.appendChild(document.createTextNode(' '))
      })
      lead.replaceChild(frag, node)
    }
  }

  // --- rAF-driven scroll effects (plate + reveal) ----------------------
  let plateAngle = 0
  let plateTarget = 0
  let plateRaf = null
  let leadRaf = null
  let lastLit = -1

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

  const onScroll = () => {
    plateTarget = (window.pageYOffset || document.documentElement.scrollTop || 0) * 0.16
    if (!plateRaf) plateRaf = requestAnimationFrame(spin)

    if (leadRaf || !chars.length) return
    leadRaf = requestAnimationFrame(() => {
      leadRaf = null
      const r = lead.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const start = vh * 0.88
      const end = vh * 0.32
      const p = Math.max(0, Math.min(1, (start - r.top) / Math.max(1, start - end)))
      const lit = Math.round(p * chars.length)
      if (lit === lastLit) return
      lastLit = lit
      for (let i = 0; i < chars.length; i++) {
        const c = i < lit ? LIT : DIM
        if (chars[i].style.color !== c) chars[i].style.color = c
      }
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()
}
