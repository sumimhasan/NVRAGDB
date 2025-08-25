const DataModel = require('../DBconfig/DB');
const fs = require('fs');
const cachePath = './cacheTable/cache.json';

function loadCache() {
  return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
}

function saveCache(cache) {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

async function retrieveData(dataIDs = []) {
  let cache = loadCache();
  let results = [];

  // Check cache first
  dataIDs.forEach(id => {
    const cached = cache.find(c => c.DataID === id);
    if (cached) results.push(cached);
  });

  // Fetch remaining from DB
  const missingIDs = dataIDs.filter(id => !results.find(r => r.DataID === id));
  if (missingIDs.length) {
    const dbResults = await DataModel.find({ DataID: { $in: missingIDs } });
    results = results.concat(dbResults);

    // Update cache with new entries
    dbResults.forEach(item => {
      const index = cache.findIndex(c => c.DataID === item.DataID);
      if(index === -1) {
        cache.push({...item.toObject(), CachesTable: true});
      }
    });
    saveCache(cache);
  }

  // Increment Values for cache
  results.forEach(item => {
    if(item.Values < 10) item.Values += 1;
  });
  saveCache(cache);

  return results;
}

module.exports = retrieveData;
