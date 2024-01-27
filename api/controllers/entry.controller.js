import Entry from "../models/entry.model.js";
import { errorHandler } from "../utils/error.js";

export const createEntry = async (req, res, next) => {
    try {
        const entry = await Entry.create(req.body);
        return res.status(201).json(entry)
    } catch (error) {
        next(error)
    }
}

export const deleteEntry = async (req, res, next) => {
    const entry = await Entry.findById(req.params.id);
  
    if (!entry) {
      return next(errorHandler(404, 'Entry not found'));
    }
  
    if (req.user.id !== entry.userRef) {
      return next(errorHandler(401, 'You can only delete your own entrys'));
    }
  
    try {
      await Entry.findByIdAndDelete(req.params.id);
      res.status(200).json('Entry has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updateEntry = async (req, res, next) => {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return next(errorHandler(404, 'Entry not found'));
    }
    if (req.user.id !== entry.userRef) {
      return next(errorHandler(401, 'You can only update your own entrys'));
    }
  
    try {
      const updatedEntry = await Entry.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedEntry);
    } catch (error) {
      next(error);
    }
  };
  
  export const getEntry = async (req, res, next) => {
    try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
        return next(errorHandler(404, 'Entry not found!'));
      }
      res.status(200).json(entry);
    } catch (error) {
      next(error);
    }
  };

  export const getEntrys = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const entrys = await Entry.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(entrys);
    } catch (error) {
      next(error);
    }
  };