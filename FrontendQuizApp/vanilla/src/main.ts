import './sass/main.scss'
import { HTML_ELEMENTS } from './lib/elements'
import { GenerateOptions } from './lib/functions'

let per = 0
setInterval(() => {
  per += 1

  HTML_ELEMENTS.progressBar.style.width = `${per}%`

  if (per >= 100) per = 0
}, 100)

console.log('I AM HERE')

const options = GenerateOptions([
  {
    title: '4.5:1',
  },
  {
    title: '3 : 1',
  },
  {
    title: '2.5:1',
  },
  {
    title: '5:1',
  },
])

options.forEach((el) =>
  HTML_ELEMENTS.optionsContainer.insertAdjacentHTML('beforeend', el)
)
