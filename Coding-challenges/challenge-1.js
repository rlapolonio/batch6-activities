var victorMass = 65; // store Victor's details in variables
var victorHeight = 1.3;
var victorBMI = victorMass / (victorHeight**2); // calc Victor's BMI

var johnMass = 58; // store John's details in variables
var johnHeight = 1.4;
var johnBMI = johnMass / (johnHeight**2); // calc John's BMI

var comparison = victorBMI > johnBMI; // create a boolean variable on BMI comparison

const text = "Is Victor's BMI higher than John's?";

var message = `${text} ${comparison}`;

console.log(message); // display message + results
