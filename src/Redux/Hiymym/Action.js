
import { GET_HIM_SUC, GET_HIM_REQ, GET_HIM_FAIL } from './Actiontype';
import axios from "axios"

export const getHimReq = ()=>{
    return{
        type: GET_HIM_REQ
    }
}


export const getHimSuc = (payload) => {
    return{
        type:GET_HIM_SUC,
        payload
    }
}

export const getHimFail = (error)=>{
    return{
        type:GET_HIM_FAIL,
        payload:error
    }
}

export const getHimQues = (payload) => (dispatch) => {
    dispatch(getHimReq())
    return axios.get("https://k-books.herokuapp.com/himym").then((res) => dispatch(getHimSuc(res.data)))
    .catch((err) => dispatch(getHimFail(err)))
}