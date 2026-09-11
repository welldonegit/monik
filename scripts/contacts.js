import '../styles/contacts.css'
import { initCatHeader } from './cat-header.js'

function initForm() {
  const form = document.querySelector('.contact-form')
  if (!form) return
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    form.classList.add('is-sent')
    form.reset()
  })
}

function boot() {
  initCatHeader()
  initForm()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()
