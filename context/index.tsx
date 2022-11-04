import { useContext } from 'react';

import { HandsContext } from './hands';

export const useHandsContext = () => useContext(HandsContext);