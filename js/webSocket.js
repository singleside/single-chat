var msg = document.getElementById("message");
var userNum = document.getElementById("userNum");
var send = document.getElementById("sub");
var wsServer = 'ws://127.0.0.1:9502';//调用websocket对象建立连接：//参数：ws/wss(加密)：//ip:port （字符串）
var websocket = new WebSocket(wsServer);
websocket.onopen = function (evt) {//onopen监听连接打开
    // 应该显示远程服务器连接成功
    //msg.innerHTML = websocket.readyState;
    //websocket.readyState 属性：
    /*
     CONNECTING     0    The connection is not yet open.
     OPEN           1    The connection is open and ready to communicate.
     CLOSING        2    The connection is in the process of closing.
     CLOSED         3    The connection is closed or couldn't be opened.
     */
};
//onmessage 监听服务器数据推送
websocket.onmessage = function (evt) {
    var data = JSON.parse( evt.data );
    msg.innerHTML += data.msg +'<br>';//不断递增的数据
    userNum.innerHTML = data.count;//不断递增的数据
    console.log('从服务器获取到的数据: ' + data.msg);
};
//监听连接关闭
websocket.onclose = function (evt) {
    console.log("服务器拒绝");
};
//监听连接错误信息
websocket.onerror = function (evt, e) {
    console.log('错误: ' + evt.data);
};
//发送信息
function send_msg(){
    var input = document.getElementById('input').value;// 获取数据
    document.getElementById('input').value = '';// 清空数据
    websocket.send(input);//向服务器发送数据
}
