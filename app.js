// /* app.js */

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const fs = require('fs');

// app.use(cors()); // Prevents CORS error

// app.get('/api', function (req, res) {

//     if (req.url === '/favicon.ico') {
//         res.end();
//     }
//     // Ends request for favicon without counting

//     const json = fs.readFileSync('count.json', 'utf-8');
//     const obj = JSON.parse(json);
//     // Reads count.json and converts to JS object

//     obj.pageviews = obj.pageviews + 1;
//     if (req.query.type === 'visit-pageview') {
//         obj.visits = obj.visits + 1;
//     }
//     // Updates pageviews and visits (conditional upon URL param value)

//     const newJSON = JSON.stringify(obj);
//     // Converts result to JSON

//     fs.writeFileSync('count.json', newJSON);
//     res.send(newJSON);
//     // Writes result to file and sends to user as JSON

// })

// app.listen(3002, () => {
//     console.log("Server running on port 3002");
// })




const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

// Allow CORS for specific frontend domain (Replace with your actual Netlify URL)
app.use(cors({
    origin: 'https://your-netlify-site.netlify.app', // Replace with your Netlify domain
    methods: ['GET'], // Allow only GET requests
}));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Visit Count Backend API!');
    // Or redirect to /api if needed
    // res.redirect('/api');
});

// API route
app.get('/api', (req, res) => {
    if (req.path === '/favicon.ico') {
        return res.status(204).end(); // Handle favicon.ico requests gracefully
    }

    try {
        // Read and parse the JSON file
        const json = fs.readFileSync('count.json', 'utf-8');
        const obj = JSON.parse(json);

        // Increment pageviews and visits based on the query type
        obj.pageviews += 1;
        if (req.query.type === 'visit-pageview') {
            obj.visits += 1;
        }

        // Convert the updated object back to JSON and save
        fs.writeFileSync('count.json', JSON.stringify(obj));

        // Send updated data to the frontend
        res.json(obj);
    } catch (error) {
        console.error('Error handling API request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(3002, () => {
    console.log("Server running on port 3002");
});
