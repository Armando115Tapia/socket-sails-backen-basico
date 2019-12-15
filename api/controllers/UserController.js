/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser: async function(req, res) {
    let nombre = req.param("nombre") || "user001";
    console.log("El nombre: ", nombre);
    const userCreado = await User.create({ name: nombre }).fetch();

    if (userCreado) {
      // SE MANDA EL SOCKET
      sails.sockets.blast("user_logged_in", { userCreado }, req);
    } else {
      // SALE ALGUN ERROR
      return res.status(400).send({ msm: "Problemas al crear el socket" });
    }

    // sails.sockets.broadcast("artsAndEntertainment", { greeting: "Hola!" });
    return res.status(200).send({ msm: "Enviado en broadcast" });
  }
};
