// 获取页面元素
var userChat = document.getElementById("user-chat");
var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

// 定义一个函数，用来发送消息给AI聊天，并接收回复
function sendMessage(message) {
  // 创建一个div元素，用来显示用户的消息
  var userMessage = document.createElement("div");
  // 设置div元素的类名为"user-message"、"chat-message"和"sent-message"
  userMessage.className = "user-message chat-message sent-message";
  // 设置div元素的文本内容为用户的消息
  userMessage.textContent = message;
  // 将div元素添加到userChat元素中
  userChat.appendChild(userMessage);
  // 滚动到userChat元素的底部
  userChat.scrollTop = userChat.scrollHeight;

  // 使用fetch函数，向AI聊天的API发送请求，传递一个配置对象，包括请求方法、URL、请求头、请求体等参数
  fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      // 设置请求头，包括API密钥和内容类型
      Authorization: "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 设置请求体，包括提示文本、最大令牌数、停止符号和模型参数
      prompt: message,
      max_tokens: 1000,
     
      temperature: 0.382,
    }),
  })
    .then(function (response) {
      // 如果请求成功，返回响应的JSON数据
      return response.json();
    })
    .then(function (data) {
      // 如果获取JSON数据成功，从数据中提取AI聊天的回复
      // 检查data对象是否有choices属性，并且choices属性是一个非空数组
      if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
        // 检查choices数组中是否存在满足条件的元素
        var hasValidChoice = data.choices.some(function (choice) {
          return (
            choice.text &&
            typeof choice.text === "string" &&
            choice.text.trim() !== ""
          );
        });

        if (hasValidChoice) {
          // 获取第一个满足条件的元素的回复文本
          var reply = data.choices.find(function (choice) {
            return (
              choice.text &&
              typeof choice.text === "string" &&
              choice.text.trim() !== ""
            );
          }).text;

          // 创建一个div元素，用来显示AI聊天的回复
          var assistantMessage = document.createElement("div");
          // 设置div元素的类名为"assistant-message chat-message done-message"
assistantMessage.className = "assistant-message chat-message done-message";
// 设置div元素的文本内容为AI聊天的回复
assistantMessage.textContent = reply;
// 将div元素添加到userChat元素中
userChat.appendChild(assistantMessage);
// 滚动到userChat元素的底部
userChat.scrollTop = userChat.scrollHeight;
} else {
// 如果没有满足条件的元素，打印错误信息到控制台
console.error("No valid text found in choices");
}
} else {
// 如果data对象没有choices属性或者choices属性不是一个非空数组，打印错误信息到控制台
console.error("No choices found in the data");
}
})
.catch(function (error) {
// 如果发生错误，打印错误信息到控制台
console.error(error);
});
}

// 定义一个函数，用来处理用户点击发送按钮的事件
function handleClick() {
// 获取用户输入的文字
var message = searchInput.value;
// 如果用户输入了文字，调用sendMessage函数，并清空输入框
if (message) {
sendMessage(message);
searchInput.value = "";
}
}

// 定义一个函数，用来处理用户按下回车键的事件
function handleEnter(event) {
// 如果用户按下了回车键，调用handleClick函数
if (event.keyCode === 13) {
handleClick();
}
}

// 给发送按钮添加点击事件监听器，调用handleClick函数
searchButton.addEventListener("click", handleClick);

// 给输入框添加键盘事件监听器，调用handleEnter函数
searchInput.addEventListener("keydown", handleEnter);




