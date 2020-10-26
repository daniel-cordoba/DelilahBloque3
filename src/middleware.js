const sequelize = require('./conexion');
const jwt = require('jsonwebtoken');

class Middleware{
    validarToken(req, res, next) {
        try {
        console.log(req.headers.authorization);
        const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
        console.log(payload);
        if(payload){
            return next()
        }
        } catch (err) {
            res.status(401).json('Sin autorización, esta petición requiere del uso de un Token.');
        }
        
    }
    validarAdmin(req, res, next){
        console.log(req.headers.authorization);
        const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
        if(payload.rol === 1){
            console.log('ud es administrador');
            return next();
        }else{
            console.error('No posee los permisos de admin');
            res.status(401).json('Necesita privilegios de administrador para esta peticion.');
        }
    }
}

module.exports = Middleware;