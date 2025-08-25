const express = require('express');
const retrieveData = require('./Retriever/retrieve');
const findData = require('./Finder/finder');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/retrieve', async (req, res) => {
  try {
    const { DataIDs } = req.body;
    if(!DataIDs || !Array.isArray(DataIDs)) {
      return res.status(400).json({ error: "DataIDs must be an array" });
    }
    const data = await retrieveData(DataIDs);
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/find', async (req, res) => {
  try {
    const { tags = [], hs = [], links = [] } = req.body;
    const dataIDs = await findData({ tags, hs, links });
    res.json(dataIDs);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[INFO] Server running on port ${PORT}`));
