import express from 'express';
import {
  getDecors,
  getDecorById,
  createDecor,
  updateDecor,
  deleteDecor,
} from '../controllers/decor.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// GET /api - Get all decors
router.get('/', authMiddleware, getDecors);

// GET /api/:id - Get a decor by ID
router.get('/:id', authMiddleware, getDecorById);

// POST /api - Create a new decor
router.post('/', authMiddleware, createDecor);

// PUT /api/:id - Update a decor by ID
router.put('/:id', authMiddleware, updateDecor);

// DELETE /api/:id - Delete a decor by ID
router.delete('/:id', authMiddleware, deleteDecor);

export default router;


