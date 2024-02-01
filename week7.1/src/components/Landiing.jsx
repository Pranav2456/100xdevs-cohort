import React, {useState} from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { countAtom } from '../store/atoms/count';     

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
    return <div>
        {count}
    </div>
}

function Button() {
    const [count, setCount] = useRecoilState(countAtom);
    return <div>
        <button onClick = {() => {
            setCount(count + 1)
        }}>Increment</button>
        <button onClick = {() => {
            setCount(count - 1)

        }}>Decrement</button>
    </div>
}