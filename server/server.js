// path is a build in module
const path = require('path');
const publicPath = path.join(__dirname, '../public')

const express = require('express');

// understand path module
console.log(__dirname + '/../public');
console.log(publicPath);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`started on port: ${port}`)
});

