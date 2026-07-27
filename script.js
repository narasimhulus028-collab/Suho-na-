
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

const popup = document.getElementById("premiumPopup");
const closePopup = document.getElementById("closePopup");
const subscribeBtn = document.getElementById("subscribeBtn");
const referBtn = document.getElementById("referBtn");

let messageCount = parseInt(localStorage.getItem("messageCount")) || 0;

// Load old chat
chat.innerHTML = localStorage.getItem("chatHistory") || "";

function saveChat() {
  localStorage.setItem("chatHistory", chat.innerHTML);
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  if (messageCount >= 20) {
    popup.style.display = "flex";
    return;
  }

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  saveChat();

  input.value = "";
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

    chat.innerHTML += `<p><b>Suho-na:</b> ${data.reply}</p>`;
    saveChat();

    chat.scrollTop = chat.scrollHeight;

    messageCount++;
    localStorage.setItem("messageCount", messageCount);

  } catch (err) {
    chat.innerHTML += `<p><b>Suho-na:</b> ⚠️ Server Error</p>`;
    saveChat();
  }
}

button.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
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
  alert("🎁 Referral feature coming soon.");
};
