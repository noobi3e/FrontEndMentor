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
const sunIcon = document.getElementById('sunIcon') as HTMLImageElement
const moonIcon = document.getElementById('moonIcon') as HTMLImageElement

const graphicsTop = document.getElementById('graphicsTop') as HTMLDivElement
const graphicsBottom = document.getElementById(
  'graphicsBottom'
) as HTMLDivElement

export const HTML_ELEMENTS = {
  progressBar,
  question,
  answerForm,
  submitButton,
  optionsContainer,
  toggleModeINP,
  progressBarBOX,
  infoLabel,
  activeQuizHeader,
  errorBox,
  graphicsBottom,
  graphicsTop,
  sunIcon,
  moonIcon,
}
