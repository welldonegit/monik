import '../styles/entry.css'
import { initHeader } from './header.js'
import { initHero } from './hero.js'
import { initCategoryBlobs } from './category.js'
import { initBrands } from './brands.js'

// Each init is a no-op if its target markup is absent on the page.
function boot() {
  initHeader()
  initHero()
  initCategoryBlobs()
  initBrands()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
