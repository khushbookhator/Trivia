
import { GET_GOT_REQ, GET_GOT_SUC, GET_GOT_FAIL } from './Actiontype';

const init={
    got:[],
    isLoading:false,
    isError:false,
}


export const gotReducer = (state=init,action)=>{
    switch(action.type){
        case GET_GOT_REQ:{
            return{
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case GET_GOT_SUC:{
            return{
                ...state,
                got:action.payload,
                isLoading:false
            }
        }
        case GET_GOT_FAIL:{
            return{
                ...state,
                isLoading:false,
                isError:true
            }
        }
        default:
            return state
    }
}