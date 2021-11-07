const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const conectarDB = async () => {
      try {
        
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        });

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
        process.exit(1); // Etener APP
    }

}

module.exports = conectarDB;