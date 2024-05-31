const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Définition des fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:` + PORT);
});
