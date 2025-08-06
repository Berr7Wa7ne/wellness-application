// scripts/addSlugsToProducts.js
const mongoose = require('mongoose');
const slugify = require('slugify');
const Product = require('../src/models/Product');

console.log('Starting slug generation script...');

mongoose.connect('mongodb+srv://cosyberry3:Valor0147%24@prod-cluster.1zk3dpy.mongodb.net/wellness-app?retryWrites=true&w=majority&appName=prod-cluster&ssl=true&connectTimeoutMS=30000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return addSlugs();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

async function addSlugs() {
  try {
    console.log('Fetching products...');
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    
    // Create a map to track used slugs
    const usedSlugs = new Map();
    
    let updatedCount = 0;
    for (const product of products) {
      let newSlug = slugify(product.name, { lower: true, strict: true });
      
      // Always add product ID to ensure uniqueness
      const productIdSuffix = product._id.toString().slice(-6);
      newSlug = `${newSlug}-${productIdSuffix}`;
      
      // Update the product with the new slug
      product.slug = newSlug;
      await product.save();
      console.log(`Updated product: "${product.name}" -> "${newSlug}"`);
      updatedCount++;
    }
    
    console.log(`\nScript completed! Updated ${updatedCount} products.`);
  } catch (err) {
    console.error('Error in addSlugs:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}