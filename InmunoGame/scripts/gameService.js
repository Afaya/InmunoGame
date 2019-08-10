const dataFile = require('../data/data.json');
const fs = require('fs');

function GetQuestionPrivate() {
    let questionNumber = Math.floor((Math.random() * 50) + 1);
    let objectJson = JSON.stringify(dataFile);
    let dataObject = JSON.parse(objectJson);
    let currentQuestion = dataObject.data.find(x => x.id == questionNumber);
    return currentQuestion;
}

function PostAnswerPrivate(answerNumber, questionId) {
    let isCorrect = false;
    
    let objectJson = JSON.stringify(dataFile);
    let dataObject = JSON.parse(objectJson);
    let currentQuestion = dataObject.data.find(x => x.id == questionId);

    isCorrect = currentQuestion.correctAnswer == answerNumber;

    writeDataInFile(new Date().toLocaleDateString() + ";" + isCorrect + "\n");

    return {
        "isCorrect": isCorrect,
        "description": currentQuestion.moreInfo
    };
}

function writeDataInFile(textToWrite) {
    fs.appendFile('/home/pi/Desktop/InmunoGame/data/inmunoGameRecord.txt', textToWrite, 'utf8', function (err) {
        if (err) throw err;
    });
}

module.exports = {
    GetQuestion: function () {
        return GetQuestionPrivate();
    },
    PostAnswer: function (answerNumber, questionId) {
        return PostAnswerPrivate(answerNumber, questionId);
    }
}