import path from "path";
import express from "express";
const app = express();

const __dirname = path.resolve();

const publishFolder = __dirname + "/publish";
app.use(express.static(publishFolder, { extensions: ["html"] }));

const PORT = 2234;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
