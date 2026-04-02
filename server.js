const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("certification/key.pem"),
  cert: fs.readFileSync("certification/cert.pem")
};

const server = https.createServer(options, (req, res) => {
  res.end("working\n");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}/`);
});