

// Checks if the user is an adult (18 or older)
function isAdult(user) {
  return typeof user.age === 'number' && Number.isFinite(user.age) && user.age >= 18 && user.age < 120;
}



// Checks if the email is a valid string, contains '@', and has a domain
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) return false;
  // Simple regex for basic email validation
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

// Checks if the name is a non-empty string and not just whitespace
function isValidName(name) {
  return typeof name === 'string' && name.trim().length > 0 && name.length < 100;
}

// Checks if the subscription is one of the allowed values
function isValidSubscription(subscription) {
  return ['premium', 'basic', 'none'].includes(subscription);
}



// Returns a message based on the user's subscription type

function getSubscriptionMessage(user) {
  switch (user.subscription) {
    case 'premium':
      return `${user.name} has access to all features.`;
    case 'basic':
      return `${user.name} has limited access.`;
    case 'none':
      return `${user.name} has no access.`;
    default:
      return `${user.name} has an unknown subscription type.`;
  }
}


// Processes an array of users and logs their status

function processUsers(users) {
  if (!Array.isArray(users)) {
    console.error('Input must be an array of users.');
    return;
  }
  users.forEach((user, idx) => {
    if (!user || typeof user !== 'object') {
      console.warn(`User at index ${idx} is invalid.`);
      return;
    }
    const { name, age, email, subscription } = user;
    // Validate each field with stricter checks
    if (!isValidName(name)) {
      console.warn(`Invalid or empty name for user at index ${idx}:`, user);
      return;
    }
    if (!Number.isFinite(age) || age < 0 || age > 120) {
      console.warn(`Invalid age for user at index ${idx}:`, user);
      return;
    }
    if (!isValidEmail(email)) {
      console.warn(`Invalid email for user at index ${idx}:`, user);
      return;
    }
    if (!isValidSubscription(subscription)) {
      console.warn(`Invalid subscription for user at index ${idx}:`, user);
      return;
    }
    // Output user info
    console.log(`${name} is ${isAdult(user) ? 'an adult' : 'not an adult'}.`);
    console.log(isValidEmail(email) ? 'Email is valid.' : 'Invalid email.');
    console.log(getSubscriptionMessage(user));
  });
}


const users = [
  { name: 'Alice', age: 25, email: 'alice@example.com', subscription: 'premium' },
  { name: 'Bob', age: 17, email: 'bobexample.com', subscription: 'basic' }, // Invalid email
  { name: 'Charlie', age: 30, email: 'charlie@example.com', subscription: 'none' },
  { name: '', age: 22, email: 'no_name@example.com', subscription: 'premium' }, // Invalid name
  { name: 'Diana', age: -5, email: 'diana@example.com', subscription: 'premium' }, // Invalid age
  { name: 'Eve', age: 28, email: 'eve@example', subscription: 'gold' }, // Invalid email and subscription
];

processUsers(users);

//Corregir errores de código y mejorar la legibilidad del código