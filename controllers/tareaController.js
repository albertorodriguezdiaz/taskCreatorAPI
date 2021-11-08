// const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto')
const Tarea = require('../models/Tarea')
const {validationResult} = require('express-validator');



exports.crearTarea = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    
    try {
         
        // Extraer el proyecto
        const {proyecto} = req.body;
        
        // revisar el id
        const existeProyecto = await Proyecto.findById(proyecto);

        // Si el proyecto existe o no
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
        
       

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error en crear tareas');
    }

}




exports.obtenerTareas = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    
    try {
         
        // Extraer el proyecto
        const {proyecto} = req.body;
        
        // revisar el id
        const existeProyecto = await Proyecto.findById(proyecto);

        // Si el proyecto existe o no
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la tarea
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});
        
        
       

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error al mostrar tareas');
    }

}




exports.actualizarTarea = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    
    try {
         
        // Extraer el proyecto
        const {proyecto, nombre, estado} = req.body;


        // Extrae la tarea
        const tarea = await Tarea.findById(req.params.id);
        // Si el proyecto existe o no
        if (!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }


        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        // Si el proyecto existe o no
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }


        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Crear objeto con la nueva informacion
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;



        // Guardar la tarea
        const tareas = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({tareas});
        
        
       

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error al actualizar tareas');
    }

}





exports.actualizarTarea = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    
    try {
         
        // Extraer el proyecto
        const {proyecto, nombre, estado} = req.body;


        // Extrae la tarea
        const tarea = await Tarea.findById(req.params.id);
        // Si el proyecto existe o no
        if (!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }


        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        // Si el proyecto existe o no
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }


        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Crear objeto con la nueva informacion
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;



        // Guardar la tarea
        const tareas = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        res.json({tareas});
        
        
       

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error al actualizar tareas');
    }

}





exports.eliminarTarea = async (req, res) => {

    try {
         
        // Extraer el proyecto
        const {proyecto, nombre, estado} = req.body;

        // Extrae la tarea
        const tarea = await Tarea.findById(req.params.id);
        // Si el proyecto existe o no
        if (!tarea) {
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        // Si el proyecto existe o no
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'});
        }


        // Eliminar
        // Eliminar el Tarea
        await Tarea.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Tarea eliminada '})



    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error al eliminar la tarea');
    }

}


