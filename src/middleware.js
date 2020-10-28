const jwt = require('jsonwebtoken');

class Middleware{
    validarToken(req, res, next) {
        try {        
        const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);        
        if(payload){
            return next()
        }
        } catch (err) {
            res.status(403).json('Sin autorización, esta petición requiere de log-in.');
        }
        
    }
    validarAdmin(req, res, next){
        const payload = jwt.verify(req.headers.authorization.split(' ')[1], process.env.S);
        if(payload.rol === 1){            
            return next();
        }else{
            console.error('No posee los permisos de administrador');
            res.status(403).json('La petición requeire del rol administrador');
        }
    }
}

module.exports = Middleware;