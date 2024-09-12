import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { cloudinary, storage } from './cloudconfig.js'; // Adjust import if needed

// Initialize the router
const router = express.Router();

// Multer configuration for Cloudinary
const upload = multer({ storage });

// Image model
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Get the image URL from Cloudinary
    const imageUrl = req.file.path;

    // Save the URL to MongoDB
    const newImage = new Image({ url: imageUrl });
    await newImage.save();

    res.status(200).json({ message: 'Image uploaded successfully!', url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Route to fetch all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images.map(img => img.url));
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an image by URL
router.delete('/delete', async (req, res) => {
  const { imageUrl } = req.body;
  
  try {
    // Find and remove the image with the specified URL
    const result = await Image.deleteOne({ url: imageUrl });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Image deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No image found with the given URL.' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
