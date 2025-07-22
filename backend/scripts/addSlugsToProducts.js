// scripts/addSlugsToProducts.js
const mongoose = require('mongoose');
const slugify = require('slugify');
const Product = require('../src/models/Product');

mongoose.connect('mongodb+srv://cosyberry3:Valor0147%24@prod-cluster.1zk3dpy.mongodb.net/wellness-app?retryWrites=true&w=majority&appName=prod-cluster&ssl=true&connectTimeoutMS=30000', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

async function addSlugs() {
  const products = await Product.find({ $or: [{ slug: { $exists: false } }, { slug: null }] });
  for (const product of products) {
    product.slug = slugify(product.name, { lower: true, strict: true });
    await product.save();
    console.log(`Updated product: ${product.name} -> ${product.slug}`);
  }
  mongoose.disconnect();
}

addSlugs();