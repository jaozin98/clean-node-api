export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/curso-node-api',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5h',
};
