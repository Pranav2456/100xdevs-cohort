import { atom, selector } from 'recoil';


export const countAtom = atom({
    key: "countAtom",
    default: 0
});

export const evenCountState = selector({
    key: "evenCountState",
    get: ({get}) => {
        const count = get(countAtom);

        return count % 2 === 0 ? "Count is even" : "Count is odd";
    },
})