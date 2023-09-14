const express = require('express');
const app = express();
const pets = require('./petList'); // Import your pet data from petList.js

// Root route
app.get('/', (req, res) => {
  const html = `
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
      <li><a href="/animals/dogs">Dogs</a></li>
      <li><a href="/animals/cats">Cats</a></li>
      <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
  `;
  res.send(html);
});

// Dynamic route for animal types
app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  const petList = pets[petType];

  if (!petList) {
    res.send(`<h1>Invalid pet type: ${petType}</h1>`);
    return;
  }

  const html = `
    <h1>List of ${petType}</h1>
    <ul>
      ${petList.map((pet, index) => `
        <li>
          <a href="/animals/${petType}/${index}">
            ${pet.name}
          </a>
        </li>
      `).join('')}
    </ul>
  `;

  res.send(html);
});

// New route for individual pet profiles
app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;
  const petList = pets[petType];

  if (!petList) {
    res.send(`<h1>Invalid pet type: ${petType}</h1>`);
    return;
  }

  // Search for the specific pet based on petId
  const findPet = petList[petId];

  if (!findPet) {
    res.send(`<h1>Invalid pet ID: ${petId}</h1>`);
    return;
  }

  const html = `
    <h1>${findPet.name}</h1>
    <img src="${findPet.url}" alt="${findPet.name}" width="300">
    <p>${findPet.description}</p>
    <ul>
      <li>breed: ${findPet.breed}</li>
      <li>age: ${findPet.age}</li>
    </ul>
  `;

  res.send(html);
});

// Bind the server to port 8000
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});