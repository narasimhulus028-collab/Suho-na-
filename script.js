
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

let messageCount = parseInt(localStorage.getItem("messageCount")) || 0;

button.onclick = async () => {
  const message = input.value.trim();
  if (!message) return;

  if (messageCount >= 20) {
    alert(
`💎 Free limit reached!

You used your 20 free messages.

Premium ₹89/month

✅ Unlimited Chat
✅ AI Photos
✅ Voice Chat
✅ Voice Calls

Or refer 1 friend to get 1 day Premium.`
    );
    return;
  }

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  chat.innerHTML += `<p><b>Suho-na:</b> ${data.reply}</p>`;

  messageCount++;
  localStorage.setItem("messageCount", messageCount);
};
document.getElementById("subscribeBtn").onclick = () => {
  window.location.href = "https://rzp.io/l/YOUR_PAYMENT_LINK";
};

document.getElementById("referBtn").onclick = () => {
  alert("Referral system coming soon!");
};

document.getElementById("closePopup").onclick = () => {
  document.getElementById("premiumPopup").style.display = "none";
};
