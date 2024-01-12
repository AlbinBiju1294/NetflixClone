var chatflixResponses;
var keywords;

// Fetch both responses.json and keywords.json
Promise.all([
    fetch('responses.json').then(response => response.json()),
    fetch('keywords.json').then(response => response.json())
])
    .then(data => {
        chatflixResponses = data[0];
        keywords = data[1].categories; // Access the 'categories' array in the keywords.json
        initializeChatbot();
    })
    .catch(error => console.error('Error loading JSON files:', error));

function initializeChatbot() {
    displayBotResponse("Hi, I'm Ted, your Chatbot. How can I assist you today?");
}

function getRandomResponse(category) {
    var responses = chatflixResponses[category] || [];
    var randomResponse = responses.length > 0 ? responses[Math.floor(Math.random() * responses.length)] : 'I didn\'t catch that. Can you please rephrase your message?';

    return randomResponse;
}

function displayBotResponse(message) {
    var responseContainer = document.querySelector(".conversation-container");
    if (!responseContainer) {
        console.error("Error: response-container not found.");
        return;
    }
    var responseMessage = `
          <div class="message sent">
          ${message}
          <span class="metadata">
              <span class="time"></span><span class="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
          </span>
          </div>`
    responseContainer.insertAdjacentHTML('beforeend', responseMessage)
    responseContainer.scrollTop = responseContainer.scrollHeight;
}

function displayUserMessage(message) {
    var responseContainer = document.querySelector(".conversation-container");
    let userMessage=`<div class="message received">
    ${message}
    <span class="metadata"><span class="time"></span></span>
    </div>`
    responseContainer.insertAdjacentHTML('beforeend', userMessage);
    responseContainer.scrollTop = responseContainer.scrollHeight;
}

function processUserInput(event) {
    console.log("hello");
    event.preventDefault();
    var userInput = document.querySelector(".input-msg").value.trim().toLowerCase();


    if (userInput !== "") {


        // Display user message
        displayUserMessage(userInput);

        var matchFound = false;

        keywords.forEach(categoryObject => {


            if (categoryObject.keywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(userInput))) {
                console.log(`Match found for category: ${categoryObject.categoryName}`);

                var response = getRandomResponse(categoryObject.categoryName);
                if (response) {
                    displayBotResponse(response);
                } else {
                    console.log('No responses found for category:', categoryObject.categoryName);
                }

                matchFound = true;
            }
        });

        if (!matchFound) {

            displayBotResponse(getRandomResponse('NotUnderstand'));
        }

        document.querySelector(".input-msg").value = "";
    }
}

function scrollToBottom() {
    var chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// let sendButton = document.querySelector(".circle");
// sendButton.addEventListener("click", processUserInput);

// var userInputField = document.querySelector(".input-msg");
// userInputField.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         processUserInput();
//         scrollToBottom();
//     }
// });
