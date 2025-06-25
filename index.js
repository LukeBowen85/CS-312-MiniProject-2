import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', { joke: null, error: null });
});

app.get('/joke/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}`);
        const data = response.data;

        let jokeText;
        if (data.type === 'single') {
            jokeText = data.joke;
        } else {
            jokeText = `${data.setup} ... ${data.delivery}`;
        }

        res.render('index.ejs', { joke: jokeText, error: null });
    } catch (error) {
        console.log('Error fetching joke:', error);
        res.render('index.ejs', { joke: null, error: 'Failed to fetch joke. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});