import { OPTIONS } from './types'

export const GenerateOptions = (options: OPTIONS[]) => {
  const OPTION_LABEL = ['a', 'b', 'c', 'd']

  const convertOptionsToHTML = (option: OPTIONS, optionNo: number) => `
  <article class="">
    <input type="radio" name="answers" id="option${optionNo}" hidden />
      <div
        class="w-full h-[90px] rounded-[26px] bg-primaryLight flex items-center gap-5 py-4 px-5 transition-all">
        <div
          class="bg-[#F5F6FD] aspect-square h-full rounded-[16px] flex items-center justify-center text-primary font-semibold text-3xl uppercase">
            ${OPTION_LABEL[optionNo]}
        </div>
        <label for="option${optionNo}" role="button" class="w-full text-2xl">${option.title}</label>
      </div>
  </article>
  `

  return options.map((el, i) => convertOptionsToHTML(el, i))
}
