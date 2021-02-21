var victorMass = 65; // store Victor's details in variables
var victorHeight = 1.4;
var victorBMI = victorMass / (victorHeight**2); // calc Victor's BMI
 
var johnMass = 57; // store John's details in variables
var johnHeight = 1.4;
var johnBMI = johnMass / (johnHeight**2);  // calc John's BMI

var comparison = victorBMI > johnBMI; // create a boolean variable on BMI comparison

result = comparison ? 'YES' : 'NO'; // generate and store a string depending on the variable 'comparison'

var victorDetails = `Victor's Mass: ${victorMass}kg, Victor's Height: ${victorHeight}m`;
var johnDetails = `John's Mass: ${johnMass}kg, John's Height: ${johnHeight}m`;


const text = "Is Victor's BMI higher than John's?";

var message = `${text} ${result}`;


console.log(victorDetails); // display message + initial values
console.log(johnDetails); // display message + initial values
console.log(message); // display message + result
