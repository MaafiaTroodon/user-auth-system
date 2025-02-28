/**
 * data.js
 * 
 * In-memory JSON object or Maps/Sets simulating a 'database'.
 * We'll keep a Map for user credentials, and a Set for 
 * already-registered emails or some other data if needed.
 */

// Example: minimal JSON-like object (as per instructions):
const initialUsersObject = {
    // Must meet password rules: at least 12 chars, uppercase, lowercase, digit, special char
    "existingUser": "Example@Pass123", 
    "aliceTest":    "P@ssword345678"    // Another example
  };
  
  // Convert that object into a Map so we can show usage of ES6 Maps
  const userCredentials = new Map(Object.entries(initialUsersObject));
  
  // Optionally track emails in a Set (if we want to ensure unique emails).
  // We'll just keep a small example:
  const registeredEmails = new Set(["existing@example.com", "alice@example.org"]);
  

  