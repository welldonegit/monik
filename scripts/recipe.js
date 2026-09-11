import '../styles/recipe.css'
import { initCatHeader } from './cat-header.js'

// Orange product panel — looping slider with 4s autoplay.
function initProductSlider() {
  const slider = document.querySelector('.recipe-product')
  if (!slider) return
  const track = slider.querySelector('.recipe-product__track')
  const slides = slider.querySelectorAll('.recipe-product__slide')
  if (!track || slides.length < 2) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let index = 0
  let timer = null

  const render = () => { track.style.transform = `translateX(${-index * 100}%)` }
  const go = (dir) => { index = (index + dir + slides.length) % slides.length; render() }

  const stop = () => { if (timer) { clearInterval(timer); timer = null } }
  const start = () => {
    if (reduce) return
    stop()
    timer = setInterval(() => go(1), 4000)
  }

  slider.querySelectorAll('.recipe-product__nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      go(btn.dataset.dir === 'prev' ? -1 : 1)
      start() // reset autoplay after manual navigation
    })
  })

  slider.addEventListener('mouseenter', stop)
  slider.addEventListener('mouseleave', start)

  render()
  start()
}

function init() {
  initCatHeader()
  initProductSlider()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
else init()
