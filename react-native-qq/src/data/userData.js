/**
 * Created by caoLiXin on 2017/9/25.
 */
let date = new Date();
let hour = date.getHours() < 10 ? `0${date.getHours()}` :  date.getHours().toString();
let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` :  date.getMinutes().toString();
let time = `${hour}:${minute}`;
export default {
  "chatList": [{
    "name": "Name0",
    "chatContent": "这里是信息内容0...",
    "time": time
  },{
    "name": "Name1",
    "chatContent": "这里是信息内容1...",
    "time": time
  }, {
    "name": "Name2",
    "chatContent": "这里是信息内容2...",
    "time": time
  }, {
    "name": "Name3",
    "chatContent": "这里是信息内容3...",
    "time": time
  }, {
    "name": "Name4",
    "chatContent": "这里是信息内容4...",
    "time": time
  }, {
    "name": "Name5",
    "chatContent": "这里是信息内容5...",
    "time": time
  }, {
    "name": "Name6",
    "chatContent": "这里是信息内容6...",
    "time": time
  }, {
    "name": "Name7",
    "chatContent": "这里是信息内容7...",
    "time": time
  }, {
    "name": "Name8",
    "chatContent": "这里是信息内容8...",
    "time": time
  }, {
    "name": "Name9",
    "chatContent": "这里是信息内容9...",
    "time": time
  }, {
    "name": "Name10",
    "chatContent": "这里是信息内容10...",
    "time": time
  }, {
    "name": "Name11",
    "chatContent": "这里是信息内容11...",
    "time": time
  }, {
    "name": "Name12",
    "chatContent": "这里是信息内容12...",
    "time": time
  }]
}