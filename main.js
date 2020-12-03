// load libraries
const express = require('express');
const morgan = require('morgan');
const fortuneCookie = require('fortune-cookie');
const cors = require('cors');

// configuration
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

const cookies = () => fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)];

// create an instance of express
const app = express();

// use morgan to log all requests with the 'combined' format
app.use(morgan('combined'));

// resources
// GET /api/cookie -> application/json { cookie: 'cookie text' }
// GET /api/cookie?count=4 -> application/json [ { cookie: 'cookie text' }, ... ]
app.get('/api/cookie', cors(), (req, res) => {
    const results = [];
    const count = parseInt(req.query['count']) || 1;

    if(count > 1) {
        for(let i = 0; i < count; i++) {
            results.push({ cookie: cookies() });
        }
    } else {
        results.push({ cookie: cookies() });
    }

    res.status(200);
    res.type('application/json');
    res.json(results);
});

// serve frontend
app.use(express.static(__dirname + '/frontend'));

// start server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});