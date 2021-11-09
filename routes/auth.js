// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


// api/auth

// Obteniendo el usuario autenticado
router.get('/',
    auth,
    [
        check('email','Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    authController.usuarioAutenticado
);

// Inicion sesion
router.post('/',
    [
        check('email','Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
);

module.exports = router;