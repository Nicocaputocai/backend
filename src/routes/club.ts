import {Router} from 'express'
import { ClubController } from '../controller/ClubController';
import { ClubService } from '../services/clubService';

export const router = Router();

//Router depende del controlador
//Al controlador se le pasa por argumento una instancia de ClubService, para que funcione el controller correctamente.
const controller = new ClubController(
    new ClubService()
    );

router.get('/', controller.getAll);
//router.post('/create', clubController.create)

export default router;