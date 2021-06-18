const { default: axios } = require('axios');
const config = require('../config')


class CityRepository {
    constructor(){
        this.limit = 10;
        this.lenguage = 'es';
        this.pathBase = config.mapbox.pathBase;
        this.apikey = config.mapbox.apikey
    }

    async findCities(city) {
        try {
            const instance = axios.create({
                baseURL: `${this.pathBase}${city}.json`,
                params: {
                    'access_token': this.apikey,
                    'limit': this.limit,
                    'lenguage': this.lenguage
                },
            })
            const response = await instance.get();
            return response.data;            
        } catch (error) {
            throw error
        }
    }
}

module.exports = CityRepository