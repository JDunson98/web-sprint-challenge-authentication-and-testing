const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./auth-model")

const router = require('express').Router();

router.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await db.findBy({username}).first()

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      })
    }

    const newUser = await db.add({
      username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await db.findBy({username}).first()

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({
      userId: user.id,
      username: username,
    }, 'secret')

    res.cookie("token", token)

    res.json({
      message: `Welcome ${user.username}`
    })
  } catch(err) {
    next(err)
  }
});

module.exports = router;
