import { CensusTreeInterface } from '../interfaces/CensusTree'
import {CensusTree} from '../models'

// Depende del modelo Club, acá va toda la lógica relacionada a Club
export class CensusTreeService {
    constructor(
        private readonly tree = CensusTree
    ){}

    async getAll(){
        return await this.tree.find({})
    }
    async create(tree: CensusTreeInterface){
        /* Esto ya debe ser enviado como array de números */
        /* let values =club.geometry.coordinates.split(",")
        let v1 = parseFloat(values[0])
        let v2 = parseFloat(values[1]) */
        /* Hay que validar si se repite el nombre, si ya existe el id */
        try {
            const newTree = new this.tree(tree)
            await newTree.save()
            return newTree
        } catch (error) {
            return error
        }
    }
}