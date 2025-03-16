const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthreading = require("./models/healthReading");
const dotenv = require('dotenv');
const app = express();
//const fetch = require('node-fetch');

app.use(cors());
app.use(express.json());

dotenv.config() 

mongoose.connect("mongodb://localhost:27017/healthData");


mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});


app.post("/addData", (req, res) => {
    healthreading.create({
        heartrate: req.body.heartrate,
        bloodpressure: req.body.bloodpressure,
        oxygensaturation: req.body.oxygensaturation,
        sleepquality: req.body.sleepquality,
        steps: req.body.steps,
        metabolism: req.body.metabolism,
        stresslevel: req.body.stresslevel,
        focus: req.body.focus,
        mindfulness: req.body.mindfulness, 
        vatta: req.body.vatta,
        pitta: req.body.pitta,
        kapha: req.body.kapha
    })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});


app.get("/getHealthData/:id", (req, res) => {
    healthreading.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Data not found" });
            }
            res.json(data);
        })
        .catch((err) => res.status(500).json({ error: "Error fetching data" }));
});

app.get("/getLatestHealthData", async (req, res) => {
    try {
        const latestData = await healthreading.findOne().sort({ _id: -1 }).limit(1) 
        if (!latestData) {
            return res.status(404).json({ error: "No health data found" })
        }
        res.json(latestData)
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" })
    }
})

app.post('/chat', async (req, res) => {
    const { prompt } = req.body

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an Ayurvedic health assistant." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 500,
                temperature: 0.7,
            })
        })

        const result = await response.json()

        if (result?.choices && result.choices.length > 0) {
            res.json({ response: result.choices[0].message.content.trim() })
        } else if (result.error) {
            console.error('OpenAI API Error:', result.error)
            res.status(500).json({ error: result.error.message || 'Unknown OpenAI API error' })
        } else {
            console.error('Unexpected API Response:', result)
            res.status(500).json({ error: 'Unexpected response from OpenAI API.' })
        }

    } catch (error) {
        console.error('Error communicating with OpenAI:', error)
        res.status(500).json({ error: 'Failed to fetch response from OpenAI.' })
    }
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
