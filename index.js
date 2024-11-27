const express = require('express');
const axios = require('axios');
const https = require('https');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 10000; // Use process.env.PORT (default to 10000 if not set)

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Disable SSL verification (only for local dev)
});

app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.get('/services', async (req, res) => {
    try {
        const apiKey = process.env.RENDER_API_KEY; // Replace with your Render API Key
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: { Authorization: `Bearer ${apiKey}` },
            httpsAgent, // Use the custom HTTPS agent
        });
        res.json(response.data);
    } catch (error) {
        console.error(error); // Log detailed error for debugging
        res.status(500).send('Error fetching services: ' + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Ensure you're listening on the dynamic port
