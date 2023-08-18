// 获取文本输入框、发送按钮和聊天框的元素对象
var input = document.getElementById("message-input");  
var button = document.getElementById("send-button");
var chatBox = document.getElementById("chat-box");

// 给发送按钮添加一个点击事件监听器
button.addEventListener("click", function () {  
  // 获取输入框的值
  var message = input.value;  
  // 创建一个新的div元素
  var newDiv = document.createElement("div");  
  // 把输入框的值作为文本节点添加到div里
  var newText = document.createTextNode(message);  
  newDiv.appendChild(newText);  
  // 给新的div元素添加一些样式
  newDiv.className = "chat-message user-message sent-message";  
  // 把新的div元素添加到消息呈现框里
  chatBox.appendChild(newDiv);  
  // 清空输入框的值
  input.value = "";
});