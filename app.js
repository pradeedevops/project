const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Clickops Technologies</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #4a00e0, #007cf0);
          color: white;
          flex-direction: column;
        }

        h1 {
          font-size: 3em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        }

        button {
          margin-top: 30px;
          padding: 12px 24px;
          font-size: 1em;
          font-weight: bold;
          color: #4a00e0;
          background-color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #e6e6e6;
        }

        ul {
          margin-top: 20px;
          list-style: none;
          padding: 0;
          display: none;
        }

        ul li {
          font-size: 1.2em;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Clickops Technologies</h1>
      <button onclick="showCourses()">Courses Available</button>
      <ul id="courses">
        <li>DevOps Architect Program</li>
        <li>DevSecOps Architect Program</li>
        <li>CloudOps Architect Program</li>
      </ul>
      <script>
        function showCourses() {
          document.getElementById('courses').style.display = 'block';
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

