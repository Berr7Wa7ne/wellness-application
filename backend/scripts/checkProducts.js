// scripts/checkProducts.js
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

console.log('Checking products...');

mongoose.connect('mongodb+srv://cosyberry3:Valor0147%24@prod-cluster.1zk3dpy.mongodb.net/wellness-app?retryWrites=true&w=majority&appName=prod-cluster&ssl=true&connectTimeoutMS=30000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return checkProducts();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

async function checkProducts() {
  try {
    console.log('Fetching products...');
    const products = await Product.find({});
    console.log(`Found ${products.length} products\n`);
    
    // Group by name to find duplicates
    const nameGroups = {};
    products.forEach(product => {
      if (!nameGroups[product.name]) {
        nameGroups[product.name] = [];
      }
      nameGroups[product.name].push(product);
    });
    
    // Show all products grouped by name
    Object.entries(nameGroups).forEach(([name, productList]) => {
      console.log(`"${name}" (${productList.length} products):`);
      productList.forEach(product => {
        console.log(`  - ID: ${product._id}, Slug: "${product.slug}", Category: ${product.category}`);
      });
      console.log('');
    });
    
  } catch (err) {
    console.error('Error checking products:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
} 