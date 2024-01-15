const progressBar = document.getElementById(
  'progressBar'
) as HTMLParagraphElement
const question = document.getElementById('question') as HTMLHeadingElement
const answerForm = document.getElementById('answerForm') as HTMLFormElement
const optionsContainer = document.getElementById(
  'optionsContainer'
) as HTMLDivElement
const submitButton = document.getElementById(
  'submitButton'
) as HTMLButtonElement

export const HTML_ELEMENTS = {
  progressBar,
  question,
  answerForm,
  submitButton,
  optionsContainer,
}
