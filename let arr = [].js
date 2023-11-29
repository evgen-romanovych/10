const readlineSync = require('readline-sync');

const products = {
    1: { name: 'Dragon Slayer', cost: 6700 },
    2: { name: 'Belt "Berserk"', cost: 7500 },
    3: { name: 'Belt "Griffit"', cost: 7500 },
};

const user = {
    name: '',
    address: '',
    order: [],
};

function getUserData() {
    user.name = readlineSync.question('Your name: ');
    user.address = readlineSync.question('Your address: ');
}

function displayProducts() {
    console.log('Available products:');
    for (const key in products) {
        console.log(`${key}. ${products[key].name} - ${products[key].cost} UAH`);
    }
}

function placeOrder() {
    let isValidNumber = false;
    do {
        const selectedProduct = readlineSync.questionInt('Select the product by number: ');
        if (products[selectedProduct]) {
            user.order.push(products[selectedProduct]);
            console.log(`Order added: ${products[selectedProduct].name}`);
            isValidNumber = true;
        } else {
            console.log('Incorrect product number.');
        }
    } while (!isValidNumber);
}

function main() {
    console.log('Welcome to Gymbeer!');
    getUserData();
    displayProducts();

    let continueOrdering = true;
    while (continueOrdering) {
        placeOrder();
        continueOrdering = readlineSync.keyInYNStrict('Want to order more?');
    }

    
    console.log('\nOrder information:');
    console.log(`Client: ${user.name}`);
    console.log(`Address: ${user.address}`);
    console.log('Ordered products:');
    user.order.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.cost} UAH`);
    });
    const totalCost = user.order.reduce((sum, item) => sum + item.cost, 0);
    console.log(`Total cost: ${totalCost} UAH`);
}