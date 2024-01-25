const { validationResult } = require("express-validator");
const Package = require("../models/package");

exports.createPackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    if (!req.file) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      throw error;
    }

    const image = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const price = req.body.price;

    const newPackage = new Package({
      title: title,
      price: price,
      content: content,
      image: image,
    });

    await newPackage.save();

    res
      .status(201)
      .json({ message: "post created successfully", advertising: newPackage });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPackageById = async (req, res, next) => {
  try {
    const packageId = req.params.id;
    const package = await Package.findById(packageId);

    if (!package) {
      return res.status(404).json({ message: "Advertising not found" });
    }

    res.json({ message: "Advertise fetched successfully", advertise: package });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.json({
      message: "Advertises fetched successfully",
      advertises: packages,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
