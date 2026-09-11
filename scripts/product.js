import '../styles/product.css'
import { initCatHeader } from './cat-header.js'
import { initRecipes } from './recipes.js'

function boot() {
  initCatHeader()
  initRecipes()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
