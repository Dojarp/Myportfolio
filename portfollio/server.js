const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
require('dotenv').config(); // Make sure this is at the top

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema and Model
const projectSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Project = mongoose.model('Project', projectSchema);

// Routes
app.get('/api/services', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/services', async (req, res) => {
  const { title, description } = req.body;
  const newProject = new Project({ title, description });
  await newProject.save();
  res.json({ message: 'Project added successfully!' });
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// CONTACTS!!!

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/api/contacts', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newContact = new Contact({ name, email, phone, message });
  await newContact.save();
});
