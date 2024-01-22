import { Request, Response } from 'express';
import { ClubService } from '../services/clubService';
import { ClubInterface } from '../interfaces/club';

interface ClubResponse {
    type: string;
    features: ClubInterface | Array<ClubInterface> | null;
    total: number;
    message: string;
}

//Depende del ClubService, el controlador solo se debe encargar de definir que se le va a mostrar al usuario,
//Se aplica inyección de dependencias:
//La idea es que NO se cree una instancia de la clase ClubService, solo se definen los nombres de los metodos
export class ClubController {
    constructor(
        private readonly clubService: ClubService,
    ){}

    async getAll(req:Request,res:Response):Promise<Response<ClubResponse>>{
        try {
            const features = await this.clubService.getAll();
            if(features.length === 0){
                return res.status(404).json(
                    {
                        "type": "FeatureCollection",
                        "features":[],
                        "total": 0,
                        "message": "Aún no hay clubes cargados"
                    }
                );
            }
            return res.status(200).json(
                {
                    "type": "FeatureCollection",
                    "features":features,
                    "total": features.length,
                    "message": "Todos los clubes"
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
    async create(req:Request,res:Response):Promise<Response<ClubResponse>>{
        try {
            const club = await this.clubService.create(req.body);
            if(club instanceof Error){
                return res.status(400).json({
                    "type": "FeatureCreation",
                    "features": null,
                    "total": 0,
                    "message": club.message
                })
            }
            return res.status(201).json({
                "type": "FeatureCreation",
                "features": club,
                "total": 1,
                "message": "Club creado"
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