import Types from './types'

function change_page1_text(text){
  // 接受一个文本text，将其交给reducer进行处理
  // 返回一个字典   包括事件类型  和要传递的值
  return {type:Types.Change_Page1_text,text:text}
}

function change_page2_text(text){
  return {type:Types.Change_Page2_text,text:text}
}

export default {
  //  导出方法集
  change_page1_text,
  change_page2_text
}
