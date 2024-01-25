import { useEffect } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {

    clickRef = useRef(); // useRef

    useEffect(() => {
        clickRef.current.focus;
    }, [clickRef]);

    const handleButtonClick = () => {

    };

    return (
        <div>
            <input ref = {clickRef} type="text" placeholder="Enter text here" /> {/*The DOM element that is accesed through useRef*/ }
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
