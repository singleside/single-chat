<?php
// 服务器代码
// 创建websocket服务器

$ws = new swoole_websocket_server("0.0.0.0",9502);

// on函数 open message close
// open情况
$ws->on('open',function($ws,$request){
	echo "新用户".$request->fd."加入。\n";
	$GLOBALS['fd'][$request->fd]['id'] = $request->fd;//存入设置用户ID
});

// message
$ws->on('message',function($ws,$request){
	$msg = $request->data."\n";
	// 发送给每个客户端
	$count = count($GLOBALS['fd']);
	foreach($GLOBALS['fd'] as $i){
		$ws->push($i['id'],json_encode(array('msg'=>$msg,'count'=>$count)));
		echo $msg;
	}
});

// close
$ws->on('close',function($ws,$request){
	echo "客户端-{$request} 断开连接\n";
	unset($GLOBALS['fd'][$request]);//清除断开的客户端数据
});

$ws->start();

//test
