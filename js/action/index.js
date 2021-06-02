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


const DataSource = [
  {
    id: 0,
    type: 0,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "微信--0",
    desc: "爸爸妈妈，我想多用一下xxx应用",
  },
  {
    id: 1,
    type: 1,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "版本更新通知--1",
    desc: "您的U60有新版本了",
  },
  {
    id: 2,
    type: 2,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "应用禁用--2",
    desc: "发现您的U60，近期多次通过XX应用浏览不良内容，已禁用该应用，请您重视和规范孩子的行为，如是本人使用请忽略",
  },
  {
    id: 3,
    type: 3,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "管理功能名字--3",
    desc: "管理功能的描述",
  },
  {
    id: 4,
    type: 0,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "微信--4",
    desc: "爸爸妈妈，我想多用一下xxx应用",
  },
  {
    id: 5,
    type: 1,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "版本更新通知--5",
    desc: "您的U60有新版本了",
  },
  {
    id: 6,
    type: 2,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "应用禁用--6",
    desc: "发现您的U60，近期多次通过XX应用浏览不良内容，已禁用该应用，请您重视和规范孩子的行为，如是本人使用请忽略",
  },
  {
    id: 7,
    type: 3,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "管理功能名字--7",
    desc: "管理功能的描述",
  },
  {
    id: 8,
    type: 0,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "微信--8",
    desc: "爸爸妈妈，我想多用一下xxx应用",
  },
  {
    id: 9,
    type: 1,  //  0:远程解密  1：系统通知  2；安全通知 3：管理功能
    name: "版本更新通知--9",
    desc: "您的U60有新版本了",
  },
];


function onNotiMessageLoad(currentIndex, pageSize,dataArray = []) {
  return dispatch => {
    if(currentIndex === 1){
      dispatch({ type: Types.NOTIMESSAGE_REFRESH, items: dataArray ,currentIndex:currentIndex});
    }else{
      dispatch({ type: Types.NOTIMESSAGE_LOADMORE, items: dataArray  ,currentIndex:currentIndex});
    }

    setTimeout(() => {
      let randomResult = getRandom1(0,100)%2

      if (currentIndex === 1){
        //  下拉刷新
        if (randomResult === 1) {

          let array = []
          DataSource.forEach((item, index) => {
            array.push(item)
          })
          dispatch({ type: Types.NOTIMESSAGE_REFRESH_SUCCESS, items: array, currentIndex: 1 });
        }else {
          dispatch({ type: Types.NOTIMESSAGE_REFRESH_FAIL, items: dataArray, currentIndex: Math.ceil(dataArray.length/pageSize) });
        }
      }else {
        //  上拉加载
        if (randomResult === 1){
         let newArray = dataArray.concat(DataSource)
          dispatch({ type: Types.NOTIMESSAGE_LOADMORE_SUCCESS, items: newArray,currentIndex:++currentIndex });
        }else {
          dispatch({ type: Types.NOTIMESSAGE_LOADMORE_FAIL, items: dataArray ,currentIndex:currentIndex});
        }
      }
    }, 1000);
  };
}

function getRandom1(start, end) {
  let length = end - start + 1;
  let num = parseInt(Math.random() * (length) + start);
  return num;
}

export default {
  //  导出方法集
  change_page1_text,
  change_page2_text,
  onPopularPageRefresh,
  onNotiMessageLoad,
};


