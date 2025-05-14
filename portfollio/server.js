const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// GET projects.json
app.get('/projects', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'projects.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Failed to load projects');
    res.json(JSON.parse(data));
  });
});

// POST to add a new project
app.post('/projects', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'projects.json');
  const newProject = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading project file');

    const projects = JSON.parse(data);
    projects.push(newProject);

    fs.writeFile(filePath, JSON.stringify(projects, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving project');
      res.status(200).send('Project added successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
