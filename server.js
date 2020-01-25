const express = require("express");
const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
