const express = require('express');
const axios = require('axios');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Create an HTTPS agent that skips SSL certificate validation
const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // This disables SSL validation
});

app.get('/services', async (req, res) => {
    try {
        const apiKey = 'rnd_zsPHuBIyR8uzqkx2tczzEo0jYnIC'; // Replace with your Render API Key
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
