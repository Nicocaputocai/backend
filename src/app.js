const express = require('express');
const bodyParser = require('body-parser');
const App = express();
const cors = require('cors');

const Api = require('./routes/Api.js');
const Trees = require('./routes/trees.js')
const CensusTree = require("./routes/censusTree.js")

App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: true}));
App.use(express.static(__dirname + '/public'));

App.use('/api', Api);
App.use('/api/trees', Trees)
App.use('/api/censusTrees', CensusTree)


module.exports = App