import './sass/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { HTML_ELEMENTS } from './lib/elements'
import { Quiz } from './lib/classes'

// ICONS
const Icons = {
  moon: 'bi bi-moon text-white',
  sun: 'bi bi-sun text-white',
}

HTML_ELEMENTS.toggleModeINP.defaultChecked = true
HTML_ELEMENTS.toggleModeIcon.className = Icons.moon

// Functions
HTML_ELEMENTS.toggleModeINP.addEventListener('change', (e) => {
  const INP = e.target as typeof HTML_ELEMENTS.toggleModeINP

  // document.body.className = INP.checked ? 'dark' : 'light'
  HTML_ELEMENTS.toggleModeIcon.className = INP.checked ? Icons.moon : Icons.sun
})

const quiz = new Quiz()

window.onload = () => {
  const href = location.href.split('/').at(-1) || ''

  if (!href) return quiz.init()

  return quiz.start()
}
