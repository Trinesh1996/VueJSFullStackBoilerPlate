const brain = require("brain.js")
const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")

// init modules, env , port
let app = express()
let PORT = process.env.PORT || 3015;

// Static files
// Handle Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))
  // Handle SPA
  app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
}


app.use(cors());

// middle ware use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const posts = require("./routes/api/posts")


app.use("/api/posts", posts)


app.listen(PORT, function () {
    console.log('App starting on port', PORT)
  });

  

