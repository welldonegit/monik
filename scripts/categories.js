import '../styles/categories.css'
import { initCatHeader } from './cat-header.js'

// Category data (colours are per-category content config, not design tokens).
// Some source images don't exist in /assets, so they reuse the closest one.
const CATS = [
  { title: 'Ягідні чаї', img: '/assets/tea.png', color: '#E52868', fg: '#F6F4EF' },
  { title: 'Сиропи до кави', img: '/assets/cat-syrup-cherry.png', color: '#D8433A', fg: '#F6F4EF' },
  { title: 'Джеми', img: '/assets/jam.png', color: '#653CCB', fg: '#F6F4EF' },
  { title: 'Кулінарні добавки', img: '/assets/spices.png', color: '#FFC42D', fg: '#211A17' },
  { title: 'Топінги', img: '/assets/cat-topping.png', color: '#D81E3F', fg: '#F6F4EF' },
  { title: 'Сиропи для приготування коктейлів', img: '/assets/cat-syrup-curacao.png', color: '#4358D5', fg: '#F6F4EF' },
  { title: 'Концентрати для приготування лимонаду', img: '/assets/cat-lemonade-mohito.png', color: '#20AFE0', fg: '#F6F4EF' },
  { title: 'Напої сухі розчинні Lito', img: '/assets/cat-lito-orange.png', color: '#176142', fg: '#F6F4EF' },
  { title: 'Сухі суміші для приготування желе', img: '/assets/cat-jelly.png', color: '#048144', fg: '#F6F4EF' },
  { title: 'Сухі суміші для приготування киселю', img: '/assets/cat-kissel.png', color: '#A6124D', fg: '#F6F4EF' },
  { title: 'Сухі суміші для приготування морозива', img: '/assets/cat-icecream.png', color: '#4A2A9E', fg: '#F6F4EF' },
  { title: 'Горіхи та сухофрукти', img: '/assets/cat-coconut.png', color: '#B4471F', fg: '#F6F4EF' },
]

function initQuickPick() {
  document.querySelectorAll('.quick-pick__row').forEach((row) => {
    const i = Number(row.dataset.cat)
    const c = CATS[i]
    if (!c) return
    row.style.setProperty('--row-color', c.color)
    row.style.setProperty('--row-fg', c.fg)
  })
}

function initSlider() {
  const slider = document.querySelector('.cat-slider')
  if (!slider) return
  const page = document.querySelector('.cat-page')
  const base = slider.querySelector('.cat-slider__base')
  const reveal = slider.querySelector('.cat-slider__reveal')
  const title = slider.querySelector('.cat-slider__title')
  const product = slider.querySelector('.cat-slider__product')
  const prevBtn = slider.querySelector('.cat-slider__peek--prev')
  const nextBtn = slider.querySelector('.cat-slider__peek--next')
  const prevImg = prevBtn?.querySelector('.cat-slider__peek-img')
  const nextImg = nextBtn?.querySelector('.cat-slider__peek-img')
  const prevTitle = prevBtn?.querySelector('.cat-slider__peek-title')
  const nextTitle = nextBtn?.querySelector('.cat-slider__peek-title')

  const N = CATS.length
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let disp = 0
  let busy = false
  let timer = null
  const AUTOPLAY = 6000

  const setColor = (prop, val) => page.style.setProperty(prop, val)

  const applyContent = (n) => {
    const cur = CATS[n]
    const prev = CATS[(n - 1 + N) % N]
    const next = CATS[(n + 1) % N]
    title.textContent = cur.title
    product.src = cur.img
    product.alt = cur.title + ' Monik'
    if (prevImg) { prevImg.src = prev.img; prevImg.alt = prev.title }
    if (nextImg) { nextImg.src = next.img; nextImg.alt = next.title }
    if (prevTitle) prevTitle.textContent = prev.title
    if (nextTitle) nextTitle.textContent = next.title
    setColor('--fg', cur.fg)
  }

  const go = (n) => {
    n = ((n % N) + N) % N
    if (busy || n === disp) return
    busy = true
    stopAuto()
    const cur = CATS[n]

    // header band starts changing now (fades over the reveal's 560ms) so it
    // stays in sync with the slide
    setColor('--header-band', cur.color)

    if (reduce) {
      applyContent(n)
      setColor('--band', cur.color)
      disp = n
      busy = false
      startAuto()
      return
    }

    // expand the reveal circle in the new colour
    reveal.style.setProperty('--reveal', cur.color)
    reveal.classList.remove('is-open', 'is-animating')
    void reveal.offsetWidth // reflow so the reset takes effect
    reveal.classList.add('is-animating')
    requestAnimationFrame(() => requestAnimationFrame(() => reveal.classList.add('is-open')))

    slider.classList.add('is-leaving')
    setTimeout(() => {
      applyContent(n)
      slider.classList.remove('is-leaving')
    }, 200)
    setTimeout(() => {
      setColor('--band', cur.color)
      reveal.classList.remove('is-open', 'is-animating')
      disp = n
      busy = false
      startAuto()
    }, 560)
  }

  const startAuto = () => {
    stopAuto()
    timer = setTimeout(() => go(disp + 1), AUTOPLAY)
  }
  const stopAuto = () => {
    if (timer) { clearTimeout(timer); timer = null }
  }

  prevBtn?.addEventListener('click', () => go(disp - 1))
  nextBtn?.addEventListener('click', () => go(disp + 1))

  slider.addEventListener('pointerenter', stopAuto)
  slider.addEventListener('pointerleave', startAuto)
  slider.addEventListener('focusin', stopAuto)
  slider.addEventListener('focusout', startAuto)

  document.addEventListener('keydown', (e) => {
    const t = e.target
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(disp + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(disp - 1) }
  })

  let tx = null
  let ty = null
  slider.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY }, { passive: true })
  slider.addEventListener('touchend', (e) => {
    if (tx == null) return
    const dx = e.changedTouches[0].clientX - tx
    const dy = e.changedTouches[0].clientY - ty
    tx = null
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) go(disp + (dx < 0 ? 1 : -1))
  }, { passive: true })

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto()
    else startAuto()
  })

  // initial paint
  applyContent(0)
  setColor('--band', CATS[0].color)
  setColor('--header-band', CATS[0].color)
  startAuto()
}

function boot() {
  initCatHeader()
  initQuickPick()
  initSlider()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
