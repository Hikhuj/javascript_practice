// vars
const main = document.getElementById('main');
const addUserBtn= document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    // FETCH is asynchronous so we need to wait for it to finish.
    const res = await fetch('https://randomuser.me/api');
    console.log(res);
    // Since it returns a PROMISE we need to make it an AWAIT
    const data = await res.json();
    console.log(data);
    const user = data.results[0];
    console.log(user);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    console.log(newUser);

    // Since we want to add a new object we will create the next function
    addData(newUser);
}

// Double eveyrones money with MAP() and ...spreadOperator
function doubleMoney() {
    // We are taking data, a GLOBAL SCOPE var 
    data = data.map((user) => {
        return {...user, money: user.money * 2};
    });

    updateDOM();
}

// SORT() users by riches ()
function sortByRichest() {
    // We need to remember that we need to take the property that we will use to sort
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//Function only millionaires
function showMillionaires() {
    // We simply take the users and for each user we evaluate each one
    // to check if it is a millionaire
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)
    console.log(`Wealth calculated ${wealth}`);

    // We add the total into the site
    const wealthEl = document.createElement('dive');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
    // Array method PUSH(), 
    // allow to append data at the end of the array (object)
    data.push(obj);
    // We call the function to add elements to table
    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // clear main div
    // to reset the MAIN id completely
    main.innerHTML = '<h2><strong>Person</strong>Wealth </h2>';

    // #1 Function for go through each record
    providedData.forEach(item => {
        const element = document.createElement('div');
        // element.classList => read only property that returns a live DOMTokenList collection of the class attributes of the element
        // can be used to manipulate the class list: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        element.classList.add('person');
        // .innerHTML => serialize 
        // it allows you to append HTML to an element
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        // To save it we need the to append the child element
        main.appendChild(element);
    });
}

// Format number as money - 
// https://stackoverflow.com/questions/149055/hot-to-format-numbers-as-currency-string
function formatMoney(number) {
    // Regular expression to set money type
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

