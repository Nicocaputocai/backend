import { Request, Response } from 'express';
import { CensusTreeService } from '../services/censusTreeService';
import { CensusTreeInterface } from '../interfaces/CensusTree';

interface CensusTreeResponse {
    type: string;
    features: CensusTreeInterface | Array<CensusTreeInterface> | null;
    total: number;
    message: string;
}

//Depende del ClubService, el controlador solo se debe encargar de definir que se le va a mostrar al usuario,
//Se aplica inyección de dependencias:
//La idea es que NO se cree una instancia de la clase ClubService, solo se definen los nombres de los metodos
export class CensusTreeController {
    constructor(
        private readonly censusTreeService: CensusTreeService,
    ){}

    async getAll(req:Request,res:Response):Promise<Response<CensusTreeResponse>>{
        try {
            const features = await this.censusTreeService.getAll();
            if(features.length === 0){
                return res.status(404).json(
                    {
                        "type": "FeatureCollection",
                        "features":[],
                        "total": 0,
                        "message": "Aún no hay arboles censados"
                    }
                );
            }
            return res.status(200).json(
                {
                    "type": "FeatureCollection",
                    "features":features,
                    "total": features.length,
                    "message": "Todos los árboles censados"
                }
            );
        } catch (error:any) {
            return res.status(500).json({
                "type": "FeatureCollection",
                "features":[],
                "total": 0,
                "message": error.message
            })
        }
    }
    async create(req:Request,res:Response):Promise<Response<CensusTreeResponse>>{
        try {
            const censusTree = await this.censusTreeService.create(req.body);
            if(censusTree instanceof Error){
                return res.status(400).json({
                    "type": "FeatureCreation",
                    "features": null,
                    "total": 0,
                    "message": censusTree.message
                })
            }
            return res.status(201).json({
                "type": "FeatureCreation",
                "features": censusTree,
                "total": 1,
                "message": "árbol censado"
            })
        } catch (error:any) {
            return res.status(500).json({
                "type": "FeatureCreation",
                "features": null,
                "total": 0,
                "message": error.message
            })
        }
    }
}

/* module.exports = {
    doc: function(req,res) {
        res.send({message:'Los campos obligatorios son: name => nombre del club; address => Calle; Height => altura; type => Point; coordenates => primero latitud y luego longitud ej: -58.3957713,-34.7233359, solo separados por una coma, sin espacios'})
    },
} */