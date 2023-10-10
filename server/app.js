const express = require('express');
const dataBase = require('./sever')
const authorization = require('./routes/authorization')
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(
    cors({
      origin: ["http://localhost:3000"],
    //   origin: "https://locomate-react-frontend.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
      credentials: true,
      exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    })
  );

app.use('/',authorization)





app.listen(4000, () => console.log('Example app is listening on port 3000.'));
dataBase.database();