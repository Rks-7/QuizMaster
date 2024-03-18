import {selector} from 'recoil';
import {userState} from "../atoms/user"
export const useremail=selector({
key:"useremailstate",
get:({get})=>{
    const state=get(userState);
    return state.userEmail;
}
})