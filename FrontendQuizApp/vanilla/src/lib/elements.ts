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

const toggleModeIcon = document.getElementById('toggleModeIcon') as HTMLElement

const toggleModeINP = document.getElementById(
  'toggleModeINP'
) as HTMLInputElement

const progressBarBOX = document.getElementById(
  'progressBarBOX'
) as HTMLDivElement

const infoLabel = document.getElementById('infoLabel') as HTMLElement

const activeQuizHeader = document.getElementById(
  'activeQuizHeader'
) as HTMLDivElement

const errorBox = document.getElementById('errorBox') as HTMLParagraphElement

export const HTML_ELEMENTS = {
  progressBar,
  question,
  answerForm,
  submitButton,
  optionsContainer,
  toggleModeINP,
  toggleModeIcon,
  progressBarBOX,
  infoLabel,
  activeQuizHeader,
  errorBox,
}
