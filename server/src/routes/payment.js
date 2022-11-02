const { Router } = require("express");
const mercadopago = require("mercadopago");
const { Sales, Ownership, User } = require("../db.js");
const nodemailer = require("nodemailer");
const ACCES_TOKEN = "TEST-7893132721883360-101817-34c31b28ae790652f296a05af3cf9adf-1078900971";

mercadopago.configure({
  access_token: ACCES_TOKEN,
});

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "enzo.ulloa.i@gmail.com",
    pass: "koywxiscacvjrugy",
  },
});

const buyPending = {
  from: "'Henry Inmobiliaria' <henryinmobiliaria@gmail.com>",
  to: "enzo.ulloa.i@gmail.com",
  subject: `Gracias por registrarte en Henry Inmobiliaria`,
  text: `Bienvenido Pepe a Henry Inmobiliaria, su registro fue completado con exito`,
  html: `<p style="text-align:center;">Bienvenido Pepe a Henry Inmobiliaria, su registro fue completado con exito</p>
    </br>
    <div style="text-align:center;">
    <img src="https://isewa.org.in/wp-content/uploads/2021/06/success.gif" alt="thanks!" />
    </div>`,
};

const router = Router();
// let paymentId = '';

router.post("/", async (req, res) => {
  const product = req.body;
  console.log(product);
  try {
    const response = await mercadopago.preferences.create(product);
    // console.log(response);
    const productId = response.body.id;
    res.send({ productId });
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/paymentId/:id/:idUser", async (req, res) => {
  const body = req.body;
  const ownershipId = parseInt(req.params.id);
  const idUser = req.params.idUser;
  try {
    console.log(body);
    if (body.data) {
      let paymentId = body.data.id;
      console.log(paymentId);
      const ownership = await Ownership.findOne({ where: { id: ownershipId } });
      const user = await User.findOne({ where: { id: idUser } });
      if (ownership) {
        const newSale = await Sales.create({
          name: "Pending...",
          paymentId,
          state: "pending",
          state_detail: "pending",
        });
        // console.log(newSale);
        // const ownershipNewSale = await ownership.addSales({
        //     name: newSale.dataValues.name,
        //     paymentId: newSale.dataValues.paymentId,
        //     state: newSale.dataValues.state,
        //     state_detail: newSale.dataValues.state_detail,
        // });
        // console.log(ownershipNewSale);
        const ownershipNewSale = await newSale.addOwnership(ownership.id);
        const userSale = await user.addSales(newSale.id);
        console.log(await User.findOne({ where: { id: user.id }, include: { model: Sales } }));
      }
      return res.send("Ok, me estás pasando la data, seguí asi...");
    }
    return res.status(400).send("No me estás pasando la data...");
  } catch (error) {
    console.log(error);
  }
});

router.get("/paymentId/:id/:userId", async (req, res) => {
  const ownershipId = req.params.id;
  const userId = req.params.userId;
  console.log(ownershipId);
  try {
    // const response = await Ownership.findOne({
    //     where: {id: ownershipId},
    //     include: {
    //         model: Sales,
    //         attributes: ['paymentId'],
    //         through: {
    //             attributes: []
    //         }
    //     }
    // });
    // console.log(response);
    const sales = await Sales.findAll({ include: { model: Ownership, where: { id: ownershipId } } });
    console.log(sales);
    const paymentId = sales[0].dataValues.paymentId;
    const user = await User.findOne({ where: { id: userId }, include: { model: Sales } });
    // const ownership = sales.
    res.send(paymentId);
  } catch (error) {
    console.log(error);
  }
});

router.put("/editSale", async (req, res) => {
  const { state, state_detail, paymentId } = req.body;
  console.log(state, state_detail, paymentId);

  try {
    const sale = await Sales.findAll({ where: { paymentId: `${paymentId}` } });

    if (sale.length) {
      const updatedSale = await sale[0].update({
        name: "wow",
        state: state,
        state_detail: state_detail,
      });
      const user = await Sales.findOne({ where: { paymentId: `${paymentId}` }, include: [{ model: User }, { model: Ownership }] });
      console.log(user);
      const client = user.Users[0].dataValues;
      console.log(user.Ownerships[0].dataValues);
      const ownership = user.Ownerships[0].dataValues;

      const buyPending = {
        from: "'Henry Inmobiliaria' <henryinmobiliaria@gmail.com>",
        to: `${client.email}`,
        subject: `Pago en proceso - Henry Inmobiliaria`,
        text: `Su pago esta siendo procesado, en breve le notificaremos estado final de su compra`,
        html: `<p style="text-align:center;">Su pago esta siendo procesado, en breve le notificaremos estado final de su compra, muchas gracias!!</p>`,
      };

      const buySuccess = {
        from: "'Henry Inmobiliaria' <henryinmobiliaria@gmail.com>",
        to: `${client.email}`,
        subject: `Seña exitosa - Henry Inmobiliaria`,
        text: `Felicitaciones, su seña fue exitosa !!`,
        html: `<p style="text-align:center;">Felicitaciones, su compra fue exitosa !!</p>
        </br>
         <h2>Recibo de pago</h2>
         <p>Importe: ${ownership.price} </p>
         <p>Estado de pago: ${state}</p>
         <p>Detalle del pago: ${state_detail}</p>
         <p>Id del pago: ${paymentId}</p>
         <p>Fecha: ${Date.now()}</p>
        </br>
        <div style="text-align:center;">
        <img src="https://isewa.org.in/wp-content/uploads/2021/06/success.gif" alt="thanks!" />
        </div>`,
      };

      if (state === "pending") {
        const pending = await transport.sendMail(buyPending);
        console.log("message send", pending);
      } else if (state === "approved") {
        const succes = await transport.sendMail(buySuccess);
        console.log("message send", succes);
      }
      return res.send("Venta actualizada!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha ocurrido un error, la venta no pudo ser actualizada...");
  }
});

router.get("/getSales/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log(userId);
  try {
    if (userId) {
      const sale = await Sales.findAll({
        include: [
          {
            model: Ownership,
          },
          {
            model: User,
            where: {
              id: userId,
            },
          },
        ],
      });
      return res.send(sale);
    }
    console.log("no entró al if");
    const sales = await Sales.findAll({ include: [{ model: Ownership }, { model: User }] });
    return res.send(sales);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createSales/:id/:userId", async (req, res) => {
  const body = req.body;
  const propId = parseInt(req.params.id);
  const userId = req.params.userId;
  try {
    if (body.data) {
      let paymentId = body.data.id;
      console.log(paymentId);
      const ownership = await Ownership.findOne({ where: { id: propId } });
      const user = await User.findOne({ where: { id: userId } });
      if (ownership && user) {
        const newSale = await Sales.create({
          name: "Pending...",
          paymentId,
          state: "pending",
          state_detail: "pending",
        });
        const ownershipNewSale = await newSale.addOwnership(ownership.id);
        const userSale = await user.addSales(newSale.id);
        console.log(await User.findOne({ where: { id: user.id }, include: { model: Sales } }));
        // const ownershipNewSale = await newSale.addOwnership(ownership.id);
        // console.log(ownershipNewSale);
      }
      return res.send("Ok, me estás pasando la data, seguí asi...");
    }
    return res.status(400).send("No me estás pasando la data...");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
