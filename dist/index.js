"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source"); // Utilise l'importation nommée
const app = (0, express_1.default)();
const PORT = 3000;
// Connect to the database
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Connected to PostgreSQL!");
    // Start the server only after DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to the database", error);
});
