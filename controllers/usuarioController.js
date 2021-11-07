const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);


        // Hashear el password
        // ( salt ) crea un hash diferente para passwords iguales
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        // Guardar usuario
        await usuario.save();

        // Mensaje de confirmacion
        res.json({ msg: 'El usuario fue creado exitosamente'});

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}