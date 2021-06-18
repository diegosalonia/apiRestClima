const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getAllUsers = (req, res) => {
  const users = [
    {
      id: 1,
      name: "Diego",
    },
    {
      id: 2,
      name: "Martin",
    },
  ];
  res.json(users);
};

const createUser = (req, res) => {
  const user = req.body;
  user.id = 2222;
  const result = {
    mesagge: "User Created",
    user,
  };
  res.status(201).json(result);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;

  user.id = id;
  const result = {
    mesagge: "User Updated",
    user,
  };
  res.json(result);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const result = {
    mesagge: `User with id: ${id} deleted`,
  };
  res.json(result);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
