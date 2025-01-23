const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    register: function (req, res) {
        const { name, user, password, role } = req.body;

        if (!name || !user || !password || !role) {
            return res.status(400).send({ message: 'Todos los campos son obligatorios' });
        }

        User.findOne({ user })
            .then(existingUser => {
                if (existingUser) return res.status(400).send({ message: 'El usuario ya está registrado' });

                const newUser = new User({ name, user, password, role });
                newUser.save()
                    .then(user => res.status(201).send({ message: 'Usuario registrado exitosamente', user }))
                    .catch(err => res.status(500).send({ message: 'Error al registrar el usuario', error: err.message }));

            })
            .catch(err => res.status(500).send({ message: 'Error al registrar el usuario', error: err.message }));
    },

    login: function (req, res) {

        const secret = process.env.JWT_SECRET;
        const { user, password } = req.body;

        if (!user || !password) {
            return res.status(400).send({ message: 'Todos los campos son obligatorios' });
        }

        User.findOne({ user })
            .then(foundUser => {
                if (!foundUser) return res.status(404).send({ message: 'Usuario no encontrado' });

                foundUser.compararContraseña(password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(401).send({ message: 'Contraseña incorrecta' });

                        const token = jwt.sign({ id: foundUser._id, user: foundUser.user }, secret, { expiresIn: '6h' });
                        return res.status(200).send({ message: 'Inicio de sesión exitoso', token });
                    })
                    .catch(err => res.status(500).send({ err }));
            })
            .catch(err => res.status(500).send({ err }));
    },

    test: function (req, res) {
        return res.status(200).send({ message: 'funcionando' });
        
    }
};
