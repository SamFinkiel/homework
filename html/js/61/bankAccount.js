/* eslint-disable no-implicit-globals */
// function adjustBalance(amount) {
//     this.balance = this.balance + amount;
// }
// function getAccount() {
//     console.log(`${this.accountName} - $${this.balance}`);
    
// }

// function createBankAccount(accountName, balance) {
//     return {
//         accountName,
//         balance,
//         adjustBalance: adjustBalance,
//         print: getAccount
//     };
// }

// const checkingAccount = createBankAccount('checking', 50);
// checkingAccount.print();
// checkingAccount.adjustBalance(-50);
// checkingAccount.print();

///////

const checkingAccount = {
    accountName: 'Checking',
    balance: 0,
    performTransaction(amount) {
        this.balance += amount;
    },
    print() {
        console.log(`${this.accountName} - Balance $${this.balance}`);
    }
};

const savingAccount = {
    accountName: 'Saving',
    balance: 0,
    performTransaction(amount) {
        this.balance += amount;
    },
    print() {
        console.log(`${this.accountName} - Balance $${this.balance}`);
    }
};

checkingAccount.print();
checkingAccount.performTransaction(50);
checkingAccount.print();
checkingAccount.performTransaction(-25);
checkingAccount.print();

savingAccount.print();
savingAccount.performTransaction(50);
savingAccount.print();
savingAccount.performTransaction(-25);
savingAccount.print();

//////

function transaction(amount) {
        this.balance += amount;
};
function printBalance() {
    console.log(`${this.accountName} - Balance $${this.balance}`);
};

const checkingAccount2 = {
    accountName: 'Checking',
    balance: 0
};

const savingAccount2 = {
    accountName: 'Saving',
    balance: 0
};

transaction.call(checkingAccount2, 50000);
printBalance.call(checkingAccount2);
transaction.call(checkingAccount2, -50);
printBalance.call(checkingAccount2);

transaction.call(savingAccount2, 40000);
printBalance.call(savingAccount2);
transaction.call(savingAccount2, -500);
printBalance.call(savingAccount2);

///////

const depositFiftyInSaving2 = transaction.bind(savingAccount2, 50);
depositFiftyInSaving2(); // 39550
printBalance.call(savingAccount2);
depositFiftyInSaving2(); // 39600
printBalance.call(savingAccount2);
