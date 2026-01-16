const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validateFilament } = require('../validators/filamentValidator');

const getFilaments = async (req, res) => {
  try {
    const filaments = await mongodb
      .getDatabase()
      .db()
      .collection('filaments')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(filaments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFilament = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const filamentId = new ObjectId(id);

    const filaments = await mongodb
      .getDatabase()
      .db()
      .collection('filaments')
      .find({ _id: filamentId })
      .toArray();

    if (!filaments[0]) {
      return res.status(404).json({ message: 'Filament not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(filaments[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createFilament = async (req, res) => {
  try {
    const errors = validateFilament(req.body);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const filament = {
      brand: req.body.brand,
      material: req.body.material,
      color: req.body.color,
      nozzleTempMin: req.body.nozzleTempMin,
      nozzleTempMax: req.body.nozzleTempMax,
      bedTempMin: req.body.bedTempMin,
      bedTempMax: req.body.bedTempMax
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('filaments')
      .insertOne(filament);

    if (response.acknowledged) {
      return res.status(201).json(response);
    }
    return res
      .status(500)
      .json(response.error || 'Some error occurred while creating the new Filament.');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateFilament = async (req, res) => {
  try {
    const errors = validateFilament(req.body);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const filamentId = new ObjectId(id);

    const filament = {
      brand: req.body.brand,
      material: req.body.material,
      color: req.body.color,
      nozzleTempMin: req.body.nozzleTempMin,
      nozzleTempMax: req.body.nozzleTempMax,
      bedTempMin: req.body.bedTempMin,
      bedTempMax: req.body.bedTempMax
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('filaments')
      .replaceOne({ _id: filamentId }, filament);

    if (response.matchedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Filament not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFilament = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const filamentId = new ObjectId(id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('filaments')
      .deleteOne({ _id: filamentId });

    if (response.deletedCount > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Filament not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFilaments,
  getFilament,
  createFilament,
  updateFilament,
  deleteFilament
};
