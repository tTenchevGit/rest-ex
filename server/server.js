const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');


app.use(cors());
app.use(express.json());
const itemsFilePath = path.join(__dirname, 'items.json');
let items = [];

fs.readFile(itemsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('An error occurred:', err);
        return;
    }
    try {
        items = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing items.json file:', parseErr);
    }
});



// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});


app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,  // Automatically assign an ID
        name: req.body.name
    };
    items.push(newItem);

    // Save the updated items array back to the JSON file
    fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
            console.error('Error writing to items.json file:', err);
            return res.status(500).json({ error: 'Failed to save the item.' });
        }
        res.status(201).json(newItem);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



