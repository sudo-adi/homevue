import Decor from '../models/decor.model.js'; // Import the Decor model
import User from '../models/user.model.js'; // Import the User model if needed for validation

/**
 * Get all decors
 */
export const getDecors = async (req, res) => {
  try {
    // Optionally, you can populate the created_by field to get user details
    const decors = await Decor.find().populate('created_by', 'name email');
    res.status(200).json(decors);
  } catch (error) {
    console.error('Error fetching decors:', error);
    res.status(500).json({ message: 'Failed to fetch decors' });
  }
};

/**
 * Get a decor by ID
 */
export const getDecorById = async (req, res) => {
  const { id } = req.params;
  try {
    const decor = await Decor.findById(id).populate('created_by', 'name email');
    if (!decor) {
      return res.status(404).json({ message: 'Decor not found' });
    }
    res.status(200).json(decor);
  } catch (error) {
    console.error('Error fetching decor:', error);
    res.status(500).json({ message: 'Failed to fetch decor' });
  }
};

/**
 * Create a new decor
 */
export const createDecor = async (req, res) => {
  const { name, arFileUrl, colors, created_by, profilePic } = req.body;

  try {
    // Validate that the creator exists
    const user = await User.findById(created_by);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID for created_by' });
    }

    // Create a new decor
    const decor = new Decor({
      name,
      arFileUrl,
      colors,
      created_by,
    });

    await decor.save();
    res.status(201).json({ message: 'Decor created successfully', decor });
  } catch (error) {
    console.error('Error creating decor:', error);
    res.status(500).json({ message: 'Failed to create decor' });
  }
};

/**
 * Update a decor
 */
export const updateDecor = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // If updating created_by, validate the new user
    if (updates.created_by) {
      const user = await User.findById(updates.created_by);
      if (!user) {
        return res.status(400).json({ message: 'Invalid user ID for created_by' });
      }
    }

    const decor = await Decor.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!decor) {
      return res.status(404).json({ message: 'Decor not found' });
    }
    res.status(200).json({ message: 'Decor updated successfully', decor });
  } catch (error) {
    console.error('Error updating decor:', error);
    res.status(500).json({ message: 'Failed to update decor' });
  }
};

/**
 * Delete a decor
 */
export const deleteDecor = async (req, res) => {
  const { id } = req.params;

  try {
    const decor = await Decor.findByIdAndDelete(id);
    if (!decor) {
      return res.status(404).json({ message: 'Decor not found' });
    }
    res.status(200).json({ message: 'Decor deleted successfully' });
  } catch (error) {
    console.error('Error deleting decor:', error);
    res.status(500).json({ message: 'Failed to delete decor' });
  }
};
