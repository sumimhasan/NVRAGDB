# NVRAGDB

**NVRAGDB** is a lightweight **non-vectorized RAG database** built with **MongoDB + Express.js**.  
It stores hierarchical, relational data and supports **cache-first retrieval** for fast access.

---

NVRAGDB/
├── DBconfig/       # MongoDB schema & connection
├── Retriever/      # retrieve.js
├── Finder/         # finder.js
├── cacheTable/     # cache.json
├── serverRa.js     # Express API server
└── .env            # MongoDB URI & port


## Features

- Retrieve full data by `DataID`
- Search by tags, hierarchy (`Hs`), or links
- Cache frequently used entries for faster queries
- Tracks usage frequency (`Values`) automatically

---

## Quick Start

1. Install dependencies:
```bash
npm install

2.Setup .env:
MONGO_URI=mongodb://localhost:27017/nvragdb
PORT=5000


3.Start server:

node serverRa.js


API INFO
1.POST /retrieve
----{ "DataIDs": ["id1","id2"] }
2.POST /find
----{ "tags":["tag1"], "hs":["human"], "links":["id2"] }




