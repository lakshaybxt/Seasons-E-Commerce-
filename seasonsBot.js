import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { API_KEY } from "./config.js";
// import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.0.1/dist/purify.es.min.js"; .sanitize


const chatBody = document.querySelector('.chat-body');
const messageInput = document.querySelector('.message-input');
const sendMessageButton = document.querySelector('#send-message');
const fileInput = document.querySelector('#file-input');
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
const fileCancelButton = document.querySelector('#file-cancel');
const chatbotToggler = document.querySelector('#chatbot-toggler');
const closeChatbot = document.querySelector('#close-chatbot');

//API Setup
// const API_KEY = API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const chatHistory = [{
    role: "model",
    parts:[{text: `You are a helpful support assistant for Seasons® – THE OLD VINTAGE AGE ONLINE SHOPPING EXPERIENCE. This is an eCommerce platform offering timeless fashion and curated collections, inspired by vintage aesthetics and modern style. Help users with product queries, orders, returns, shipping information, and fashion advice. Be friendly, stylish, and knowledgeable.`
    }]
}];
const initialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//Generate bot response using API
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    // Add user response to chatHistory
    chatHistory.push({ 
        role: "user",
        parts:[{ text: `Using the details provided above, please address the query: ${userData.message}` }, ...(userData.file.data ? [{ inline_data: userData.file}] : [])] 
    });

    //API request Options
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    try {
        // Fetch bot response from API
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        // console.log(data);
        // console.log(data.candidates[0].content.parts[0].text.trim());
        //Extact and display bot's response text
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        console.log(apiResponseText);
        messageElement.innerText = apiResponseText;
        // messageElement.innerHTML = marked.parse(apiResponseText);

        // Add bot response to chat history
        chatHistory.push({ 
            role: "model",
            parts:[{ text: apiResponseText }] 
        });
    } catch (error) {
        // Handle error in API Response
        console.log(error);
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    } finally {
        // Reset user's file data, removing thinking indicator and scroll chat to bottom
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" }); //for showing the message when new msg comes
    }
};

// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
    e.preventDefault();

    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));

    // Create and display user message
    // const messageContent = `<div class="message-text">${userData.message}</div>`; 
    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type}; base64, ${userData.file.data}" class="attachment"/>` : "" }`; 

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector('.message-text').textContent = userData.message
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    //Displays Bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `
                <img class="bot-avtar" src="images/seasons-mobile-logo.svg">
				<div class="message-text">
					<div class="thinking-indicator">
						<div class="dot"></div>
						<div class="dot"></div>
						<div class="dot"></div>
					</div>
				</div>`;
                
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();

    if(e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
}); 

// Adjust Input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle file input change and preview the selected file
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(!file) return;

    // console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
        // console.log(fileUploadWrapper);
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        console.log(fileUploadWrapper.classList.contains("file-uploaded"));
        // console.log(e.target.result);
        const base64String = e.target.result.split(",")[1];

        // Store file data in userData
        userData.file = {
            data: base64String,
            mime_type: file.type
        }

        fileInput.value = "";
    }

    reader.readAsDataURL(file);
});

// Cancel file upload
fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});

// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "auto",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: StaticRange, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, StaticRange, end, "end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector('#file-upload').addEventListener("click", () => fileInput.click());

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));