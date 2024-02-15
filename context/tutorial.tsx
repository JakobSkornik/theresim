import { createContext, FC } from 'react'
import { TutorialProps, TutorialContextType } from '../types'

export const TutorialContext = createContext<TutorialContextType>({
  stage: 0,
  setStage: () => {},
})

const TutorialProvider: FC<TutorialProps> = (props: TutorialProps) => {
  return (
    <TutorialContext.Provider value={props.value}>
      {props.children}
    </TutorialContext.Provider>
  )
}

export default TutorialProvider
