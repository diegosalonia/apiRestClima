const WeatherRepository = require('../repositories/weatherRepository');
const weatherRepository= new WeatherRepository();
const CityRepository = require('../repositories/cityRepository');
const cityRepository = new CityRepository();
const logger = require('../loaders/logger');

const weatherByCord = async(lon, lat) => {

    try {
        const weather = await weatherRepository.weatherByCord(lon, lat)
            return {
                description: weather.weather[0].description,
                temperature: weather.main.temp,
                temperatureMin: weather.main.temp_min,
                temperatureMin: weather.main.temp_max,
            }        
    } catch (err) {
        throw(err);
    }
}

const weatherByCityId = async(city, id) => {
    try {
        const citie = await cityRepository.findCities(city);
        const cityData = citie.features.find((e) => e.id === id);
        const lon = cityData.geometry.coordinates[0];
        const lat = cityData.geometry.coordinates[1];
        return await weatherByCord(lon, lat);        
    } catch (err) {
        throw(err);
    }
}

module.exports = {
    weatherByCord,
    weatherByCityId
}