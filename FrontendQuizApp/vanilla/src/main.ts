import './sass/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Quiz, UI } from './lib/classes'

const quiz = new Quiz()
const ui = new UI()

window.onload = () => {
  const href = location.href.split('/').at(-1) || ''

  const mode = {
    light: ui.lightMode.bind(ui),
    dark: ui.darkMode.bind(ui),
  }

  const userMode = localStorage.getItem('mode') as keyof typeof mode

  userMode && mode[userMode]()

  if (!href) return quiz.init()

  return quiz.start()
}
