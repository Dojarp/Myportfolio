function subAlert(){
  alert("Submitted Successfully!");
}

function loadProjects() {
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = ""; // clear existing list

  const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  storedProjects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-item";

    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    `;

    projectList.appendChild(projectCard);
  });
}

// Load existing projects when page loads
window.onload = loadProjects;

document.getElementById("addProjectBtn").addEventListener("click", function () {
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();

  if (title && description) {
    // Get existing projects
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Add new project to array
    storedProjects.push({ title, description });

    // Save back to localStorage
    localStorage.setItem("projects", JSON.stringify(storedProjects));

    // Display the new project
    const projectList = document.getElementById("projectList");
    const projectCard = document.createElement("div");
    projectCard.className = "project-item";

    projectCard.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    projectList.appendChild(projectCard);

    // Clear inputs
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";

  } else {
    alert("Please enter both a title and description.");
  }
});

function sendMail(e) {
  e.preventDefault();

  emailjs.sendForm('service_hdvzupq', 'template_h2wmnqg', '#contact-form')
    .then(function(response) {
      alert("Your message has been sent successfully!");
      document.getElementById("contact-form").reset();
    }, function(error) {
      alert("Failed to send the message. Please try again later.");
      console.error("Email sending error:", error);
    });
}




