const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const typingIndicator = document.getElementById("typing-indicator");

// Add a message to the chat box
function addMessage(content, sender = "user") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

  const timestamp = document.createElement("span");
  timestamp.classList.add("timestamp");
  timestamp.textContent = getCurrentTime();

  messageDiv.textContent = content;
  messageDiv.appendChild(timestamp);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Get current time formatted as HH:MM AM/PM
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Simulate bot thinking and response
function simulateBotReply(userMessage) {
  typingIndicator.style.display = "block";

  setTimeout(() => {
    typingIndicator.style.display = "none";
    const reply = generateBotResponse(userMessage);
    addMessage("Bot: " + reply, "bot");
  }, 1200 + Math.random() * 1000); // random typing delay
}

// Generate more realistic responses
function generateBotResponse(msg) {
  msg = msg.toLowerCase();

  const hour = new Date().getHours();
  const greetings = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";

  if (msg.includes("hello") || msg.includes("hi")) return `${greetings} How can I help you today?`;
  if (msg.includes("how are you")) return "I'm doing great, thanks for asking. What about you?";
  if (msg.includes("your name")) return "I'm ChatBuddy, your virtual assistant. 😊";
  if (msg.includes("bye")) return "Goodbye! Take care and have a great day!";
  if (msg.includes("thank")) return "You're most welcome!";
  if (msg.includes("time")) return `It's currently ${getCurrentTime()}.`;
  if (msg.includes("weather")) return "I'm not connected to weather data yet, but I'd guess it's sunny ☀️";

  const smallTalk = [
    "That's interesting! Tell me more.",
    "Really? I didn't know that.",
    "Wow, sounds cool!",
    "Haha, that's funny 😄",
    "Hmm, makes sense.",
    "I'm listening...",
    "Could you explain that a bit more?",
  ];

  return smallTalk[Math.floor(Math.random() * smallTalk.length)];
}

// Handle form submission
chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMsg = messageInput.value.trim();
  if (userMsg) {
    addMessage("You: " + userMsg, "user");
    messageInput.value = "";
    simulateBotReply(userMsg);
  }
});
