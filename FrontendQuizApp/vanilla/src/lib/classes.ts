import { QUIZ_QUESTIONS } from './data'
import { HTML_ELEMENTS } from './elements'
import { OPTIONS, Questions } from './types'

export class UI {}

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
  #mode: 'next' | 'submit' | 'results' = 'submit'
  #error = HTML_ELEMENTS.errorBox
  #score = 0

  constructor() {}

  // Private Methods
  #updateProgressBar() {
    const width = (this.#quesIndex / this.#questions.length) * 100
    this.#progressBar.style.width = `${width}%`
  }

  // UTIL Functions
  _convertJSONToHTML(option: OPTIONS, optionNo: number) {
    // IN BELOW CODE I am applying right or wrong classes conditionally which will be get used later to show right or wrong answer state.
    return `
      <article class="">
        <input type="radio" name="answers" id="option${optionNo}" class="answersINP" hidden />     
        <label 
        style="animation-delay: 0.${optionNo}s"
        for="option${optionNo}" role="button" class="text-2xl w-full h-[90px] rounded-[24px] bg-primaryLight flex items-center gap-5 p-4 transition-all border-[4px] border-transparent comeIn ${
      option.isCorrect ? 'right' : 'wrong'
    }">
          <span
            class="bg-[#F5F6FD]  aspect-square h-full rounded-[12px] transition-all flex items-center justify-center text-primary font-semibold text-2xl uppercase  ${
              option.isCorrect ? 'right' : 'wrong'
            }">
            ${Quiz.OPTION_LABELS[optionNo]}
          </span>
          ${option.title}

          <img src="/icons/${
            option.isCorrect ? 'icon-correct.svg' : 'icon-incorrect.svg'
          }" class="ml-auto hidden h-full w-auto" />
        </label>
      </article>
    `
  }

  _generateOptionsHTML(options: OPTIONS[]) {
    this.#optionsContainer.innerHTML = ''

    const optionsHTML = options.map((el, i) => this._convertJSONToHTML(el, i))

    optionsHTML.forEach((el) =>
      this.#optionsContainer.insertAdjacentHTML('beforeend', el)
    )
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

    this.#answerForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const answersHTML = Array.from(
        document.getElementsByClassName('answersINP')
      ) as HTMLInputElement[]
      let isAnswered = false

      answersHTML.forEach((el) => {
        if (el.checked) isAnswered = true
      })

      const userAns = answersHTML.find((el) => el.checked)

      if (!isAnswered)
        return (this.#error.textContent = 'Please Select one option')

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

          break

        case 'results':
          console.log('I AM HERE')
          break

        default:
          ''
      }
    })
  }

  init() {
    // Reset
    this.#progressBarBox.style.display = 'none'
    this._updateLabel('init')
    this.#activeQuizHeader.innerHTML = ''
    this.#optionsContainer.innerHTML = ''
    this.#submitBtn.style.display = 'none'

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
