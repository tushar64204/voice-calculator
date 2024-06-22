// Get the input field, speak button, calculate button, and result paragraph
const inputField = document.getElementById('input-field');
const speakButton = document.getElementById('speak-button');
const calculateButton = document.getElementById('calculate-button');
const resultParagraph = document.getElementById('result');

// Request permission to access the microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // Create the speech recognition object
    const speechRecognition = new webkitSpeechRecognition();

    // Set the speech recognition language
    speechRecognition.lang = 'en-US';

    // Set the speech recognition event listeners
    speechRecognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
    };

    // Add an event listener to the speak button
    speakButton.addEventListener('click', () => {
      speechRecognition.start();
    });

    // Add an event listener to the calculate button
    calculateButton.addEventListener('click', () => {
      const input = inputField.value;
      try {
        // Sanitize the input to allow only numbers and basic operators
        if (/^[0-9+\-*/().\s]+$/.test(input)) {
          const result = eval(input);
          resultParagraph.textContent = `Result: ${result}`;
        } else {
          throw new Error('Invalid input');
        }
      } catch (error) {
        resultParagraph.textContent = `Error: ${error.message}`;
      }
    });
  })
  .catch(error => {
    console.error('Error accessing microphone:', error);
  });
