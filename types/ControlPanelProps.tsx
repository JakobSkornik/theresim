import { ReactNode } from "react";
import { ControlPanelContextType } from "./ControlPanelContextType";
import { TutorialContextType } from "./TutorialContextType";

export type ControlPanelProps = {
    children: ReactNode;
    value: ControlPanelContextType
};
