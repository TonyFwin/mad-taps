const cookieParser = require('cookie-parser');

require('dotenv');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO: use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// TODO: use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(
      `Server is now running on port http://localhost:${details.port}`
    );
  }
);
