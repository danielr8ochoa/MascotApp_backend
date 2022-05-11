import express from 'express';
const router = express.Router();

import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPassword,
    actualizarPerfil
} from '../controllers/veterinarioController.js'
import checkAuth from '../middleware/authMiddleware.js';

// Área pública
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);

// En la misma ruta se comprueba el token e ingresa el nuevo password, una función
// requiere método GET y otra POST, así se simplifica en una línea con Express.
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Área privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword )

export default router;