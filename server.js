require('dotenv').config();
app.use(express.json());
const express = require('express');
const app = express();

const {router: authRoutes} = require('./routes/auth');
const {router: weatherRoutes} = require('./routes/weather');

app.get('/', (req, res) => {
    res.json({ message: 'Endpoint Working'});

});

app.use(express.json());

//Usar los routers
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
