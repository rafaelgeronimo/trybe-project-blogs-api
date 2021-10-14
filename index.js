const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userController = require('./controllers/userController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));