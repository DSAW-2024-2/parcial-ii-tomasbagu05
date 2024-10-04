const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Se requieren los parámetros latitude y longitude' });
  }

  try {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast';
    const params = { latitude, longitude, current_weather: true};

    const { data } = await axios.get(apiUrl, { params });

    const temperature = data?.current_weather?.temperature;

    if (temperature === undefined) {
      return res.status(500).json({ message: 'No se pudo obtener la temperatura de la API' });
    }

    res.json({ temperature });

  } catch (error) {
    console.error('Error al obtener los datos meteorológicos:', error);

    const errorMessage = error.response?.data?.message || 'Error al obtener los datos meteorológicos';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
});

module.exports = router;
