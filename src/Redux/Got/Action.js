
import { GET_GOT_SUC, GET_GOT_REQ, GET_GOT_FAIL } from './Actiontype';
import axios from "axios"

export const getGotReq = ()=>{
    return{
        type: GET_GOT_REQ
    }
}


export const getGotSuc = (payload) => {
    return{
        type:GET_GOT_SUC,
        payload
    }
}

export const getGotFail = (error)=>{
    return{
        type:GET_GOT_FAIL,
        payload:error
    }
}

export const getGotQues = (payload) => (dispatch) => {
    dispatch(getGotReq())
    return axios.get("https://k-books.herokuapp.com/gameofthrones").then((res) => dispatch(getGotSuc(res.data)))
    .catch((err) => dispatch(getGotFail(err)))
}