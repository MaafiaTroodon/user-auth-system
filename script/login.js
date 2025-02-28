/**
 * login.js
 *
 * Handles login form:
 *  - Validates if username/password exist in localStorage
 *  - Displays error messages and success feedback
 */

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Destructure form fields
  const {
    loginUsername: { value: username },
    loginPassword: { value: password },
  } = loginForm.elements;

  // Clear previous error messages
  document.getElementById("loginUserError").textContent = "";
  document.getElementById("loginPassError").textContent = "";

  try {
    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem("userCredentials")) || {};

    const feedbackEl = document.getElementById("loginFeedback");
    feedbackEl.textContent = ""; // Clear previous feedback

    // Check if username exists
    if (!users[username]) {
      document.getElementById("loginUserError").textContent = "Username not found.";
      return;
    }

    // Check password
    if (users[username] !== password) {
      document.getElementById("loginPassError").textContent = "Incorrect password.";
      return;
    }

    const showNotification = (message) => {
        const notificationBar = document.getElementById("notificationBar");
        notificationBar.textContent = message;
        notificationBar.classList.add("show");
    
        // Hide after 3 seconds
        setTimeout(() => {
            notificationBar.classList.remove("show");
        }, 3000);
    };
    
    if (users[username] === password) {
        showNotification(`Welcome, ${username}!`);
    
        feedbackEl.textContent = "Login successful!";
        feedbackEl.classList.add("success-message");
    
        console.log("User logged in:", username);
    
        // Redirect (optional)
        // window.location.href = "dashboard.html";
    }
    

    

    // Clear form after login
    loginForm.reset();

  } catch (error) {
    console.error("An error occurred during login:", error);
    alert("Something went wrong while logging in. Please try again.");
  }
});
