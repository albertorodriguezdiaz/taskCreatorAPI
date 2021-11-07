const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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

        // Crear y firmnar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1hora
        }, (error, token) => {
           
            if(error) throw error;

            // Mensaje de confirmacion
            console.log(token);
            res.json({ token: token, msg:'Usuario creado correctamente'});
           
        });

        // Mensaje de confirmacion
        // res.json({ msg: 'El usuario fue creado exitosamente'});

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}