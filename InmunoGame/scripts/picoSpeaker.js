const picoSpeaker = require('pico-speaker');

// Define configuration
var picoConfig = {
    LANGUAGE: 'es-ES'
};
  
// Initialize with config
picoSpeaker.init(picoConfig);

module.exports = {
  speakText: function (textToSpeak) {
    picoSpeaker.speak(textToSpeak).then(function() {
    }.bind(this));
  }
}