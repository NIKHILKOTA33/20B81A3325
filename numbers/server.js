const express = require('express');
const axios = require('axios');

const app = express();


app.get('/numbers', async (req, res) => {
    const urlsList = req.query.url || '';
    const urls = Array.isArray(urlsList) ? urlsList : [urlsList];
    const unique = new Set();

    const Fetch = async (url) => {
        try {
            const resp = await axios.get(url);
            const data = resp.data;
            const numbers = data.numbers || [];
            numbers.forEach(num => unique.add(num));
        } catch (error) {
            console.log("eroor 404");
        }
    };

    await Promise.all(urls.map(Fetch));

    const sortnum = Array.from(unique).sort((a, b) => a - b);
    res.json({ numbers: sortnum });
});

app.listen(8008, () => {
    console.log(`Server at port 8008`);
});
