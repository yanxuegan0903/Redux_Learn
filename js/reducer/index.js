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



function onNotiMessageLoad(state={},action){
  switch (action.type){
    case Types.NOTIMESSAGE_REFRESH:{
      return {
        ...state,
        response:{
          ...state['response'],
          items:action.items,
          isLoading:true,
          hideLoadingMore:true,
          currentIndex:action.currentIndex
        }
      }
    }
    case Types.NOTIMESSAGE_REFRESH_SUCCESS:{
      return {
        ...state,
        response:{
          ...state['response'],
          items:action.items,
          isLoading:false,
          hideLoadingMore:false,
          currentIndex:action.currentIndex
        }

      }
    }
    case Types.NOTIMESSAGE_REFRESH_FAIL:{
      return {
        ...state,
        response:{
          ...state['response'],
          items:action.items,
          isLoading:false,
          hideLoadingMore:true,
          currentIndex:action.currentIndex
        }
      }
    }
    case Types.NOTIMESSAGE_LOADMORE: {
      return {
        ...state,
        response: {
          ...state['response'],
          items: action.items,
          isLoading: false,
          hideLoadingMore: false,
          currentIndex:action.currentIndex
        }
      }
    }
    case Types.NOTIMESSAGE_LOADMORE_SUCCESS:{
      return {
        ...state,
        response:{
          ...state['response'],
          items:action.items,
          isLoading:false,
          hideLoadingMore:false,
          currentIndex:action.currentIndex
        }
      }
    }
    case Types.NOTIMESSAGE_LOADMORE_FAIL:{
      return {
        ...state,
        response:{
          ...state['response'],
          items:action.items,
          isLoading:false,
          hideLoadingMore:true,
          currentIndex:action.currentIndex
        }
      }
    }

    default :{
      return state
    }
  }


}



const reducers = combineReducers({
  changeText:changeText,
  onPopularRefreshStateChange:onPopularRefreshStateChange,
  onNotiMessageLoad:onNotiMessageLoad
})

//  导出reducers
export default reducers
