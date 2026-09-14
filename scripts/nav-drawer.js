// Mobile navigation drawer — turns an in-header <nav> menu into a right
// slide-in panel with backdrop, logo, close button, phone, language switch and
// socials. Shared by the home header (.mobile-menu) and catalog header
// (.cat-menu). Purely additive: desktop nav is untouched (drawer only shows
// below 768px, where the burger is visible).
export function initNavDrawer({ header, burger, panel, openClass = 'is-menu-open' }) {
  if (!header || !burger || !panel) return

  panel.hidden = false
  panel.classList.add('nav-drawer')
  panel.querySelector('ul')?.classList.add('nav-drawer__list')

  // ---- panel top: logo + close ----------------------------------------
  const top = document.createElement('div')
  top.className = 'nav-drawer__top'
  top.innerHTML =
    '<img class="nav-drawer__logo" src="/assets/monik-logo.svg" alt="Monik" width="120" height="35">' +
    '<button class="nav-drawer__close" type="button" aria-label="Закрити меню"><span></span><span></span></button>'
  panel.prepend(top)

  // ---- panel foot: phone + language + socials -------------------------
  const foot = document.createElement('div')
  foot.className = 'nav-drawer__foot'

  const phone = panel.querySelector('a[href^="tel:"]')
  if (phone) {
    phone.classList.add('nav-drawer__phone')
    phone.closest('li')?.remove()
    foot.appendChild(phone)
  }

  const lang = document.createElement('div')
  lang.className = 'nav-drawer__lang'
  lang.setAttribute('role', 'group')
  lang.setAttribute('aria-label', 'Мова')
  lang.innerHTML =
    '<button type="button" class="is-active" aria-pressed="true">UA</button>' +
    '<button type="button" aria-pressed="false">EN</button>'
  lang.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      lang.querySelectorAll('button').forEach((x) => {
        const on = x === b
        x.classList.toggle('is-active', on)
        x.setAttribute('aria-pressed', String(on))
      })
    })
  )
  foot.appendChild(lang)

  const social = document.querySelector('.site-footer__social')
  if (social) {
    const clone = social.cloneNode(true)
    clone.className = 'nav-drawer__social'
    foot.appendChild(clone)
  }

  panel.appendChild(foot)

  // ---- backdrop -------------------------------------------------------
  const backdrop = document.createElement('div')
  backdrop.className = 'nav-drawer__backdrop'
  document.body.appendChild(backdrop)

  // ---- open / close ---------------------------------------------------
  const setOpen = (open) => {
    header.classList.toggle(openClass, open)
    burger.setAttribute('aria-expanded', String(open))
    backdrop.classList.toggle('is-open', open)
    document.body.classList.toggle('is-nav-open', open)
  }

  burger.addEventListener('click', () => setOpen(!header.classList.contains(openClass)))
  top.querySelector('.nav-drawer__close').addEventListener('click', () => setOpen(false))
  backdrop.addEventListener('click', () => setOpen(false))
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false) })
  panel.querySelectorAll('a[href]').forEach((a) => a.addEventListener('click', () => setOpen(false)))
}
