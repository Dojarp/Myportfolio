function sendMail(e) {
  e.preventDefault();

  const submitBtn = document.querySelector("#contact-form input[type='submit']");
  submitBtn.disabled = true;
  submitBtn.value = "Sending...";

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
}
