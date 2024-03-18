import {selector} from 'recoil';
import {quizState} from "../atoms/quiz"
export const score=selector({
key:"scorestate",
get:({get})=>{
    const state=get(quizState);
    return state.score;
}
})