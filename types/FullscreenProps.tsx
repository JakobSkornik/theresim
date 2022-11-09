import { ReactNode } from "react";
import { FullscreenContextType } from "./FullscreenContextType";

export type FullscreenProps = {
    children: ReactNode;
    value: FullscreenContextType
};