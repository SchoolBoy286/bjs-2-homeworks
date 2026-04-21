"use strict"
function solveEquation(a, b, c) {
  let arr = [];
  let d = Math.pow(b, 2) - 4 * a * c;
  let x1;
  let x2;

  if (d > 0) {
    let x1 = (-b + Math.sqrt(d)) / (2 * a);
    let x2 = (-b - Math.sqrt(d)) / (2 * a);
    arr.push(x1, x2);
  } else if (d === 0) {
    let x1 = -b / (2 * a);
    arr.push(x1);
  }

  return arr;
}

console.log(solveEquation());

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  let interestRate = percent / 100 / 12;
  let credit = amount - contribution;

  if (credit <= 0) {
    return 0;
  }

  let monthlyPayment;

  if (interestRate === 0) {
    monthlyPayment = credit / countMonths;
  } else {
    monthlyPayment = credit * (interestRate + (interestRate / (Math.pow(1 + interestRate, countMonths) - 1)));
  }

  let totalPayment = monthlyPayment * countMonths;

  return Math.round(totalPayment * 100) / 100;
}