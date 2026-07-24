const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("message");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const text = input.value.trim();

    if (text === "") return;

    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    input.value = "";

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot";
        botMsg.textContent = "❤️ I'm still learning. Soon I'll become your complete AI girlfriend!";
        chatBox.appendChild(botMsg);

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);

    chatBox.scrollTop = chatBox.scrollHeight;
}
