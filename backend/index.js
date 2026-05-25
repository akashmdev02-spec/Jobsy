const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // 👈 Make sure this line is written exactly here!

// Now it is safe to apply configurations:
app.use(cors({ origin: '*' }));
app.use(express.json());
