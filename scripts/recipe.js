import '../styles/recipe.css'
import { initCatHeader } from './cat-header.js'

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCatHeader)
else initCatHeader()
