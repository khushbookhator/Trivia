
import { GET_FRIENDS_REQ, GET_FRIENDS_SUC, GET_FRIENDS_FAIL } from './Actiontype';

const init={
    friends:[],
    isLoading:false,
    isError:false,
}


export const friendsReducer = (state=init,action)=>{
    switch(action.type){
        case GET_FRIENDS_REQ:{
            return{
                ...state,
                isLoading:true,
                isError:false
            }
        }
        case GET_FRIENDS_SUC:{
            return{
                ...state,
                friends:action.payload,
                isLoading:false
            }
        }
        case GET_FRIENDS_FAIL:{
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