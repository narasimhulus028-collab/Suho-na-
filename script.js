const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

const popup = document.getElementById("premiumPopup");
const closePopup = document.getElementById("closePopup");
const subscribeBtn = document.getElementById("subscribeBtn");
const referBtn = document.getElementById("referBtn");

let messageCount = parseInt(localStorage.getItem("messageCount")) || 0;

// Load chat history
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
    <p><b>🧑 You:</b> ${message}</p>
  `;

  saveChat();

  input.value = "";

  chat.innerHTML += `
    <p id="typing"><b>💖 Suho-na:</b> Typing...</p>
  `;

  chat.scrollTop = chat.scrollHeight;

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
      <p><b>💖 Suho-na:</b> ${data.reply}</p>
    `;

    messageCount++;

    localStorage.setItem("messageCount", messageCount);

    saveChat();

  } catch (err) {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

    chat.innerHTML += `
      <p><b>💖 Suho-na:</b> ⚠️ Server Error</p>
    `;

    saveChat();

  }
}

button.onclick = sendMessage;

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

closePopup.onclick = () => {
  popup.style.display = "none";
};

subscribeBtn.onclick = () => {
  window.location.href = "https://rzp.io/l/YOUR_PAYMENT_LINK";
};

referBtn.onclick = () => {
  alert("🎁 Referral System Coming Soon");
};
