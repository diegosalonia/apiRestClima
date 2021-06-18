const express = require("express");

const CityRepository = require("../repositories/cityRepository")
const repository = new CityRepository()
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const cities = async(req, res) => {
  
  res.json(await repository.findCities(req.params.city));
};


module.exports = {
  cities,
};
