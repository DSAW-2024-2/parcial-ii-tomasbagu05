const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMw');

router.get('/', authMiddleware, async (req, res) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Se requieren los parámetros latitude y longitude' });
    } try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: { latitude, longitude, current_weather: true, },
      });
      const temperature = response.data.current_weather.temperature;
      res.json({ temperature });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los datos meteorológicos', error: error.message});
    }
  });
  
  module.exports = router;