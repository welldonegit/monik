import '../styles/policy.css'
import { initCatHeader } from './cat-header.js'

function boot() {
  initCatHeader()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
