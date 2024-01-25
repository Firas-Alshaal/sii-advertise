const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const feedController = require("../controllers/package");

router.get("/advertise/:id", feedController.getPackageById);

router.get("/advertises", feedController.getPackages);

router.post(
  "/advertise",
  [
    body("title").trim().isLength({ min: 1 }).withMessage("title is required"),
    body("content")
      .trim()
      .isLength({ min: 10 })
      .withMessage("content is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],

  feedController.createPackage
);

module.exports = router;
