const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const educatorRoutes = require('./routes/resource');

require('dotenv').config();

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/educator', educatorRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
