async function loadProjects() {
  const res = await fetch('http://localhost:5000/api/services');
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
}

window.onload = loadProjects;

document.getElementById("addProjectBtn").addEventListener("click", async function () {
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();

  if (title && description) {
    const response = await fetch('http://localhost:5000/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    const data = await response.json();
    alert(data.message || "Project added!");

    // reload projects list
    loadProjects();

    // Clear input fields
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";

  } else {
    alert("Please enter both a title and description.");
  }
});



function sendMail(e) {
  e.preventDefault();

  const name = document.getElementById("uname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("Message").value.trim();

  // EmailJS sending
  emailjs.sendForm('service_hdvzupq', 'template_h2wmnqg', '#contact-form')
    .then(function (response) {
      alert("Your message has been sent!");
      document.getElementById("contact-form").reset();
    }, function (error) {
      alert("Failed to send.");
      console.error("Email sending error:", error);
    });

  // MongoDB saving via backend
  fetch('http://localhost:5000/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, message })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error("MongoDB saving error:", error);
    });
}

