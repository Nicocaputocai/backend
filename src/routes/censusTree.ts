import {Router} from 'express'
import { CensusTreeController } from '../controller/CensusTreeController';
import { CensusTreeService } from '../services/censusTreeService';
import uploadImg from '../middlewares/uploadImg.ts'

export const router = Router();

//Router depende del controlador
//Al controlador se le pasa por argumento una instancia de ClubService, para que funcione el controller correctamente.
const controller = new CensusTreeController(
    new CensusTreeService()
    );

router.get('/', controller.getAll);
//router.post('/create', uploadImg,clubContr

export default router;