import { ClubInterface } from '../interfaces/club'
import {Club} from '../models'

// Depende del modelo Club, acá va toda la lógica relacionada a Club
export class ClubService {
    constructor(
        private readonly club = Club
    ){}

    async getAll(){
        return await this.club.find({})
    }
    async create(club: ClubInterface){
        /* Esto ya debe ser enviado como array de números */
        /* let values =club.geometry.coordinates.split(",")
        let v1 = parseFloat(values[0])
        let v2 = parseFloat(values[1]) */
        /* Hay que validar si se repite el nombre, si ya existe el id */
        try {
            const newClub = new this.club(club)
            await newClub.save()
            return newClub
        } catch (error) {
            return error
        }
    }
}