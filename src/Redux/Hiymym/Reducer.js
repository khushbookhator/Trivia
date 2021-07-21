
import { GET_HIM_REQ, GET_HIM_SUC, GET_HIM_FAIL } from './Actiontype';

const init={
    him:[],
    isLoading:false,
    isError:false,
}


export const himReducer = (state=init,action)=>{
    switch(action.type){
        case GET_HIM_REQ:{
            return{
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case GET_HIM_SUC:{
            return{
                ...state,
                him:action.payload,
                isLoading:false
            }
        }
        case GET_HIM_FAIL:{
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