const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  appendMessage("user", userMessage);
  input.value = "";

  fetch("https://0100-112-166-0-39.ngrok-free.app/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: "user123",
      message: userMessage
    })
  })
    .then(res => res.json())
    .then(data => {
      const reply = data[0]?.text || "챗봇 응답 없음";
      appendMessage("bot", reply);
      chatBody.scrollTop = chatBody.scrollHeight;
    })
    .catch(() => {
      appendMessage("bot", "서버 연결 실패 😢");
    });
});

function appendMessage(type, text) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
}
