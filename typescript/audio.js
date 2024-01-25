var elementIds;
fetch('../elements.json')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    elementIds = data;
    // Set up event delegation for the entire document
    document.addEventListener('mouseover', function (event) {
        handleMouseover(event);
    });
});
// Function to toggle audio
var audioEnabled = false;
function toggleAudio() {
    audioEnabled = !audioEnabled; // Toggle audio state
}
// Function to handle mouseover event using event delegation
function handleMouseover(event) {
    // console.log("qwertyuiop");
    if (audioEnabled && elementIds) {
        // Get the ID from the event target
        var elementId = event.target.id;
        // console.log(elementIds[elementId])
        // Check if the ID is in the JSON file
        if (elementIds[elementId]) {
            var contentElement = document.getElementById(elementIds[elementId]);
            if (contentElement) {
                var synth = window.speechSynthesis;
                var utterance = new SpeechSynthesisUtterance(contentElement.innerText);
                synth.speak(utterance);
            }
        }
    }
}
