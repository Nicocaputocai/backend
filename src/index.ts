import express from 'express';
import cors from 'cors'
import clubRouter from './routes/censusTree';
const Api = require('./routes/Api.js');
const Education = require('./routes/education.js');
const Health = require('./routes/health.js');
const Security = require('./routes/security.js');
const Transport = require('./routes/transport.js');
const MunicipalDependence = require('./routes/municipalDep.js')
const SquarePark = require('./routes/square&park.js')
const PublicWork = require('./routes/publicWork.js')

//Al ejecutar una funcion dentro del constructor, te aseguras de que esta se ejecute cada vez que se instancie la clase App
export class App {
    app: express.Application;
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    listen(port: number){
        this.app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`)
        })
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true})) //Si va a haber formularios en este servidor tiene que ir true
        this.app.use(express.static(__dirname + '/public'));
    }
    routes(){
        this.app.use('/api', Api)
        this.app.use('/api/club', clubRouter)
        this.app.use('/api/education', Education)
        this.app.use('/api/health', Health)
        this.app.use('/api/security', Security)
        this.app.use('/api/square-park', SquarePark)
        this.app.use('/api/transport', Transport)
        this.app.use('/api/municipalDependence', MunicipalDependence)
        this.app.use('/api/publicWork', PublicWork)
    }
}