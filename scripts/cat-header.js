// Light header (catalog + product pages): mobile drawer + language toggle.
import { initNavDrawer } from './nav-drawer.js'

export function initCatHeader() {
  const header = document.querySelector('.cat-header')
  if (!header) return

  initNavDrawer({
    header,
    burger: header.querySelector('.cat-header__burger'),
    panel: header.querySelector('.cat-menu'),
  })

  const lang = header.querySelector('.cat-lang')
  lang?.querySelectorAll('.cat-lang__btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      const en = btn.textContent.trim() === 'EN'
      lang.classList.toggle('is-en', en)
      lang.querySelectorAll('.cat-lang__btn').forEach((b) => {
        const active = b === btn
        b.classList.toggle('is-active', active)
        b.setAttribute('aria-pressed', String(active))
      })
    })
  )
}
