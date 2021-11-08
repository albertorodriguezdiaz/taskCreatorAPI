const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


// api/tareas

// Obtener todas las tareas
router.get('/',
    auth,
    tareasController.obtenerTareas
);


// Crear tarea
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
);

// actualizar tareas via ID
router.put('/:id',
    auth,
    tareasController.actualizarTarea
);

// eliminar tareas via ID
router.delete('/:id',
    auth,
    tareasController.eliminarTarea
);


module.exports = router;