import { ReactNode } from "react";
import { TutorialContextType } from "./TutorialContextType";

export type TutorialProps = {
    children: ReactNode;
    value: TutorialContextType
};
