// Header interactivity: mobile menu toggle + language switch.
// No-op if the header is not on the page.
export function initHeader() {
  const header = document.querySelector('.site-header')
  if (!header) return

  const burger = header.querySelector('.site-header__burger')
  const menu = header.querySelector('.mobile-menu')

  const closeMenu = () => {
    header.classList.remove('is-menu-open')
    burger?.setAttribute('aria-expanded', 'false')
    if (menu) menu.hidden = true
  }

  burger?.addEventListener('click', () => {
    const open = header.classList.toggle('is-menu-open')
    burger.setAttribute('aria-expanded', String(open))
    if (menu) menu.hidden = !open
  })

  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))

  const langBtns = header.querySelectorAll('.lang-switch__btn')
  langBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      langBtns.forEach((b) => {
        b.classList.remove('is-active')
        b.setAttribute('aria-pressed', 'false')
      })
      btn.classList.add('is-active')
      btn.setAttribute('aria-pressed', 'true')
    })
  )
}
