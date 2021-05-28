import Types from "./types";
import DataStore from "../expands/dao/DataStore";

function change_page1_text(text) {
  // 接受一个文本text，将其交给reducer进行处理
  // 返回一个字典   包括事件类型  和要传递的值
  return { type: Types.Change_Page1_text, text: text };
}

function change_page2_text(text) {
  return { type: Types.Change_Page2_text, text: text };
}

function onPopularPageRefresh(tabLabelName, url) {
  return dispatch => {
    //  首先返回正在刷新状态
    dispatch({ type: Types.POPULAR_REFRESH, tabLabelName: tabLabelName, items: null });
    let dataStore = new DataStore();
    dataStore.fetchData(url)
      .then((data) => {
        dispatch({
          type: Types.POPULAR_REFRESH_SUCCESS,
          items: data && data.data && data.data.items,
          tabLabelName: tabLabelName,
        });
      })
      .catch((error) => {
        dispatch({ type: Types.POPULAR_REFRESH_FAIL, items: null, tabLabelName: tabLabelName });
      });
  };
}


export default {
  //  导出方法集
  change_page1_text,
  change_page2_text,
  onPopularPageRefresh,
};


