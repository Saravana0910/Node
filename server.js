const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/run', (req, res) => {
  const cmd = req.body.command;

  if (!cmd || !cmd.startsWith('sfdx')) {
    return res.status(400).send('Only sfdx commands are allowed.');
  }

  exec(cmd, { timeout: 10000 }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`❌ Error:\n${stderr || err.message}`);
    }
    res.send(`✅ Output:\n${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
