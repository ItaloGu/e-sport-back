const UserModel = require("../models/User.model");
const establishmentModel = require("../models/Establishment.model");

module.exports = async (req, res, next) => {
  try {
    // Ver linha 14 do arquivo isAuthenticated.js
    const loggedInUser = req.user;
    // para selecionar login de pessoa física
    if (req.body.userType === "person") {
      const user = await UserModel.findOne(
        { _id: loggedInUser._id },
        { passwordHash: 0, __v: 0 } // Excluindo o hash da senha da resposta que vai pro servidor, por segurança
      );

      req.currentUser = user;
    }
    // para selecionar login de pessoa juridica
    if (req.body.userType === "establishment") {
      const establishment = await establishmentModel.findOne(
        { _id: loggedInUser._id },
        { passwordHash: 0, __v: 0 } // Excluindo o hash da senha da resposta que vai pro servidor, por segurança
      );

      req.currentUser = establishment;
    }

    if (!user) {
      // 400 significa Bad Request
      return res.status(400).json({ msg: "User does not exist." });
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
