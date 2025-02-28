// In-memory database using Maps & Sets
const users = new Map(); // Stores username -> password mapping
const emails = new Set(); // Tracks registered emails

/**
 * Custom function to check if an email is valid
 * - Must contain exactly **one** '@' symbol
 * - Must contain a period '.' after '@'
 * - The domain must be at least 2 characters long
 */
const isEmailValid = (email) => {
    let atCount = 0, atIndex = -1, dotIndex = -1;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            atCount++;
            atIndex = i;
        }
        if (email[i] === '.' && i > atIndex + 1) {
            dotIndex = i;
        }
    }
    return atCount === 1 && dotIndex > atIndex + 1 && email.length - dotIndex > 2;
};

/**
 * Custom function to validate username
 * - First character must be a letter (A-Z or a-z)
 * - Only letters, numbers, and underscores allowed
 */
const isUsernameValid = (username) => {
    if (username.length === 0) return false;
    let firstChar = username[0];
    if (!((firstChar >= 'A' && firstChar <= 'Z') || (firstChar >= 'a' && firstChar <= 'z'))) return false;
    for (let i = 0; i < username.length; i++) {
        let c = username[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c === '_')) {
            return false;
        }
    }
    return true;
};

/**
 * Custom function to validate password
 * - Minimum length: 12
 * - At least 1 uppercase, 1 lowercase, 1 number, 1 special character
 */
const isPasswordValid = (password) => {
    if (password.length < 12) return false;

    let hasUpper = false, hasLower = false, hasNumber = false, hasSpecial = false;
    let specialChars = "!@#$%^&*()-_+=[]{}|;:'\",.<>?/";
    
    for (let i = 0; i < password.length; i++) {
        let c = password[i];
        if (c >= 'A' && c <= 'Z') hasUpper = true;
        else if (c >= 'a' && c <= 'z') hasLower = true;
        else if (c >= '0' && c <= '9') hasNumber = true;
        else {
            for (let j = 0; j < specialChars.length; j++) {
                if (c === specialChars[j]) {
                    hasSpecial = true;
                    break;
                }
            }
        }
    }
    return hasUpper && hasLower && hasNumber && hasSpecial;
};

// Function to show notification messages
const showNotification = (message) => {
    const notificationBar = document.getElementById("notificationBar");
    notificationBar.textContent = message;
    notificationBar.classList.add("show");

    setTimeout(() => {
        notificationBar.classList.remove("show");
    }, 3000);
};

// Attach event listener to form
document.getElementById("registrationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Destructure form fields
    const { regEmail, regUsername, regPassword, regConfirmPassword } = event.target.elements;
    const email = regEmail.value.trim();
    const username = regUsername.value.trim();
    const password = regPassword.value;
    const confirmPassword = regConfirmPassword.value;

    // Clear previous error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";

    let isValid = true;

    try {
        // Validate email
        if (!isEmailValid(email)) {
            document.getElementById("emailError").textContent = "Invalid email format.";
            isValid = false;
        } else if (emails.has(email)) {
            document.getElementById("emailError").textContent = "Email already registered.";
            isValid = false;
        }

        // Validate username
        if (!isUsernameValid(username)) {
            document.getElementById("usernameError").textContent = "Invalid username format.";
            isValid = false;
        } else if (users.has(username)) {
            document.getElementById("usernameError").textContent = "Username already taken.";
            isValid = false;
        }

        // Validate password
        if (!isPasswordValid(password)) {
            document.getElementById("passwordError").textContent = "Password must be at least 12 characters long with uppercase, lowercase, number, and special character.";
            isValid = false;
        }

        // Confirm Password
        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            // Save new user
            users.set(username, password);
            emails.add(email);

            // Success message
            showNotification(`Thank you for registering, ${username}!`);
            document.getElementById("registrationFeedback").textContent = "Registration successful!";
            console.log("New user registered:", username);

            // Reset form
            event.target.reset();
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An unexpected error occurred. Please try again.");
    }
});
