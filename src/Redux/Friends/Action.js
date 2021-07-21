
import { GET_FRIENDS_SUC, GET_FRIENDS_REQ, GET_FRIENDS_FAIL } from './Actiontype';
import axios from "axios"

export const getFriendsReq = ()=>{
    return{
        type: GET_FRIENDS_REQ
    }
}


export const getFriendsSuc = (payload) => {
    return{
        type:GET_FRIENDS_SUC,
        payload
    }
}

export const getFriendsFail = (error)=>{
    return{
        type:GET_FRIENDS_FAIL,
        payload:error
    }
}

export const getFriendsQues = (payload) => (dispatch) => {
    dispatch(getFriendsReq())
    return axios.get("https://k-books.herokuapp.com/friends").then((res) => dispatch(getFriendsSuc(res.data)))
    .catch((err) => dispatch(getFriendsFail(err)))
}