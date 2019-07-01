const express = require("express");
const routes = express.Router();
const authMiddleware = require("./app/middlewares/auth");

const controllers = require("./app/controllers");

routes.post("/users", controllers.UserController.store);
routes.post("/sessions", controllers.SessionController.store);

/*
 * Rota para testa validação do token (pode ser deletado)
 */
// routes.get("/teste", authMiddleware, (req, res) => res.json({ ok: true }));

/*
 * Configura o express com um middleware para todas as rotas
 * A partir da qui, todas as rotas passam por esse middleware que valida o token
 */
routes.use(authMiddleware);

/*
 * Rotas para o model Ad
 */
routes.get("/ads", controllers.AdController.index);
routes.get("/ads/:id", controllers.AdController.show);
routes.post("/ads", controllers.AdController.store);
routes.put("/ads/:id", controllers.AdController.update);
routes.delete("/ads/:id", controllers.AdController.destroy);

module.exports = routes;
