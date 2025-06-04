# Todo List Application

A full-stack Todo List application built with React.js and Node.js, featuring user authentication, task management, and a modern UI.

## Project Structure

The project is divided into two main parts:
- `client/`: React.js frontend application
- `server/`: Node.js backend API

## Features

- User authentication and authorization
- Create, read, update, and delete tasks
- Responsive and modern UI
- Secure password handling
- JWT-based authentication
- PostgreSQL database with Sequelize ORM
- Unit testing with Mocha and Chai
- File upload support with Cloudinary
- Input validation and sanitization

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- JWT Decode for token handling

### Backend
- Node.js with Express
- PostgreSQL database
- Sequelize ORM
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Mocha and Chai for testing
- Pino for logging

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dkvaghela25/Todo-list.git
cd Todo-list
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add necessary environment variables (database URL, JWT secret, etc.)

4. Set up the database:
```bash
cd server
npx sequelize-cli db:migrate
```

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd client
npm start
```

The client will run on `http://localhost:3001` and the server on `http://localhost:3000`.

## Testing

Run the test suite:
```bash
cd server
npm run unittest
```

## Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## API Documentation

The API endpoints are documented in the server's source code. Key endpoints include:

- Authentication:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/logout

- Tasks:
  - GET /api/tasks
  - POST /api/tasks
  - PUT /api/tasks/:id
  - DELETE /api/tasks/:id

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Divyang Vaghela
