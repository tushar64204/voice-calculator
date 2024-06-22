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

    // Set the speech recognition language and max results
    speechRecognition.lang = 'en-US';
    speechRecognition.maxResults = 10;

    // Set the speech recognition event listeners
    speechRecognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
    };

    speechRecognition.onend = () => {
      speechRecognition.start();
    };

    speechRecognition.onerror = event => {
      console.error('Speech recognition error:', event.error);
    };

    speechRecognition.onnomatch = event => {
      console.error('Speech recognition no match:', event);
    };

    // Start the speech recognition
    speechRecognition.start();

    // Add an event listener to the speak button
    speakButton.addEventListener('click', () => {
      speechRecognition.start();
    });

    // Add an event listener to the calculate button
    calculateButton.addEventListener('click', () => {
      const input = inputField.value;
      try {
        const result = eval(input);
        resultParagraph.textContent = `Result: ${result}`;
      } catch (error) {
        resultParagraph.textContent = `Error: ${error.message}`;
      }
    });
  })
  .catch(error => {
    console.error('Error accessing microphone:', error);
  });