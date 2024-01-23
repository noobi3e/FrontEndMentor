import './styles/main.scss'

class Password {
  #passwordLengthSelector = document.getElementById(
    'passCharSlider'
  ) as HTMLInputElement
  #passGeneratorForm = document.getElementById('passGenForm') as HTMLFormElement
  #passLengthUIElement = document.getElementById(
    'charLengthDisplay'
  ) as HTMLParagraphElement
  #includeUpperChar = document.getElementById(
    'isIncludeUpperChar'
  ) as HTMLInputElement
  #includeLowerChar = document.getElementById(
    'isIncludeLowerChar'
  ) as HTMLInputElement
  #includeNumber = document.getElementById(
    'isIncludeNumber'
  ) as HTMLInputElement
  #includeSymbols = document.getElementById(
    'isIncludeSymbols'
  ) as HTMLInputElement
  #passDisplayBox = document.getElementById(
    'passDisplayBox'
  ) as HTMLParagraphElement
  #copyBtn = document.getElementById('copyBtn') as HTMLButtonElement
  #copiedText = document.getElementById('copiedText') as HTMLSpanElement
  lowerChars = 'abcdefghijklmnopqrstuvwxyz'
  upperChars = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
  numbers = '0123456789'
  symbols = `${'`'}!@#$%^&*()-_=+{}[]|:""''<>,./;`
  #timeout: number = setTimeout(() => {}, 0)

  constructor() {
    this.#passGeneratorForm.addEventListener('submit', (e) => {
      e.preventDefault()
      this.#generatePass()
    })
  }

  #generatePass() {
    this.#passDisplayBox.textContent = 'P4$5W0rD!'

    let password = ''
    const passLength = +this.#passwordLengthSelector.value
    const includeUpper = this.#includeUpperChar.checked
    const includeLower = this.#includeLowerChar.checked
    const includeNumber = this.#includeNumber.checked
    const includeSymbols = this.#includeSymbols.checked

    if (!(includeLower || includeUpper || includeSymbols || includeNumber))
      return

    for (let i = 0; i < passLength; i++) {
      let char = ''

      if (includeLower)
        char =
          this.lowerChars[Math.trunc(Math.random() * this.lowerChars.length)]

      if (includeUpper)
        char =
          this.upperChars[Math.trunc(Math.random() * this.upperChars.length)]

      if (includeNumber)
        char = this.numbers[Math.trunc(Math.random() * this.numbers.length)]

      if (includeSymbols)
        char = this.symbols[Math.trunc(Math.random() * this.symbols.length)]

      password += char
    }

    this.#passDisplayBox.textContent = password
  }

  init() {
    this.#passLengthUIElement.textContent = this.#passwordLengthSelector.value

    // CHANGE PASS LENGTH ELEMENT WHENEVER USER CHANGE RANGE
    this.#passwordLengthSelector.addEventListener('change', () => {
      this.#passLengthUIElement.textContent = this.#passwordLengthSelector.value
    })

    // COPY PASS
    this.#copyBtn.addEventListener('click', () => {
      this.#copiedText.querySelector('span')!.textContent = 'COPIED'
      if (this.#passDisplayBox.textContent === 'P4$5W0rD!') return

      clearTimeout(this.#timeout)

      this.#copiedText.style.transform = 'scaleX(1)'

      this.#timeout = setTimeout(() => {
        this.#copiedText.style.transform = 'scaleX(0)'
      }, 1000)

      navigator.clipboard.writeText(this.#passDisplayBox.textContent as string)
    })
  }
}

new Password().init()
