const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/services', async (req, res) => {
    try {
        const apiKey = 'rnd_zsPHuBIyR8uzqkx2tczzEo0jYnIC'; // Replace with your Render API Key
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: { Authorization: `Bearer ${apiKey}` },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching services: ' + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
