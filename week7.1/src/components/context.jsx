import { createContext } from 'react';      

export const CountContext = createContext(); // This will allow us to pass the count state to any component in the tree without having to pass it down as props.