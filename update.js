const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3030;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GitHub webhook endpoint
app.post('/webhook', (req, res) => {
    const { ref, repository, head_commit } = req.body;
  
    if (ref === 'refs/heads/main') {
      // Log repository and commit details
      console.log(`Repository: ${repository.full_name}`);
      console.log(`Branch: ${ref}`);
      console.log(`Commit by: ${head_commit.author.name}`);
      console.log(`Commit message: ${head_commit.message}`);
  
      // Add your deployment logic here
      deploy();
  
      res.status(200).send('Deployment initiated.');
    } else {
      res.status(400).send('Ignoring non-main branch.');
    }
  });
  

// Deployment function
function deploy() {
  // Adjust these commands based on your deployment needs
  exec('cd /var/www/apps/exo-web && git pull && npm install && pm2 start server.js --name "Website" --cwd /var/www/apps/exo-web/', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.log(`Deployment success: ${stdout}`);
    }
  });
}

app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});
