const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS (allow all origins — customize for production)
app.use(cors());
app.use(express.json());

// Serve static files (if any) from public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB connection with custom DB name "testt"
const MONGO_URI = "mongodb+srv://blinknub321:prajod@cluster0.mongodb.net/testt?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas (DB: testt)'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// === Project Schema & Routes ===
const projectSchema = new mongoose.Schema({
  title: String,
  description: String
});
const Project = mongoose.model('Project', projectSchema);

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

// === Contact Schema & Routes ===
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
  res.json({ message: 'Contact saved successfully!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
