import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response) {
  res.send('respond with a resource');
});

module.exports = router;
