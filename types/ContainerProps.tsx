import { ReactNode } from "react";

export type ContainerProps = {
    children: ReactNode;
    style: {[Key: string]: string} | null
    title: string
}