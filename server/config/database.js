require('dotenv').config();

export default {
  hrPool: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
