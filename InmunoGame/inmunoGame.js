const Gpio = require('onoff').Gpio;
// const tempHumSensor = require('node-dht-sensor');
const picoSpeakerService = require('../InmunoGame/scripts/picoSpeaker');
const gameService = require('../InmunoGame/scripts/gameService');
const fs = require('fs')

// variables
var currentQuestion;
var isAnswerSelected;
var isAnsweredFinished = true;

// Led
var turnOnLed = new Gpio(18, 'out');
var falseAnswerLed = new Gpio(20, 'out');
var trueAnswerLed = new Gpio(21, 'out');

// Humidity and Temperature sensor
// const sensorDHTType = 11;
// const sensorDHTGpio = 16;

// Buttons
var questionButton = new Gpio(26, 'in', 'both');
var answerAButton = new Gpio(19, 'in', 'both');
var answerBButton = new Gpio(13, 'in', 'both');
var answerCButton = new Gpio(06, 'in', 'both');

// actions
turnOnLed.writeSync(1);

questionButton.watch(function (error, value) {
    if (error) {
        console.log('error' + error);
        return;
    }

    if (value === 1) { // pulsado
        console.log('siguiente pregunta pulsado');
        if (isAnsweredFinished) {
            isAnsweredFinished = false;
            trueAnswerLed.writeSync(0);
            falseAnswerLed.writeSync(0);
            isAnswerSelected = false;

            console.log('formular siguiente pregunta');
            currentQuestion = gameService.GetQuestion();

            var questionAndOptions = currentQuestion.question + " Posibles respuestas" + " Opción A: " + currentQuestion.answer0 + " Opción B: " + currentQuestion.answer1 + " Opción C: " + currentQuestion.answer2;

            
            picoSpeakerService.speakText(questionAndOptions);
        }
    } else {
        console.log('siguiente pregunta no pulsado');
    }
});

answerAButton.watch(function (error, value) {
    if (error) {
        return;
    }

    if (value === 1) { // pulsado
        console.log('pulsada opcion 1');
        verifySelectedAnswer(0);
    } else {
    }
});

answerBButton.watch(function (error, value) {
    if (error) {
        return;
    }

    if (value === 1) { // pulsado
        console.log('pulsada opcion 2');
        verifySelectedAnswer(1);
    } else {
    }
});

answerCButton.watch(function (error, value) {
    if (error) {
        return;
    }

    if (value === 1) { // pulsado
        console.log('pulsada opcion 3');
        verifySelectedAnswer(2); 
    } else {
    }
});

// function readDataOfSensorDHT() {
//     tempHumSensor.read(sensorDHTType, sensorDHTGpio, function (error, temp, hum) {
//         if (!error) {
//             console.log('temp: ' + temp.toFixed(1) + 'ºC');
//             console.log('hum: ' + hum.toFixed(1) + '%');
//         }
//     });
// }

function verifySelectedAnswer(answer) {
    if (!isAnswerSelected) {
	var textResult = '';
        console.log('verificando respuesta');
        isAnsweredFinished = false;
        isAnswerSelected = true;

        var response = gameService.PostAnswer(answer, currentQuestion.id);

        if (response.isCorrect) {
            trueAnswerLed.writeSync(1);
textResult = 'Respuesta correcta. Explicacion ';
        } else {
            falseAnswerLed.writeSync(1);
textResult = 'Respuesta incorrecta. Explicacion ';
        }

	picoSpeakerService.speakText(textResult + currentQuestion.moreInfo);
        
        isAnsweredFinished = true;
    }                        
}
