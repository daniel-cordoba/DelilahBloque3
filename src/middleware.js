const jwt = require('jsonwebtoken');
const sequelize = require('./conexion')

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

    existeProducto(req, res, next){
        const ID = req.body.accion_ID;
        const consulta = 'SELECT ID FROM menu WHERE ID = '+ID+';';
        sequelize.query(consulta).then(resp=>{
            console.log(typeof(resp[0][0]));
            if (typeof(resp[0][0]) === "undefined") {
                res.status(404).json('Producto no encontrado')
            }else{
                return next();
            }
        }).catch(err=>{
            console.error(err);
        })
    }

    existePedido(req, res, next){
        const ID = req.body.ID;
        const consulta = 'SELECT ID FROM pedidos WHERE ID = '+ID+';';
        sequelize.query(consulta).then(resp=>{
            console.log(typeof(resp[0][0]));
            if (typeof(resp[0][0]) === "undefined") {
                res.status(404).json('Pedido no encontrado')
            }else{
                return next();
            }
        }).catch(err=>{
            console.error(err);
        })
    }
}

module.exports = Middleware;