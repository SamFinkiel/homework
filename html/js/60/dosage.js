/* eslint-disable no-implicit-globals */
'use strict';

function trackDosage(medicationName, initalDose) {
    let currentDosage = initalDose; 
    const fixedPin = 1234;

    return {
        getInstructions() {
            console.log(`Take ${currentDosage} mg of ${medicationName}`);
            return this;
        },
        adjustDosage(doctorPin, newDosage) {
            if (doctorPin === fixedPin && newDosage > 0) {
                currentDosage = newDosage;
            } else {
                if (doctorPin !== fixedPin) {
                    throw new Error('Invalid PIN');
                }
                if (newDosage <= 0) {
                    throw new Error('Please enter a valid dosage');
                }
            }
            return this;
        }
    };
};

const newMeds = trackDosage('Aspirin', 100);
newMeds.getInstructions();
newMeds.adjustDosage(1234, 40).getInstructions();

newMeds.fixedPin = 1111;
newMeds.adjustDosage(1111, 56).getInstructions();
