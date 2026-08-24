/* eslint-disable no-implicit-globals */
'use strict';

function mulitply(x, y) {
    console.log(x * y);
    
}

mulitply(5, 5);
mulitply(10, 10);

///

function getMultiplier() {
    return function (x, y) {
        const result = x * y;
        return result;
    };
}

const mathExample = getMultiplier();
console.log(mathExample(20, 20));

///

function theBetterMulitplier(y) {
    return function (x) {
        return x * y;
    };
}

const mulitplyByFive = theBetterMulitplier(5);
console.log(mulitplyByFive(2));

const multiplyBySix = theBetterMulitplier(6);
console.log(multiplyBySix(2));

///

const mixedLetters = ['a', 'B', 'c']; // false
const lowerLetters = ['a', 'b', 'c']; // false
const upperLetters = ['A', 'B', 'C']; // true

function myEvery (array, callback) {
    for (let i = 0; i < array.length; i++) {
        
        if (!callback(array[i])) {
            return false;
        };
        return true;
    };
}

function isUpperCase(x) {
    if (x === x.toUpperCase()) {
        return true;
    }
}

console.log(myEvery(mixedLetters, isUpperCase));
console.log(myEvery(lowerLetters, isUpperCase));
console.log(myEvery(upperLetters, isUpperCase));

console.log(mixedLetters.every(isUpperCase));
console.log(lowerLetters.every(isUpperCase));
console.log(upperLetters.every(isUpperCase));

///

const mixedLetters2 = ['a', 'B', 'c'];; // true
const lowerLetters2 = ['a', 'b', 'c']; // true
const upperLetters2 = ['A', 'B', 'C']; // false

function mySome(array, callback) {
    for (let i = 0; i < array.length; i++) {

        if (callback(array[i])) {
            return true;
        } 
        
    }
    return false;
}

function anyLowercase(x) {
    if (x === x.toLowerCase()) {
        return true; 
    }
}

console.log(mySome(mixedLetters2, anyLowercase));
console.log(mySome(lowerLetters2, anyLowercase));
console.log(mySome(upperLetters2, anyLowercase));

console.log(mixedLetters2.some(anyLowercase));
console.log(lowerLetters2.some(anyLowercase));
console.log(upperLetters2.some(anyLowercase));