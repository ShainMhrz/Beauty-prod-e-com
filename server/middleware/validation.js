const validator = require('validator');

const validateRegistration = (req, res, next) => {
  const { username, email, password, first_name, last_name } = req.body;
  const errors = [];

  // Username validation
  if (!username || username.length < 3 || username.length > 50) {
    errors.push('Username must be between 3 and 50 characters');
  }

  // Email validation
  if (!email || !validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Name validation
  if (!first_name || first_name.length < 2) {
    errors.push('First name must be at least 2 characters');
  }

  if (!last_name || last_name.length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateRegistration, validateLogin };