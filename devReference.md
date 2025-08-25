# NVRAGDB - Developer Reference

NVRAGDB is a **non-vectorized RAG database** using **MongoDB + Express.js**.  
It stores **hierarchical, relational data** and supports **cache-first retrieval**.

---

## Overview

- Data structure:  
  `DataID`, `Data`, `Links`, `Hs` (Hierarchy), `Ts` (Tags), `CachesTable` (bool), `Values` (0–10)
- Retriever: fetch full data by `DataID` (updates cache, increments `Values`)
- Finder: search `DataID`s by `Tags`, `Hs`, or `Links` (cache-first)
- Cache stored in `cache.json`, sorted by `Values`

---

## Folder Structure

NVRAGDB/
├── DBconfig/ # MongoDB schema & connection
├── Retriever/ # retrieve.js
├── Finder/ # finder.js
├── cacheTable/ # cache.json
├── serverRa.js # Express API server
└── .env # MongoDB URI & port


---

## Setup

1. Install dependencies:
```bash
npm install express mongoose dotenv


Configure .env:

MONGO_URI=<mongodb_uri>
PORT=5000

Start Server 
node serverRa.js


API Endpoints

POST /retrieve
{ "DataIDs": ["id1","id2"] }

POST /find
{ "tags":["tag1"], "hs":["human"], "links":["id2"] }


