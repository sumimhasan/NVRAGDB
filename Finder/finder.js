const DataModel = require('../DBconfig/DB');
const fs = require('fs');
const cachePath = './cacheTable/cache.json';

function loadCache() {
  return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
}

async function findData({ tags = [], hs = [], links = [] }) {
  const cache = loadCache();

  // Search cache first
  let cachedResults = cache.filter(d =>
    (tags.length && tags.some(t => d.Ts.includes(t))) ||
    (hs.length && hs.some(h => d.Hs.includes(h))) ||
    (links.length && links.some(l => d.Links.includes(l)))
  );

  const cachedIDs = cachedResults.map(r => r.DataID);

  // Build safe DB query
  const orConditions = [];
  if(tags.length) orConditions.push({ Ts: { $in: tags } });
  if(hs.length) orConditions.push({ Hs: { $in: hs } });
  if(links.length) orConditions.push({ Links: { $in: links } });

  let dbResults = [];
  if(orConditions.length) {
    dbResults = await DataModel.find({
      DataID: { $nin: cachedIDs },
      $or: orConditions
    });
  }

  return cachedResults.concat(dbResults).map(r => r.DataID);
}

module.exports = findData;
