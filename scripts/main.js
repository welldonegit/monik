import '../styles/entry.css'
import { initHeader } from './header.js'
import { initHero } from './hero.js'
import { initCategoryBlobs } from './category.js'

// Each init is a no-op if its target markup is absent on the page.
function boot() {
  initHeader()
  initHero()
  initCategoryBlobs()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
