const express = require("express");
const logger = require("../loaders/logger")
const Success = require("../helper/successHandler");
const { weatherByCord: weatherByCordService, weatherByCityId: weatherByCityIdService } = require('../services/weatherService')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCord = async(req, res, next) => {  
  try {
    const { lon, lat } = req.query;
    const weather = await weatherByCordService(lon, lat);
    const success = new Success(weather);
    res.json(success);    
  } catch (err) {
    next(err);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCityId = async(req, res, next) => {  
  try {
    const id = req.params.id;
    const city = req.params.city;
    const weather = await weatherByCityIdService(city, id);
    const success = new Success(weather);
    res.json(success);
} catch (err) {
    next(err);
}
};


module.exports = {
  weatherByCord,
  weatherByCityId
};
