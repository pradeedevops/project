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

        img {
          width: 120px;
          height: auto;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Clickops Technologies</h1>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIUlEQVQoU2NkQAP/Gf4zIwMjI4P///wPDAwMDAwPz/AAAjWwP/jfHciAAAAABJRU5ErkJggg==" alt="" />
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

