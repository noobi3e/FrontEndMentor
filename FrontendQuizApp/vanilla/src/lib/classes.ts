import { QUIZ_QUESTIONS } from './data'
import { HTML_ELEMENTS } from './elements'
import { OPTIONS, Questions } from './types'

export class UI {
  #body = document.body
  #toggleModeBtn = HTML_ELEMENTS.toggleModeINP
  #moonIcon = HTML_ELEMENTS.moonIcon
  #sunIcon = HTML_ELEMENTS.sunIcon
  #optionContainer = HTML_ELEMENTS.optionsContainer
  #progressBar = HTML_ELEMENTS.progressBarBOX
  #infoLabel = HTML_ELEMENTS.infoLabel
  #graphics = {
    top: HTML_ELEMENTS.graphicsTop,
    bottom: HTML_ELEMENTS.graphicsBottom,
  }

  constructor() {
    this.#toggleModeBtn.addEventListener('change', (e) => {
      const INP = e.target as typeof HTML_ELEMENTS.toggleModeINP
      localStorage.setItem('mode', INP.checked ? 'dark' : 'light')
      INP.checked ? this.darkMode() : this.lightMode()
    })
  }

  lightMode() {
    this.#toggleModeBtn.checked = false
    this.#body.classList.add('cus-light')
    this.#body.classList.remove('cus-dark')
    this.#moonIcon.src = './icons/icon-moon-.svg'
    this.#sunIcon.src = './icons/icon-sun-dark.svg'
    this.#optionContainer.classList.add('cus-light')
    this.#progressBar.style.background = '#EBF2FF'
    this.#graphics.top.style.borderColor = '#F5F6FD'
    this.#graphics.bottom.style.borderColor = '#F5F6FD'
    this.#infoLabel.style.color = '#2C3949'
  }

  darkMode() {
    this.#toggleModeBtn.checked = true
    this.#infoLabel.style.color = '#F5F6FD80'
    this.#body.classList.add('cus-dark')
    this.#body.classList.remove('cus-light')
    this.#moonIcon.src = './icons/icon-moon-light.svg'
    this.#sunIcon.src = './icons/icon-sun-dark.svg'
    this.#optionContainer.classList.remove('cus-light')
    this.#progressBar.style.background = '#3C4C67'
    this.#graphics.top.style.borderColor = '#2C3949'
    this.#graphics.bottom.style.borderColor = '#2C3949'
  }
}

export class Quiz {
  static OPTION_LABELS = ['a', 'b', 'c', 'd']
  static SUJECTS = QUIZ_QUESTIONS

  // Private Fields
  #questions: Questions[] = []
  #progressBar = HTML_ELEMENTS.progressBar
  #questionEl = HTML_ELEMENTS.question
  #optionsContainer = HTML_ELEMENTS.optionsContainer
  #answerForm = HTML_ELEMENTS.answerForm
  #submitBtn = HTML_ELEMENTS.submitButton
  #infoLabel = HTML_ELEMENTS.infoLabel
  #activeQuizHeader = HTML_ELEMENTS.activeQuizHeader
  #quesIndex = 0
  #progressBarBox = HTML_ELEMENTS.progressBarBOX
  #mode: 'next' | 'submit' | 'results' | 'reset' = 'submit'
  #error = HTML_ELEMENTS.errorBox
  #score = 0

