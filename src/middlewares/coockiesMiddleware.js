// Define el middleware de cookies
const cookiesMiddleware = (req, res, next) => {
    const sessionId = req.cookies.sessionId; // Asegúrate de ajustar el nombre de la cookie según tu configuración

    if (sessionId) {
        // Realiza la lógica para verificar y cargar la sesión del usuario según la cookie
        db.User.findOne({ where: { sessionId: sessionId } })
            .then((user) => {
                if (user) {
                    req.session.userLogged = user; // Establece el usuario en la sesión
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    next();
};

module.exports = cookiesMiddleware;
  
  