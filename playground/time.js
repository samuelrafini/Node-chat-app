let moment = require('moment');

// let date = new Date();

// console.log(date.getMonth());
let date = moment();
date.add(1, 'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY'));

let time = moment();
console.log(time.format('h:mm a'));


