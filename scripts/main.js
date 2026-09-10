import '../styles/entry.css'
import { initHeader } from './header.js'
import { initHero } from './hero.js'

// Each init is a no-op if its target markup is absent on the page.
function boot() {
  initHeader()
  initHero()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
