import {atom} from 'recoil';

export const quizState=atom({
    key:'quizState',
    default:{
        quiz:null,
        score:0
    },
});