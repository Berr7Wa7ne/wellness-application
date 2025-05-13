const { PrismaClient } = require('../src/generated/client'); // or adjust based on where your generated client is located
const prisma = new PrismaClient();


module.exports = prisma;
