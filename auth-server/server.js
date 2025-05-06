
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // In production, use environment variable
const TOKEN_EXPIRY = '24h'; // Token expires in 24 hours

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory user database (in production, use a real database like MongoDB or MySQL)
const users = [
  {
    id: 1,
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@example.com',
    // Password: "demo123"
    password: '$2a$10$XFE3UJp8aVsJvnEcKRPImO3ZHuZ8nTnxReCZr1UBJcR6MoN1akNvG',
    course: 'Software Development',
    registrationDate: '2024-05-01T10:30:00Z',
    lastLogin: '2024-05-03T08:45:00Z',
    progress: [
      {
        course: 'Software Development',
        completed: 3,
        totalModules: 12
      }
    ],
    profileImage: null,
    role: 'user'
  },
  {
    id: 2,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    // Password: "admin123"
    password: '$2a$10$vkrMG9pZ9yx/vZ.IJSXCFe5AY0T.vYREYpUe1cRkFYQlmsDGPJZb.',
    course: 'Administration',
    registrationDate: '2024-05-01T09:00:00Z',
    lastLogin: '2024-05-06T08:00:00Z',
    progress: [],
    profileImage: null,
    role: 'admin'
  }
];

// Gadgets data
const gadgets = [
  {
    id: 1,
    name: 'Premium Smartphone X1',
    category: 'phone',
    price: 499,
    description: 'The latest model with stunning camera features, 128GB storage, and all-day battery life. Perfect for professionals and photography enthusiasts.',
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=800&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 2,
    name: 'Developer Pro Laptop',
    category: 'laptop',
    price: 1299,
    description: 'High-performance laptop with 16GB RAM, 512GB SSD, and dedicated graphics card. Ideal for programming, design, and gaming.',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 3,
    name: 'Ultra-Slim Tablet',
    category: 'tablet',
    price: 349,
    description: '10-inch display, perfect for reading, browsing, and entertainment. Includes stylus and protective case.',
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=800&auto=format&fit=crop&q=60'
    ]
  }
];

// Orders data
const orders = [
  {
    id: 'ORD-2024-001',
    customerId: 1,
    customerName: 'Demo User',
    productId: 1,
    productName: 'Premium Smartphone X1',
    amount: 499,
    date: '2024-05-03T14:30:00Z',
    status: 'completed'
  },
  {
    id: 'ORD-2024-002',
    customerId: 1,
    customerName: 'Demo User',
    productId: 2,
    productName: 'Developer Pro Laptop',
    amount: 1299,
    date: '2024-05-02T10:15:00Z',
    status: 'processing'
  }
];

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, course } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !password || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Get current date in ISO format
        const currentDate = new Date().toISOString();

        // Create new user
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            course,
            registrationDate: currentDate,
            lastLogin: currentDate,
            progress: [
                {
                    course,
                    completed: 0,
                    totalModules: getCourseModules(course)
                }
            ],
            profileImage: null,
            role: 'user'
        };

        users.push(newUser);
        
        // Create JWT token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        // Return user info without password
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login time
        user.lastLogin = new Date().toISOString();

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        // Return user info without password
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected route example - Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
    // Find user by ID from the JWT token
    const user = users.find(user => user.id === req.user.id);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user info without password
    const { password, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, profileImage } = req.body;
        
        // Find user by ID from the JWT token
        const user = users.find(user => user.id === req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Update fields if provided
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (profileImage) user.profileImage = profileImage;
        
        // Return updated user without password
        const { password, ...userWithoutPassword } = user;
        
        res.json({
            message: 'Profile updated successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update course progress
app.put('/api/progress', authenticateToken, async (req, res) => {
    try {
        const { course, completed } = req.body;
        
        if (!course || completed === undefined) {
            return res.status(400).json({ message: 'Course name and completed modules are required' });
        }
        
        // Find user
        const user = users.find(user => user.id === req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Find the course progress entry or create one
        const progressEntry = user.progress.find(p => p.course === course);
        
        if (progressEntry) {
            progressEntry.completed = completed;
        } else {
            user.progress.push({
                course,
                completed,
                totalModules: getCourseModules(course)
            });
        }
        
        res.json({
            message: 'Progress updated successfully',
            progress: user.progress
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all courses (non-protected route)
app.get('/api/courses', (req, res) => {
    const coursesData = [
        {
            id: "c001",
            title: "Software Development",
            modules: 12
        },
        {
            id: "c002",
            title: "Data Analysis",
            modules: 10
        },
        {
            id: "c003",
            title: "UI/UX Design",
            modules: 8
        },
        {
            id: "c004",
            title: "Forex Trading",
            modules: 9
        },
        {
            id: "c005",
            title: "Graphics Design & Video Editing",
            modules: 11
        }
    ];
    
    res.json(coursesData);
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, checkAdminRole, (req, res) => {
    // Return all users without passwords
    const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    
    res.json(usersWithoutPasswords);
});

// Get all gadgets
app.get('/api/gadgets', (req, res) => {
    res.json(gadgets);
});

// Get all orders (admin only)
app.get('/api/orders', authenticateToken, checkAdminRole, (req, res) => {
    res.json(orders);
});

// Add new gadget (admin only)
app.post('/api/gadgets', authenticateToken, checkAdminRole, (req, res) => {
    try {
        const { name, category, price, description, stock, images } = req.body;
        
        // Basic validation
        if (!name || !category || !price || !description || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const newGadget = {
            id: gadgets.length > 0 ? Math.max(...gadgets.map(g => g.id)) + 1 : 1,
            name,
            category,
            price: Number(price),
            description,
            stock: Number(stock),
            images: images || []
        };
        
        gadgets.push(newGadget);
        
        res.status(201).json({
            message: 'Gadget added successfully',
            gadget: newGadget
        });
    } catch (error) {
        console.error('Add gadget error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new order
app.post('/api/orders', authenticateToken, (req, res) => {
    try {
        const { productId, productName, amount } = req.body;
        
        // Basic validation
        if (!productId || !productName || !amount) {
            return res.status(400).json({ message: 'Product ID, name, and amount are required' });
        }
        
        const user = users.find(user => user.id === req.user.id);
        
        const newOrder = {
            id: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
            customerId: user.id,
            customerName: `${user.firstName} ${user.lastName}`,
            productId,
            productName,
            amount: Number(amount),
            date: new Date().toISOString(),
            status: 'processing'
        };
        
        orders.push(newOrder);
        
        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Add order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get dashboard stats (admin only)
app.get('/api/admin/stats', authenticateToken, checkAdminRole, (req, res) => {
    const stats = {
        totalUsers: users.length,
        totalGadgets: gadgets.length,
        totalOrders: orders.length,
        totalSales: orders.reduce((total, order) => total + order.amount, 0),
        activeCourses: 5
    };
    
    res.json(stats);
});

// Helper function to get course modules count
function getCourseModules(course) {
    switch(course) {
        case 'Software Development': return 12;
        case 'Data Analysis': return 10;
        case 'UI/UX Design': return 8;
        case 'Forex Trading': return 9;
        case 'Graphics Design & Video Editing': return 11;
        default: return 10;
    }
}

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Middleware to check admin role
function checkAdminRole(req, res, next) {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    next();
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log(`
-------------------------------------
IMPORTANT: This is a demo server only!
In a production environment, you should:
1. Use a real database (MongoDB, MySQL, etc.)
2. Store JWT secret in environment variables
3. Add proper error handling
4. Implement rate limiting
5. Use HTTPS
-------------------------------------
`);
