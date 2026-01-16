const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validateBrand } = require('../validators/brandValidator');

const getBrands = async (req, res) => {
  try {
    const brands = await mongodb
      .getDatabase()
      .db()
      .collection('brands')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const brandId = new ObjectId(id);

    const brands = await mongodb
      .getDatabase()
      .db()
      .collection('brands')
      .find({ _id: brandId })
      .toArray();

    if (!brands[0]) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(brands[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const errors = validateBrand(req.body);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const brand = {
      name: req.body.name,
      country: req.body.country,
      website: req.body.website,
      notes: req.body.notes
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('brands')
      .insertOne(brand);

    if (response.acknowledged) {
      return res.status(201).json(response);
    }
    return res
      .status(500)
      .json(response.error || 'Some error occurred while creating the new Brand.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const errors = validateBrand(req.body);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const brandId = new ObjectId(id);

    const brand = {
      name: req.body.name,
      country: req.body.country,
      website: req.body.website,
      notes: req.body.notes
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('brands')
      .replaceOne({ _id: brandId }, brand);

    if (response.matchedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Brand not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const brandId = new ObjectId(id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('brands')
      .deleteOne({ _id: brandId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Brand not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
};
