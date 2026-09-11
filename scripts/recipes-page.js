import '../styles/recipes-page.css'
import { initCatHeader } from './cat-header.js'

function initFilters() {
  const chips = Array.from(document.querySelectorAll('.recipe-chip'))
  const cards = Array.from(document.querySelectorAll('.recipes-grid .recipe-card'))
  if (!chips.length) return
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      chips.forEach((c) => {
        c.classList.remove('is-active')
        c.setAttribute('aria-pressed', 'false')
      })
      chip.classList.add('is-active')
      chip.setAttribute('aria-pressed', 'true')
      const filter = chip.dataset.filter
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.cat === filter
        card.classList.toggle('is-hidden', !show)
      })
    })
  )
}

function boot() {
  initCatHeader()
  initFilters()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
