require("dotenv").config();
const path = require("path");

/** @type {import('kanel').Config} */
module.exports = {
    connection: {
        connectionString: process.env.DATABASE_URL, // must be inside an object
    },
    preDeleteOutputFolder: true,
    outputPath: "./schemas",
    customTypeMap: {
        "pg_catalog.tsvector": "string",
        "pg_catalog.bpchar": "string",
    },
};