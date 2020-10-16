import express from 'express';
const app = express();

const path = __dirname + '/publish'
app.use(express.static(path, { extensions: ['html'] }));

const PORT = 2234;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));