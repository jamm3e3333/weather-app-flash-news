const express = require('express');
const path = require('path');

const app = express();
const pathPublic = path.join(__dirname, 'build');

app.use(express.static(pathPublic));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})