"use strict";
function calculateExercises(dailyHours, target) {
    var periodLength = dailyHours.length;
    var trainingDays = dailyHours.filter(function (day) { return day > 0; }).length;
    var average = dailyHours.reduce(function (a, b) { return a + b; }, 0) / periodLength;
    var success = average >= target;
    var rating = 1;
    var ratingDescription = 'bad';
    if (average >= target) {
        rating = 3;
        ratingDescription = 'good';
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
}
var target = Number(process.argv[2]);
var dailyHours = process.argv.slice(3).map(Number);
if (!target || dailyHours.some(isNaN)) {
    console.log('Please provide valid target and daily hours');
}
else {
    console.log(calculateExercises(dailyHours, target));
}
