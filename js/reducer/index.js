import {combineReducers} from "redux";
import Types from '../action/types'

const defaultText = 'defauleText'

function changeText(state = defaultText,action){
  switch (action.type){
    case Types.Change_Page1_text:{
      return{
        ...state,
        text:action.text
      }
    }
    case Types.Change_Page2_text:{
      return{
        ...state,
        text:action.text
      }
    }
    default:
      return state
  }
}



const reducers = combineReducers({
  changeText
})

//  导出reducers
export default reducers
