const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'https://chimerical-fairy-b20cb8.netlify.app', // Replace with your Netlify domain
    methods: ['GET'], // Allow only GET requests
}));

// Root route for basic server information
app.get('/', (req, res) => {
    res.send('Visit Count Backend is running!');
});

// API route to handle pageviews and visits
app.get('/api', (req, res) => {
    if (req.path === '/favicon.ico') {
        return res.status(204).end(); // Skip favicon requests
    }

    try {
        // Read the JSON file
        const json = fs.readFileSync('count.json', 'utf-8');
        const obj = JSON.parse(json);

        // Increment pageviews
        obj.pageviews += 1;

        // Increment visits if type=visit-pageview
        if (req.query.type === 'visit-pageview') {
            obj.visits += 1;
        }

        // Write updated data back to the file
        fs.writeFileSync('count.json', JSON.stringify(obj));

        // Send the updated counts as JSON
        res.json(obj);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
