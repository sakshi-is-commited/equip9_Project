const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(cors());


// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Use your phpMyAdmin password if set
    database: 'equip9',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// POST API: Create Record
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, mobile, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'CALL CreateRecord(?, ?, ?, ?, ?)',
            [firstName, lastName, mobile, hashedPassword, 'System'],
            (err) => {
                if (err) return res.status(500).json({ message: 'Database error', error: err });
                res.status(201).send('User registered successfully');
            }
        );
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// GET API: Retrieve All Records
app.get('/api/users', (req, res) => {
    db.query('CALL GetRecords()', (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json(results[0]);
    });
});

// PUT API: Update Record
app.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, mobile } = req.body;

    db.query(
        'CALL UpdateRecord(?, ?, ?, ?, ?)',
        [id, firstName, lastName, mobile, 'System'],
        (err) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });
            res.status(200).send('User updated successfully');
        }
    );
});

// DELETE API: Delete Record
app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;

    db.query('CALL DeleteRecord(?)', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).send('User deleted successfully');
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));



app.post('/api/login', async (req, res) => {
    const { mobile, password } = req.body;

    // Fetch user from the database
    db.query('SELECT * FROM registration WHERE mobile = ?', [mobile], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Include first_name and last_name in the JWT payload
        const token = jwt.sign(
            { mobile: user.mobile, first_name: user.first_name, last_name: user.last_name }, // Updated column names
            'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    });
});



const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        console.log('Middleware User:', req.user);

        next();
    });
    
};


app.get('/api/greeting', authenticateToken, (req, res) => {
    const { first_name, last_name } = req.user; // Extracted from the JWT token
    console.log('Decoded User:', req.user);

    const currentHour = new Date().getHours();
    const greeting =
        currentHour < 12
            ? 'Good Morning'
            : currentHour < 18
            ? 'Good Afternoon'
            : 'Good Evening';

    res.json({ greeting: `${greeting}, Mr./Ms. ${first_name} ${last_name}` });
});
