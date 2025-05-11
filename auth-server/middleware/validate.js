// Validation middleware
module.exports = {
	// Register validation
	validateRegister: (req, res, next) => {
	  const { firstName, lastName, email, password, course } = req.body;
	  const errors = [];
        
	  // Check first name
	  if (!firstName || firstName.trim().length < 2) {
	    errors.push('First name must be at least 2 characters');
	  }
        
	  // Check last name
	  if (!lastName || lastName.trim().length < 2) {
	    errors.push('Last name must be at least 2 characters');
	  }
        
	  // Check email format
	  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
	    errors.push('Please enter a valid email address');
	  }
        
	  // Check password length
	  if (!password || password.length < 8) {
	    errors.push('Password must be at least 8 characters');
	  }
        
	  // Check course selection
	  if (!course) {
	    errors.push('Please select a course');
	  }
        
	  // If there are validation errors, return them
	  if (errors.length > 0) {
	    return res.status(400).json({ message: 'Validation failed', errors });
	  }
        
	  // Proceed if validation passes
	  next();
	},
	
	// Login validation
	validateLogin: (req, res, next) => {
	  const { email, password } = req.body;
	  const errors = [];
        
	  // Check email format
	  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
	    errors.push('Please enter a valid email address');
	  }
        
	  // Check password
	  if (!password) {
	    errors.push('Password is required');
	  }
        
	  // If there are validation errors, return them
	  if (errors.length > 0) {
	    return res.status(400).json({ message: 'Validation failed', errors });
	  }
        
	  // Proceed if validation passes
	  next();
	}
        };
        