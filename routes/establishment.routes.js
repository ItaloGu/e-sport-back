const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");
const EstablishmentModel = require("../models/Establishment.model");
const salt_rounds = 10;

// Upload
router.post(
  "/upload",
  isAuthenticated,
  uploader.single("picture"),
  (req, res) => {
    if (!req.file) {
      return res.status(500).json({ msg: "Upload de arquivo falhou." });
    }

    return res.status(201).json({ url: req.file.path });
  }
);

//CRUD

// Crud (CREATE) - HTTP POST
// Criar um novo estabelecimento
router.post("/signup", async (req, res) => {
  // Requisições do tipo POST tem uma propriedade especial chamada body, que carrega a informação enviada pelo cliente

  try {
    // Recuperar a senha que está vindo do corpo da requisição
    const { password } = req.body;

    // Verifica se a senha não está em branco ou se a senha não é complexa o suficiente
    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      // O código 400 significa Bad Request
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    // Gera o salt
    const salt = await bcrypt.genSalt(salt_rounds);

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, salt);

    // Salva os dados de usuário no banco de dados (MongoDB) usando o body da requisição como parâmetro
    const result = await EstablishmentModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    // Responder o usuário recém-criado no banco para o cliente (solicitante). O status 201 significa Created
    return res.status(201).json(result);
  } catch (err) {
    // O status 500 signifca Internal Server Error
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Extraindo o email e senha do corpo da requisição
    const { email, password } = req.body;

    // Pesquisar esse usuário no banco pelo email
    const establishment = await EstablishmentModel.findOne({ email });

    // Se o usuário não foi encontrado, significa que ele não é cadastrado
    if (!establishment) {
      return res
        .status(400)
        .json({ msg: "This email is not yet registered in our website;" });
    }

    // Verificar se a senha do usuário pesquisado bate com a senha recebida pelo formulário

    if (await bcrypt.compare(password, establishment.passwordHash)) {
      // Gerando o JWT com os dados do usuário que acabou de logar
      const token = generateToken(establishment);

      return res.status(200).json({
        user: {
          name: establishment.name,
          email: establishment.email,
          _id: establishment._id,
          userType: establishment.userType,
        },
        token,
      });
    } else {
      // 401 Significa Unauthorized
      return res.status(401).json({ msg: "Wrong password or email" });
    }
  } catch (err) {
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud (READ) - HTTP GET
// Buscar dados do estabelecimento
router.get("/profile", isAuthenticated, attachCurrentUser, (req, res) => {
  console.log(req.headers);

  try {
    // Buscar o estabelecimento logado que está disponível através do middleware attachCurrentUser
    const loggedInEstablishment = req.currentUser;

    if (loggedInEstablishment) {
      // Responder o cliente com os dados do estabelecimento. O status 200 significa OK
      return res.status(200).json(loggedInEstablishment);
    } else {
      return res.status(404).json({ msg: "Establishment not found." });
    }
  } catch (err) {
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// cRud Read (GET) (Lista)

router.get("/list", isAuthenticated, async (req, res) => {
  try {
    const establishments = await EstablishmentModel.find();

    res.status(200).json(establishments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// cRud ler detalhes da loja
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    // este é o id do estabelecimento para mostrar os detalhes dele
    const establishment = await EstablishmentModel.findOne({
      _id: req.params.id,
    }).populate({
      path: "fields",
      model: "Field",
    });

    if (!establishment) {
      return res.status(404).json({ msg: "Estabelecimento não encontrado." });
    }

    res.status(200).json(establishment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//crUd atualizar estabelecimento
router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    // este é o id do estabelecimento para mostrar os detalhes dele

      const establishment = await EstablishmentModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!establishment) {
        return res.status(404).json({ msg: "Estabelecimento não encontrado." });
      }

      res.status(200).json(establishment);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//curD deletar estabelecimento
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    // este é o id do estabelecimento para mostrar os detalhes dele

      const establishment = await EstablishmentModel.deleteOne({
        _id: req.params.id,
      });

      if (establishment.deletedCount < 1) {
        return res.status(404).json({ msg: "Estabelecimento não encontrado" });
      }

      res.status(200).json({});
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
