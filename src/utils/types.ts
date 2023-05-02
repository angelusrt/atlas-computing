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

export type { HTMLRef, DivRef, ButtonRef, PostType, IndexType }
export { ThemeEnum, PageEnum }