  constructor() {
    this.#answerForm.addEventListener('submit', (e) => {
      e.preventDefault()
      this._setError('')

      const answersHTML = Array.from(
        document.getElementsByClassName('answersINP')
      ) as HTMLInputElement[]
      let isAnswered = false

      answersHTML.forEach((el) => {
        // Adding a Event Listener to every option input to set error to none
        el.addEventListener('change', () => this._setError(''))
        if (el.checked) isAnswered = true
      })

      const userAns = answersHTML.find((el) => el.checked)

      if (this.#mode !== 'reset' && !isAnswered)
        return this._setError('Please Select one option')

      // Submitting form Acc. to currently active mode
      switch (this.#mode) {
        case 'next':
          // changing mode to submit
          this.#mode = 'submit'
          // updating quiz html
          this._updateQuizHTML()
          break

        case 'submit':
          // increasing question Index / Count
          this.#quesIndex += 1
          // updating mode
          this.#mode =
            this.#quesIndex === this.#questions.length ? 'results' : 'next'
          // updating button text
          this.#submitBtn.textContent =
            this.#mode === 'next' ? 'Next Question' : 'Show Results'
          // updating progress bar
          this.#updateProgressBar()

          // Disabling all answers HTML on click of submit button
          answersHTML.forEach((el) => (el.disabled = true))
          // adding "showAnser" class on input parent article element.
          userAns?.closest('article')?.classList.add('showAnswer')
          if (userAns?.value === 'right') this.#score += 1

          break

        case 'results':
          this.#progressBarBox.style.display = 'none'
          this._showResult()
          this.#mode = 'reset'
          this.#submitBtn.textContent = 'Play Again'
          break

        case 'reset':
          location.replace('/')
          break

        default:
          ''
      }
    })
  }

  // Private Methods
  #updateProgressBar() {
    const width = (this.#quesIndex / this.#questions.length) * 100
    this.#progressBar.style.width = `${width}%`
  }

  _generateOptionsHTML(options: OPTIONS[]) {
    this.#optionsContainer.innerHTML = ''

    const optionsHTML = options.map(
      (el, i) => `
      <article class="">
        <input type="radio" name="answers" id="option${i}" class="answersINP" hidden value=${
        el.isCorrect ? 'right' : 'wrong'
      } />     
        <label 
        style="animation-delay: 0.${i}s"
        for="option${i}" role="button" class="text-2xl max-[400px]:text-lg max-[700px]:text-xl w-full h-[90px] rounded-[24px] bg-primaryLight flex items-center gap-5 p-4 transition-all border-[4px] border-transparent comeIn ${
        el.isCorrect ? 'right' : 'wrong'
      }">
          <span
            class="bg-[#F5F6FD]  aspect-square h-full rounded-[12px] transition-all flex items-center justify-center text-primary font-semibold text-2xl uppercase  ${
              el.isCorrect ? 'right' : 'wrong'
            }">
            ${Quiz.OPTION_LABELS[i]}
          </span>
          ${el.title}

          <img src="/icons/${
            el.isCorrect ? 'icon-correct.svg' : 'icon-incorrect.svg'
          }" class="ml-auto hidden h-full w-auto" />
        </label>
      </article>
    `
    )

    optionsHTML.forEach((el) =>
      this.#optionsContainer.insertAdjacentHTML('beforeend', el)
    )
  }

  _setError(errMessage: string) {
    this.#error.textContent = errMessage
  }

  _showResult() {
    this.#questionEl.innerHTML = `
     <span class="font-thin"> Quiz Completed </span>
    <strong class="text-8xl font-medium mt-1">You Scored....</strong>
    `
    const searchParams = new URLSearchParams(window.location.search)

    const type = searchParams.get('type')

    this.#questions =
      Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.questions ||
      []

    this.#optionsContainer.innerHTML = `
    <div class="w-full p-8 flex flex-col gap-10 bg-primaryLight shadow-custom rounded-2xl items-center">
      <div class="flex gap-2 items-center">
        <div
        style="background: ${
          Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)
            ?.backgroundColor
        }"
        class="aspect-square h-[50px] rounded-[8px] transition-all flex items-center justify-center text-primary font-semibold text-2xl">
        <img src="${
          Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.icon
        }" />
        </div>
        <h2 class="text-2xl" >
        ${Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.title}
        </h2>
      </div>

      <div class="flex flex-col items-center">
        <h3 class="text-7xl">${this.#score}</h3>
        <p>out of ${this.#questions.length}</p>
      </div>
    </div>
    `
  }

  // Function to Update Label
  _updateLabel(type: 'init' | 'quiz') {
    // ONLY TWO CASES ALLOWED
    switch (type) {
      // INITIALIZE
      case 'init':
        this.#infoLabel.style.order = '2'
        this.#infoLabel.style.marginTop = '15px'
        this.#infoLabel.style.fontSize = '18px'
        this.#infoLabel.textContent = 'Pick a Subject to Get Started'
        break

      // QUIZ
      case 'quiz':
        this.#infoLabel.style.order = '0'
        this.#infoLabel.style.marginTop = '0px'
        this.#infoLabel.style.fontSize = '16px'
        this.#infoLabel.textContent = `Question ${this.#quesIndex + 1} out of ${
          this.#questions.length
        }`
        break

      default:
        ''
    }
  }

  // Function to set questions acc to topic selected
  _setQuestions() {
    const searchParams = new URLSearchParams(window.location.search)

    const type = searchParams.get('type')

    this.#questions =
      Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.questions ||
      []

    // Setting Currently active quiz
    this.#activeQuizHeader.innerHTML = `
            <div
              style="background: ${
                Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)
                  ?.backgroundColor
              }"
              class="aspect-square h-[50px] rounded-[8px] transition-all flex items-center justify-center text-primary font-semibold text-2xl">
              <img src="${
                Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.icon
              }" />
            </div>
            <h2 class="text-2xl" >
            ${Quiz.SUJECTS.find((el) => el.title.toLowerCase() === type)?.title}
            </h2>
    `
  }

  // Updating Quiz Container Acc. to Question
  _updateQuizHTML() {
    this.#questionEl.innerHTML = this.#questions[this.#quesIndex].ques
    this._updateLabel('quiz')
    this._generateOptionsHTML(this.#questions[this.#quesIndex].options)
    this.#submitBtn.textContent = 'Submit Answer'
    this.#submitBtn.style.display = 'flex'
  }

  // Public Methods
  start() {
    // Setting Questions
    this._setQuestions()

    if (this.#questions.length <= 0) return

    this.#progressBarBox.style.display = 'block'
    this._updateQuizHTML()
    this.#mode = 'submit'
  }

  init() {
    // Reset
    this.#progressBarBox.style.display = 'none'
    this._updateLabel('init')
    this.#activeQuizHeader.innerHTML = ''
    this.#optionsContainer.innerHTML = ''
    this.#submitBtn.style.display = 'none'
    this.#questionEl.innerHTML = `
    <span class="font-thin"> Welcome to the </span>
    <strong class="text-6xl font-medium">Frontend Quiz !</strong>
    `
    this.#score = 0
    this.#questions = []

    const sujectsHTML = Quiz.SUJECTS.map(
      (el) =>
        `
        <article class="">
          <a href="/?type=${el.title.toLowerCase()}"
          class="text-2xl w-full cursor-pointer h-[90px] rounded-[20px] bg-primaryLight flex items-center gap-5 p-3 transition-all border-[4px] border-transparent font-medium outline-none typeLink">
            <span
              style="background: ${el.backgroundColor}"
              class="aspect-square h-full rounded-[10px] transition-all flex items-center justify-center text-primary font-semibold text-2xl">
              <img src="${el.icon}" />
            </span>
            ${el.title}
          </a>
        </article>
        `
    )

    sujectsHTML.forEach((el) =>
      this.#optionsContainer.insertAdjacentHTML('beforeend', el)
    )
  }
}
