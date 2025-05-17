// Load projects on page load
async function loadProjects() {
  try {
    const res = await fetch('https://myportfolio-gwtv.onrender.com/api/services');
    const projects = await res.json();

    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";

    projects.forEach(project => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-item";
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectList.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

window.onload = loadProjects;

// Add new project
document.getElementById("addProjectBtn").addEventListener("click", async function () {
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();

  if (title && description) {
    try {
      const response = await fetch('https://myportfolio-gwtv.onrender.com/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });

      const data = await response.json();
      alert(data.message || "Project added!");

      loadProjects();

      document.getElementById("projectTitle").value = "";
      document.getElementById("projectDescription").value = "";
    } catch (error) {
      console.error("Error adding project:", error);
    }
  } else {
    alert("Please enter both a title and description.");
  }
});

// Handle contact form submission
async function sendMail(e) {
  e.preventDefault();

  const submitBtn = document.querySelector("#contact-form input[type='submit']");
  submitBtn.disabled = true;
  submitBtn.value = "Sending...";

  const name = document.getElementById("uname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("Message").value.trim();

  try {
    // Send email using EmailJS
    await emailjs.sendForm('service_hdvzupq', 'template_h2wmnqg', '#contact-form');
    alert("Your message has been sent!");

  

    // Reset form
    document.getElementById("contact-form").reset();
  } catch (error) {
    console.error("Error during contact form submission:", error);
    alert("Failed to send your message. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.value = "Submit";
  }
}
