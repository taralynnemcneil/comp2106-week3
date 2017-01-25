// link to...
let connect = require('connect');
let url = require ('url');
let accounting = require('accounting');

// create a new connect object
let app = connect();

// hello "page"
let hello = function(request, response, next) {
    response.end('Hello and welcome to Port 3000');
};

// goodbye "page"
let goodbye = function(request, response, next) {
    response.end('Goodbye! See you soon.');
};

// index "page"
let index = function(request, response, next) {
    response.end('This is the homepage.');
};

// 404 "page"
let notFound = function(request, response, next) {
    response.writeHead(404);
    response.end('Page Not Found!!!');
};

// json api
let api = function(request, response, next) {
    let person = JSON.stringify ({
        "name": "Jamie",
        "age": 35,
        "nationality": "Canadian"
    });

    response.writeHead(200, { "Content-Type": "application-"})
    response.end(person);
};

// tax calculator "page"
let tax = function(request, response, next) {

    // get the full query string ?amount=1000
    let qs = url.parse(request.url, true).query;

    // get the amount value from the query string
    let amount = qs.amount;

    // calculate tax and total
    let hst = amount * .13;
    let total = parseFloat(hst) + parseFloat(amount);

    // display all

    response.end('<h1>Tax Calculator</h1>' +

    'Amount: ' + accounting.formatMoney(amount) + '<br />' +
    'HST: ' + accounting.formatMoney(hst) + '<br />' +
    'Total: ' + accounting.formatMoney(total)
    
    );
};

// map the url's to the correct virtual pages
app.use('/hello', hello);
app.use('/goodbye', goodbye);
app.use('/api', api);
app.use('/tax', tax);
app.use('/', index);


// start the connect http server
app.listen(3000)
console.log('Connect server running on port 3000');

