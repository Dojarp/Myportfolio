async function loadProjects() {
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
}

window.onload = loadProjects;

document.getElementById("addProjectBtn").addEventListener("click", async function () {
  const title = document.getElementById("projectTitle").value.trim();
  const description = document.getElementById("projectDescription").value.trim();

  if (title && description) {
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
  } else {
    alert("Please enter both a title and description.");
  }
});




function sendMail(e) {
  e.preventDefault();

  const submitBtn = document.querySelector("#contact-form input[type='submit']");
  submitBtn.disabled = true;
  submitBtn.value = "Sending...";

  const name = document.getElementById("uname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("Message").value.trim();

  // EmailJS sending
  emailjs.sendForm('service_hdvzupq', 'template_h2wmnqg', '#contact-form')
    .then(function (response) {
      alert("Your message has been sent!");
      document.getElementById("contact-form").reset();
      submitBtn.disabled = false;
      submitBtn.value = "Submit";
    }, function (error) {
      alert("Failed to send.");
      console.error("Email sending error:", error);
      submitBtn.disabled = false;
      submitBtn.value = "Submit";
    });

 // MongoDB saving via backend
fetch('https://myportfolio-gwtv.onrender.com/api/contacts', {
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





