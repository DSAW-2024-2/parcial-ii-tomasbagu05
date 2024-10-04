const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');


app.use(express.json());
app.use(cors());

//Usar los routers
app.use('./api/auth', authRoutes);
app.use('./api/weather', weatherRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
