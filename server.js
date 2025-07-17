const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

app.post('/run', (req, res) => {
    const command = req.body.command;

    console.log('Running command:', command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.send(`<pre>Error: ${error.message}</pre>`);
        }
        if (stderr) {
            return res.send(`<pre>Stderr: ${stderr}</pre>`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
