import {combineReducers} from "redux";
import Types from '../action/types'

const defaultText = 'defauleText'
const defaultPopularState = {

}
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

function onPopularRefreshStateChange(state=defaultPopularState,action){
  switch (action.type){
    case Types.POPULAR_REFRESH:{
      return {
        ...state,
        [action.tabLabelName]:{
          ...state[action.tabLabelName],
          items:action.items,
          isLoading:true
        }
      }
    }
    case Types.POPULAR_REFRESH_FAIL:{
      return {
        ...state,
        [action.tabLabelName]:{
          ...state[action.tabLabelName],
          items:action.items,
          isLoading:false
        }
      }
    }
    case Types.POPULAR_REFRESH_SUCCESS:{
      return {
        ...state,
        [action.tabLabelName]:{
          ...state[action.tabLabelName],
          items:action.items,
          isLoading:false
        }
      }
    }
    default:{
      return state
    }
  }
}

const reducers = combineReducers({
  changeText:changeText,
  onPopularRefreshStateChange:onPopularRefreshStateChange
})

//  导出reducers
export default reducers
