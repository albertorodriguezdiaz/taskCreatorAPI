const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// api/proyectos

// Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);


// Crear proyecto
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// actualizar proyecto via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El Nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// actualizar proyecto via ID
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);


module.exports = router;