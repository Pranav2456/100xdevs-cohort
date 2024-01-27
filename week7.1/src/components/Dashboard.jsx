import React, {useState} from 'react';
import { createContext, useContext } from 'react';    
import { CountContext } from './context';              

export default function Dashboard() {
    const [count, setCount] = useState(0)

    // wrap anyone that wants to use the count state in a CountContext.Provider
    return <div>
    <CountContext.Provider value = {count}>
    <Count setCount = {setCount}/>
    </CountContext.Provider>
    </div>
}

function Count({setCount}) {
return <div>
    <CountRenderer />
    <Button setCount = {setCount}/>
</div>
}

function CountRenderer() {
    const count = useContext(CountContext); // This will allow us to access the count state from anywhere in the tree.
    return <div>
        {count}
    </div>
}

function Button({setCount}) {
    const count = useContext(CountContext);
    return <div>
        <button onClick = {() => {
            setCount(count + 1)
        }}>Increment</button>
        <button onClick = {() => {
            setCount(count - 1)

        }}>Decrement</button>
    </div>
}