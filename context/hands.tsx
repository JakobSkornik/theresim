import { Landmark } from "@mediapipe/hands";
import { createContext, useContext, useState } from "react"

import { HandsContextType, Props } from "../types";

const defaultHandsContextType: HandsContextType = {
  rightHand: [],
  leftHand: [],
  updateRightHand: (hand: Landmark[]) => {},
  updateLeftHand: (hand: Landmark[]) => {},
}

export const HandsContext = createContext<HandsContextType>(defaultHandsContextType);

export function useHands() {
    return useContext(HandsContext);
}

export function HandsProvider({ children }: Props) {
    const [rightHand, setRightHand] = useState<Landmark[]>([]);
    const [leftHand, setLeftHand] = useState<Landmark[]>([]);

    const updateRightHand = (hand: Landmark[]) => {
        setRightHand(hand)
    }
    const updateLeftHand = (hand: Landmark[]) => {
        setLeftHand(hand)
    }

    const value: HandsContextType = {
        rightHand,
        leftHand,
        updateRightHand,
        updateLeftHand
    }
    
    return (
        <>
            <HandsContext.Provider value={value}>
                {children}
            </HandsContext.Provider>
        </>
    );
}