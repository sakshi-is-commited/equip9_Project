#  **User Registration System**
## **Overview**
This project is a user registration and authentication system that allows users to register with their details or log in using their social media accounts. The application stores user information in a MySQL database and provides RESTful APIs for client-server communication.

### **Features**<br/>
**1. Registration Page:**
- Fields: First Name, Last Name, Mobile Number, and Password.</br>
- Social media login options: Google, Facebook, Apple ID.</br>

**2. Database Design:**</br>
- All user details are stored in MySQL tables.
- Each table includes:
  * Primary Key
  * Created Date (UTC)
  * Created By
  * Updated Date (UTC)
  * Updated By
- Passwords are hashed for security.

**3. Stored Procedures:**</br>
- Procedures for Create, Read, Update, and Delete (CRUD) operations.</br>

**4. REST API Endpoints:**</br>
- POST: Create a new user record.
- GET: Retrieve user records.
- PUT: Update user details.
- DELETE: Remove user records.</br>

**5. User Authentication:**</br>
- After registration, users are redirected to the login page.
- Login page prompts for mobile number and password.
- Validated users are welcomed with a personalized greeting based on the time of day.</br>

**6. Logout Feature:**
- Session management with a logout option available on the user interface.</br>

## **Technologies Used**
* Frontend: HTML, CSS (for styling)
* Backend: Node.js or any suitable server-side technology
* Database: MySQL
* Additional Libraries: bcrypt (for password hashing), Express (for API structure)</br>

## **Setup Instructions**
**1. Prerequisites:**</br>
- Node.js and npm installed.
- MySQL server installed and running.

**2. Install Dependencies:**</br>
```
npm install
```
**3. Database Setup:**</br>
- Create a MySQL database and run the provided SQL script to set up tables.
- Ensure to configure your connection settings in the application.
  
**4. Starting the Server:**
```
npm start
```
**5. Accessing the Application:**

- Open a web browser and navigate to http://localhost:5000 (or the port you configured).

## API Documentation
- POST /api/registration: Create a new user.
- GET /api/users: Retrieve user records.
- PUT /api/users/:id: Update user information.
- DELETE /api/users/:id: Remove a user from the database.
## Security Considerations
- Ensure all passwords are hashed before storage using a secure hashing algorithm (e.g., bcrypt).
- Implement HTTPS for secure data transmission.
## Author
  **Sakshi Adarkar**
  
