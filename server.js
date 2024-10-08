require('dotenv').config();
const express = require('express');
const app = express();

const {router: authRoutes} = require('./routes/auth');
const weatherRoutes = require('./routes/weather'); 

app.get('/', (req, res) => {
    res.json({ message: 'Endpoint Working'});

});

app.use(express.json());

//Usar los routers
app.use('/login', authRoutes);
app.use('/weather', weatherRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
