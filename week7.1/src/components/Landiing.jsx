import React, {useState} from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { countAtom } from '../store/atoms/count';     
import { render } from 'react-dom';
import { evenCountState } from '../store/atoms/count';

export default function Landing() {

    return (
    <div>
    <RecoilRoot>
     <Count/>
    </RecoilRoot>
    </div>
    )
}

function Count() {
return <div>
    <CountRenderer />
    <Button/>
</div>
}

function CountRenderer() {
    const count = useRecoilValue(countAtom);
    const evenCount = useRecoilValue(evenCountState);
    return <div>
        {count} <br/>
        {evenCount}
    </div>
}

function Button() {
   // const [count, setCount] = useRecoilState(countAtom);
   const setCount = useSetRecoilState(countAtom);
    return <div>
        <button onClick = {() => {
            setCount(count => count + 1)
        }}>Increment</button>
        <button onClick = {() => {
            setCount(count => count - 1)

        }}>Decrement</button>
    </div>
}