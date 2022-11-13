import { ReactNode } from "react";
import { BooleanContextType } from "./BooleanContextType";

export type BooleanProps = {
    children: ReactNode;
    value: BooleanContextType
};