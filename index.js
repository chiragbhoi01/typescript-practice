// function adding(x: number, y: number): number {
//     return x + y;
// }
// console.log(adding(5,6));
// type chirag = {
//     name: string;
//     age: number;
// }
// type marshal =  {
//     address : string;
//     pincode : number;
// }
// type fullDetail = chirag & marshal
// const detail:fullDetail = {
//     address : "motagaon",
//     pincode : 327021,
//     name : 'chirag',
//     age : 22,
// }
// console.log(detail );
// function token (id: string | number | boolean) {
//     return console.log(id);
// }
// token(false)
// var Status;
// (function (Status) {
//     Status[Status["Success"] = 200] = "Success";
//     Status[Status["NotFound"] = 404] = "NotFound";
//     Status[Status["ServerError"] = 500] = "ServerError";
//     Status["cleintError"] = "celemt error : 501";
// })(Status || (Status = {}));
// console.log(Status.Success); // Output: 200
// console.log(Status.cleintError); // Output: 404


// const jwt = require('jsonwebtoken');

// const secretKey = "j"

// // JWT Generate करना
// const token = jwt.sign({ id: 123, role: 'marshal' }, secretKey, { expiresIn: '1h' });
// console.log(token);

// // JWT Verify करना
// const verified = jwt.verify(token, secretKey);
// console.log(verified);


// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// -
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// const secretKey = 'mysecretkey';

// // Login Route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Authentication Logic (डेमो के लिए)
//   if (username === 'admin' && password === 'password') {
//     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//     res.cookie('authToken', token, { httpOnly: true });
//     res.send('Login Successful');
//   } else {
//     res.status(401).send('Invalid Credentials');
//   }
// });

// // Middleware for Token Verification
// function verifyToken(req, res, next) {
//   const token = req.cookies.authToken;
//   if (!token) {
//     return res.status(403).send('Token is missing');
//   }

//   try {
//     const verified = jwt.verify(token, secretKey);
//     req.user = verified; // उपयोगकर्ता की जानकारी सेट करना
//     next();
//   } catch (err) {
//     res.status(401).send('Invalid Token');
//   }
// }

// // Protected Route
// app.get('/dashboard', verifyToken, (req, res) => {
//   res.send(`Welcome to Dashboard, ${req.user.username}`);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Serve a single HTML page
// app.get('/', (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Server Example</title>
//       <script src="https://cdn.socket.io/4.5.1/socket.io.min.js"></script>
//     </head>
//     <body>
//       <h1>Check the browser console</h1>
//       <script>
//         const socket = io();
//         socket.on('message', (msg) => {
//           console.log(msg); // Log from the server in the browser console
//         });
//       </script>
//     </body>
//     </html>
//   `);
// });

// // Emit a message to the browser console
// io.on('connection', (socket) => {
//   socket.emit('message', 'Server is running on port 3000'); // Sends message to browser console
// });

// // Start the server
// server.listen(3000, () => {
//   console.log('Server is running on port 3000'); // Logs in the terminal
// });





const express = require('express');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mysecretkey';

app.use(express.json());
app.use(cookieParser());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});

// Login route to generate JWT and set a cookie
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Generate a JWT token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  // Set token as a cookie
  res.cookie('authToken', token, { httpOnly: false });
  res.send({ message: 'Logged in successfully!', token });
});

// Protected route to verify JWT
app.get('/dashboard', (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send({ message: 'No token found!' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.send({ message: 'Welcome to the dashboard!', user: decoded });
  } catch (error) {
    res.status(403).send({ message: 'Invalid token!' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
