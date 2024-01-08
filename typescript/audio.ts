let elementIds: Record<string, string>;

fetch('../elements.json')
  .then((response) => response.json())
  .then((data: Record<string, string>) => {
    elementIds = data;
    // Set up event delegation for the entire document
    document.addEventListener('mouseover', (event) => {
      handleMouseover(event);
    });
  });

// Function to toggle audio
let audioEnabled: boolean = false;

function toggleAudio(): void {
  audioEnabled = !audioEnabled; // Toggle audio state
}

// Function to handle mouseover event using event delegation
function handleMouseover(event: MouseEvent): void {
  // console.log("qwertyuiop");
  if (audioEnabled && elementIds) {
    // Get the ID from the event target
    const elementId: string = (event.target as HTMLElement).id;
    // console.log(elementIds[elementId])
    // Check if the ID is in the JSON file
    if (elementIds[elementId]) {
      const contentElement: HTMLElement | null = document.getElementById(elementIds[elementId]);
      if (contentElement) {
        const synth: SpeechSynthesis = window.speechSynthesis;
        const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(contentElement.innerText);
        synth.speak(utterance);
      }
    }
  }
}
