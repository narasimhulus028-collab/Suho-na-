const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const popup = document.getElementById("premiumPopup");
const closePopup = document.getElementById("closePopup");
const subscribeBtn = document.getElementById("subscribeBtn");

let messageCount = Number(localStorage.getItem("messageCount")) || 0;

chat.innerHTML = localStorage.getItem("chatHistory") || "";

function saveChat() {
  localStorage.setItem("chatHistory", chat.innerHTML);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  if (messageCount >= 20) {
    popup.style.display = "flex";
    return;
  }

  chat.innerHTML += `
    <div class="message user">${message}</div>
  `;

  input.value = "";
  saveChat();

  chat.innerHTML += `
    <div class="message bot" id="typing">💖 Suho-na is typing...</div>
  `;

  saveChat();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    document.getElementById("typing").remove();

    chat.innerHTML += `
      <div class="message bot">${data.reply}</div>
    `;

    messageCount++;
    localStorage.setItem("messageCount", messageCount);

    saveChat();

  } catch (e) {

    const typing = document.getElementById("typing");
    if (typing) typing.remove();

    chat.innerHTML += `
      <div class="message bot">⚠️ Server Error</div>
    `;

    saveChat();
  }
}

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

closePopup.onclick = () => {
  popup.style.display = "none";
};

subscribeBtn.onclick = () => {
  alert("Premium Coming Soon!");
};
