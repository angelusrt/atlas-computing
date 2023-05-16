type HTMLRef = React.MutableRefObject<HTMLElement>
type DivRef = React.MutableRefObject<HTMLDivElement>
type ButtonRef = React.MutableRefObject<HTMLButtonElement>

type PostType = {
  content: any,
  id: number
}

enum ThemeEnum { Dark, Light }

enum PageEnum { Home, Post, About }

type IndexType = {
  id: string, 
  text: string
}

enum LangEnum {PT, EN, DE}

const langDic = ["pt-br", "en-us", "de-de"] as const

export type { HTMLRef, DivRef, ButtonRef, PostType, IndexType }
export { ThemeEnum, PageEnum, LangEnum, langDic }