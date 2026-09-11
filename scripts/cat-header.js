// Light header (catalog + product pages): mobile menu + language toggle.
export function initCatHeader() {
  const header = document.querySelector('.cat-header')
  if (!header) return

  const menu = header.querySelector('.cat-menu')
  const burger = header.querySelector('.cat-header__burger')
  const closeMenu = () => {
    header.classList.remove('is-menu-open')
    burger?.setAttribute('aria-expanded', 'false')
  }
  burger?.addEventListener('click', () => {
    const open = header.classList.toggle('is-menu-open')
    burger.setAttribute('aria-expanded', String(open))
  })
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))

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
