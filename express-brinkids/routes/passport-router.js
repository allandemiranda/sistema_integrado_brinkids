const express = require('express');
const passport = require('../models/passport-models');
const passportServices = require('../models/passport-services-models');
const babyPassportServices = require('../models/babypassport-services-models');
const babyPassport = require('../models/babypassport-models');

const product = require('../models/product-models');
const discount = require('../models/discounts-models');
const birthday = require('../models/birthday-party-models');
const config = require('../config');
const adult = require('../models/adult-models');
const Employees = require('../models/employees-models');


const moment = require('moment');


const Logs = require('../models/logs-models')
const router = express.Router();

const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);
  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;

  console.log("Aqui vem o req.body:");
  console.log(req.body);

  if (req.body.time
    && req.body.price) {

    const data = new passport({
      time: req.body.time,
      price: req.body.price,
    });

    try {
      const newPassport = await data.save();
      const log = new Logs({
        activity: 'Passaporte',
        action: 'Criação',
        dateOperation: new Date(),
        from: funcionario, //ajsuta o id dps de fazer o login funcionar



      })
      const newLog = await log.save();
      return res.status(201).json(newPassport);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
});

// String.prototype.toDate = function () {
//   let str = this.split('T');
//   let date = str[0];

//   let str2 = this.split("@");

//   let dateHour = new Date(date + "T" + str2[1]);
//   console.log("toDate: ", dateHour);
//   return dateHour;
// }

router.get('/:idCria/:timeAdult', async (req, res) => {

  console.log(req.params.idCria);
  console.log(req.params.timeAdult);

  const productFinded = await product.find({ 'children.id': req.params.idCria });
  const adultEntered = (productFinded[0].time.getTime() / 60000);

  const childName = await productFinded[0].children.name;

  const adultExit = (req.params.timeAdult / 60000);
  var adultTime = (adultExit - adultEntered);

  console.log('entrada:', adultEntered);
  console.log('saída:', adultExit);
  console.log('diferença em minutos:', adultTime);

  const psjson = await passportServices.find({});
  const pjson = await passport.find({});

  let lastFinalTime = psjson[psjson.length - 1].finalTime;//Último finalTime do json que foi pego do bd do passaporte service (psjson)
  let lastPrice = parseFloat(psjson[psjson.length - 1].price.replace(',', '.')); //preço que se paga quando fica entre o ultimo tempo inicial e tempo final do serviço
  var price;
  var serviceName;

  if (productFinded[0].service === 'Passaporte') {
    serviceName = "Passaporte";
    console.log(serviceName)

    if (adultTime > (lastFinalTime.toSS() / 60)) {
      let time = adultTime - (lastFinalTime.toSS() / 60);
      console.log("time sem o ultimo tempo de serviço:", time);
      price = parseFloat((1 + parseInt(time / parseFloat(pjson[0].time, 10))) * parseFloat(pjson[0].price.replace(',', '.')) + parseFloat(lastPrice, 10)).toFixed(2);
      console.log("preço:", price);

    } else {

      for (i = 0; i < psjson.length; i++) {
        if (adultTime >= (psjson[i].initialTime.toSS() / 60)) {
          price = parseFloat(psjson[i].price.replace(',', '.')).toFixed(2);
          console.log("preço:", price);
        }
      }
    }

  }

  if (productFinded[0].service === 'Aniversário') {
    serviceName = "Aniversário";
    console.log(serviceName)

    let x = 0, saveTheDate = 0;
    let birthdayFinded = await birthday.find({ 'guestList.id': req.params.idCria });
    console.log("convidado")

    if (birthdayFinded.length === 0) {//esse if é só para testes
      birthdayFinded = await birthday.find({ 'partyFeather.id': req.params.idCria });
      console.log("convidado extra", birthdayFinded)
    }

    let birthdayDate, birthdayStart, birthdayEnd, test;

    for (i = 0; i < birthdayFinded.length; i++) {//for para calcular qual o ultimo aniversário que a criança estará, esses calculos estão meio sem nexo, mas ainda não entendi como ter ctz que a criança tá no aniversário certo, só quando ela é cadastrada no sistema e bate com as informaões da guestList
      birthdayDate = birthdayFinded[i].birthdayDate;
      test = birthdayFinded[i].end.getTime() / 60000;
      if (saveTheDate < test && (birthdayFinded[i].start.getTime() / 60000) - adultEntered < 120) {//aqui só é aceito como o aniversário certo quando o adulto deixa a criança pelo menos 2 horas antes, pra que não calcule com o valor do aniversário do dia que vem

        saveTheDate = test;
        x = i;
        console.log(new Date(saveTheDate), "new x: ", x)
      }
    }

    birthdayDate = birthdayFinded[x].birthdayDate;
    birthdayStart = birthdayFinded[x].start.getTime() / 60000;
    birthdayEnd = birthdayFinded[x].end.getTime() / 60000;

    console.log(birthdayDate, " ", birthdayFinded[x].start, " ", birthdayFinded[x].end);

    console.log("procurei", x);
    console.log(new Date(), " ", new Date(birthdayEnd * 60000));


    var extraTime = 0;
    price = parseFloat(0, 10).toFixed(2);
    console.log("entrada: ", new Date(adultEntered * 60000), "\nsaída: ", new Date(adultExit * 60000))
    console.log("start: ", new Date(birthdayStart * 60000), "\nend: ", new Date(birthdayEnd * 60000))
    if ((birthdayStart - adultEntered) > 15) {
      if (adultExit <= birthdayStart) {
        extraTime += (adultExit - adultEntered)
        console.log("tempo corrido: ", extraTime)
      } else {
        extraTime += (birthdayStart - adultEntered - 15);
        console.log("tempo antecipado: ", extraTime)
      }
    }

    if (adultExit > (birthdayEnd)) {
      extraTime += (adultExit - birthdayEnd);
      console.log("tempo atrasado: ", extraTime - (birthdayStart - adultEntered - 15))
      console.log("tempo extra: ", extraTime)
    }

    if ((adultEntered >= (birthdayStart - 15)) && adultExit <= birthdayEnd) {

      price = 0.00;

    } else {

      const psjson = await passportServices.find({});
      const pjson = await passport.find({});

      let lastFinalTime = psjson[psjson.length - 1].finalTime;//Último finalTime do json que foi pego do bd do passaporte service (psjson)
      let lastInitialTime = psjson[psjson.length - 1].initialTime;//último tempo inicial do passaporte service
      let lastPrice = parseFloat(psjson[psjson.length - 1].price.replace(',', '.')).toFixed(2); //preço que se paga quando fica entre o ultimo tempo inicial e tempo final do serviço


      adultTime = extraTime;
      if (adultTime > (lastFinalTime.toSS() / 60)) {
        let time = adultTime - (lastFinalTime.toSS() / 60);

        price = parseFloat((1 + parseInt(time / parseFloat(pjson[0].time, 10))) * parseFloat(parseFloat(pjson[0].price.replace(',', '.'))).toFixed(2) + parseFloat(lastPrice.replace(',', '.')));


      } else {

        for (i = 0; i < psjson.length; i++) {

          if (adultTime >= (psjson[i].initialTime.toSS() / 60)) {
            price = parseFloat(psjson[i].price.replace(',', '.')).toFixed(2);

          }

        }

      }

    }

  } else
    if (productFinded[0].service === 'Baby Passaporte') {

      const bpsjson = await babyPassportServices.find({});
      const bpjson = await babyPassport.find({});

      let lastFinalTime = bpsjson[bpsjson.length - 1].finalTime;//Último finalTime do json que foi pego do bd do passaporte service (bpsjson)
      let lastInitialTime = bpsjson[bpsjson.length - 1].initialTime;//último tempo inicial do passaporte service
      let lastPrice = parseFloat(bpsjson[bpsjson.length - 1].price.replace(',', '.')); //preço que se paga quando fica entre o ultimo tempo inicial e tempo final do serviço
      var price;
      var serviceName;

      serviceName = "Baby Passaporte";
      console.log(serviceName)

      if (adultTime > (lastFinalTime.toSS() / 60)) {
        let time = adultTime - (lastFinalTime.toSS() / 60);
        console.log("time sem o ultimo tempo de serviço:", time);
        price = parseFloat((1 + parseInt(time / parseFloat(bpjson[0].time, 10))) * parseFloat(bpjson[0].price.replace(',', '.')) + parseFloat(lastPrice, 10)).toFixed(2);
        console.log("preço:", price);

      } else {

        for (i = 0; i < bpsjson.length; i++) {
          if (adultTime >= (bpsjson[i].initialTime.toSS() / 60)) {
            price = parseFloat(bpsjson[i].price.replace(',', '.')).toFixed(2);
            console.log("preço:", price);
          }
        }
      }
    }

  const data = {
    service: serviceName,
    name: childName,
    time: parseInt(adultTime),
    value: price,
  };

  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }


});

router.get('/discount/:idCria/:codDesc/:valueChild/:idAdult', async (req, res) => {

  const productFinded = await product.find({ 'children.id': req.params.idCria }); //achando o produto pelo id da criança, vindo do fronto na var idCria
  const adultEntered = productFinded[0].time; // pegando o tempo que o resposável deixou a criança na loja do produto
  const adultFinded = await product.find({ 'adult.id': req.params.idAdult });
  const adultExit = req.params.timeAdult; // pegando o tempo que o adulto tirou a criança/produto da loja
  const adultTime = ((adultExit / 60000) - (adultEntered.getTime() / 60000)); // tempo que a criança ficou na loja

  const discountFinded = await discount.find({ 'codes.numberCode': req.params.codDesc, 'to': 'Child' }) //pesquisando desconto pelo código que recebe do front

  const childName = await productFinded[0].children.name; // nome da criança pra salvar quem vai usar o desconto, já que essa rota é só de desconto para crianças

  const validade = moment(discountFinded[0].validity).utc()
  const from = moment(validade).endOf("days").format();
  const diaatual = moment().format();



  if (moment(diaatual).isBefore(from)) {
    if (discountFinded[0].temporalityType === "Geral") {

      discountFinded[0].codes.forEach((elemente, indice, array) => {
        
       
        if (elemente.numberCode === req.params.codDesc) {
          console.log("entei aki")
          if (elemente.statusBroadlUser.length > 0) {
            elemente.statusBroadlUser.forEach((event, index, array2) => {
            
              console.log(event.idUser,"===",req.params.idCria)
              if (event.idUser === req.params.idCria) {

                if (discountFinded[0].temporalityDate === "Diario") {

                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, "days").format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }

                      console.log(price)

                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);
                      console.log(price)


                    }


                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    //desconto usado ja no dia
                    return res.send("1");
                  }
                } else if (discountFinded[0].temporalityDate === "Semanal") {

                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(7, "days").format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("2");
                  }
                } else if (discountFinded[0].temporalityDate === "Mensal") {
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'month').format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("3");
                  }
                } else if (discountFinded[0].temporalityDate === "Anual") {
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'years').format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("4");
                  }
                } else if (discountFinded[0].temporalityDate === "Livre") {

                  let hj = moment().format();
                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'years').format();

                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }
                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);
                  }
                  const data = {
                    idcria: req.params.idCria,
                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: childName,
                    time: adultTime,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.valueChild,
                    indicecodes: indice,
                    indiceBroad: index,
                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }

                } else if (discountFinded[0].temporalityDate === "Unico") {
                  if (!(discountFinded[0].codes[indice].statusUnique)) {
                    let hj = moment().format();
                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }
                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);
                    }
                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,
                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("9");
                  }
                }
              } else  {
                if (discountFinded[0].type === 'Fixo') {

                  price = parseFloat(discountFinded[0].value).toFixed(2);

                  if (req.params.valueChild <= discountFinded[0].value) {
                    price = parseFloat(req.params.valueChild).toFixed(2);
                  }

                  console.log(price)

                } else {

                  price = req.params.valueChild;
                  price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);
                  console.log(price)


                }


                const data = {
                  idcria: req.params.idCria,
                  idAdult: req.params.idAdult,
                  code: req.params.codDesc,
                  name: childName,
                  time: adultTime,
                  value: price,
                  discount: discountFinded[0].name,
                  Valorinicial: req.params.valueChild,
                  indicecodes: indice,
                  indiceBroad: index,

                };
                try {
                  return res.status(201).json(data);
                } catch (err) {
                  return res.sendStatus(500);
                }
              }

            })
          } else {

            if (discountFinded[0].type === 'Fixo') {

              price = parseFloat(discountFinded[0].value).toFixed(2);

              if (req.params.valueChild <= discountFinded[0].value) {
                price = parseFloat(req.params.valueChild).toFixed(2);
              }



            } else {

              price = req.params.valueChild;
              price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


            }



            const data = {
              idcria: req.params.idCria,
              idAdult: req.params.idAdult,
              code: req.params.codDesc,
              name: childName,
              time: adultTime,
              value: price,
              discount: discountFinded[0].name,
              Valorinicial: req.params.valueChild,
              indicecodes: indice,
              indiceBroad: 0,

            };
            try {
              return res.status(201).json(data);
            } catch (err) {
              return res.sendStatus(500);
            }
          }



        }
      })

    } else if (discountFinded[0].temporalityType === "Unico") {
      discountFinded[0].codes.forEach((elemente, indice, array) => {
        if (elemente.statusUniqueUser != undefined) {
          console.log("entreiri")
          if (elemente.numberCode === req.params.codDesc) {
            if (elemente.statusUniqueUser === req.params.idCria) {
              console.log("entreii")
              discountFinded[0].codes.forEach((elemente, indice, array) => {
                if (elemente.numberCode === req.params.codDesc) {



                  if (elemente.statusUniqueUser === req.params.idCria) {

                    if (discountFinded[0].temporalityDate === "Diario") {

                      let hj = moment().format();

                      let ultimadata = moment(elemente.statusUniqueDate).format();
                      let proximafata = moment(ultimadata).add(1, "days").format();

                      if (moment(hj).isAfter(proximafata)) {

                        if (discountFinded[0].type === 'Fixo') {

                          price = parseFloat(discountFinded[0].value).toFixed(2);

                          if (req.params.valueChild <= discountFinded[0].value) {
                            price = parseFloat(req.params.valueChild).toFixed(2);
                          }



                        } else {

                          price = req.params.valueChild;
                          price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                        }


                        const data = {
                          name: childName,
                          time: adultTime,
                          value: price,
                          discount: discountFinded[0].name,
                          Valorinicial: req.params.valueChild,
                          indicecodes: indice,


                        };
                        try {
                          return res.status(201).json(data);
                        } catch (err) {
                          return res.sendStatus(500);
                        }
                      } else {


                        return res.send("1");

                      }
                    } else if (discountFinded[0].temporalityDate === "Semanal") {

                      let hj = moment().format();

                      let ultimadata = moment(elemente.statusUniqueDate).format();
                      let proximafata = moment(ultimadata).add(7, "days").format();

                      if (moment(hj).isAfter(proximafata)) {

                        if (discountFinded[0].type === 'Fixo') {

                          price = parseFloat(discountFinded[0].value).toFixed(2);

                          if (req.params.valueChild <= discountFinded[0].value) {
                            price = parseFloat(req.params.valueChild).toFixed(2);
                          }



                        } else {

                          price = req.params.valueChild;
                          price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                        }


                        const data = {
                          name: childName,
                          time: adultTime,
                          value: price,
                          discount: discountFinded[0].name,
                          Valorinicial: req.params.valueChild,
                          indicecodes: indice,

                        };
                        try {
                          return res.status(201).json(data);
                        } catch (err) {
                          return res.sendStatus(500);
                        }
                      } else {
                        return res.send("2");
                      }
                    } else if (discountFinded[0].temporalityDate === "Mensal") {
                      let hj = moment().format();

                      let ultimadata = moment(elemente.statusUniqueDate).format();
                      let proximafata = moment(ultimadata).add(1, 'month').format();

                      if (moment(hj).isAfter(proximafata)) {

                        if (discountFinded[0].type === 'Fixo') {

                          price = parseFloat(discountFinded[0].value).toFixed(2);

                          if (req.params.valueChild <= discountFinded[0].value) {
                            price = parseFloat(req.params.valueChild).toFixed(2);
                          }



                        } else {

                          price = req.params.valueChild;
                          price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                        }


                        const data = {
                          name: childName,
                          time: adultTime,
                          value: price,
                          discount: discountFinded[0].name,
                          Valorinicial: req.params.valueChild,
                          indicecodes: indice,


                        };
                        try {
                          return res.status(201).json(data);
                        } catch (err) {
                          return res.sendStatus(500);
                        }
                      } else {
                        return res.send("3");
                      }
                    } else if (discountFinded[0].temporalityDate === "Anual") {
                      let hj = moment().format();

                      let ultimadata = moment(elemente.statusUniqueDate).format();
                      let proximafata = moment(ultimadata).add(1, 'years').format();

                      if (moment(hj).isAfter(proximafata)) {

                        if (discountFinded[0].type === 'Fixo') {

                          price = parseFloat(discountFinded[0].value).toFixed(2);

                          if (req.params.valueChild <= discountFinded[0].value) {
                            price = parseFloat(req.params.valueChild).toFixed(2);
                          }



                        } else {

                          price = req.params.valueChild;
                          price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                        }


                        const data = {
                          name: childName,
                          time: adultTime,
                          value: price,
                          discount: discountFinded[0].name,
                          Valorinicial: req.params.valueChild,
                          indicecodes: indice,


                        };
                        try {
                          return res.status(201).json(data);
                        } catch (err) {
                          return res.sendStatus(500);
                        }
                      } else {
                        return res.send("4");
                      }
                    } else if (discountFinded[0].temporalityDate === "Livre") {
                      let hj = moment().format();

                      let ultimadata = moment(elemente.statusUniqueDate).format();
                      let proximafata = moment(ultimadata).add(1, 'years').format();



                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        name: childName,
                        time: adultTime,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.valueChild,
                        indicecodes: indice,


                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }

                    }
                  } else {
                    return res.send("5");
                  }
                }
              })
            } else {

              return res.send("5");
            }
          }
        } else {

          if (elemente.numberCode === req.params.codDesc) {

            if (elemente.statusBroadlUser.length > 0) {
              elemente.statusBroadlUser.forEach((event, index, array2) => {


                if (event.idUser === req.params.idAdult) {

                  if (discountFinded[0].temporalityDate === "Diario") {

                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, "days").format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idcria: req.params.idCria,
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: childName,
                        time: adultTime,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.valueChild,
                        indicecodes: indice,
                        indiceBroad: index,
                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.status(01);
                    }
                  } else if (discountFinded[0].temporalityDate === "Semanal") {

                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(7, "days").format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idcria: req.params.idCria,
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: childName,
                        time: adultTime,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.valueChild,
                        indicecodes: indice,
                        indiceBroad: index,

                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.status("2");
                    }
                  } else if (discountFinded[0].temporalityDate === "Mensal") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'month').format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idcria: req.params.idCria,
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: childName,
                        time: adultTime,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.valueChild,
                        indicecodes: indice,
                        indiceBroad: index,
                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.send("2");
                    }
                  } else if (discountFinded[0].temporalityDate === "Anual") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }

                      const data = {
                        idcria: req.params.idCria,
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: childName,
                        time: adultTime,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.valueChild,
                        indicecodes: indice,
                        indiceBroad: index,

                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.send("4");
                    }
                  } else if (discountFinded[0].temporalityDate === "Livre") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();



                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {
                      idcria: req.params.idCria,
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: childName,
                      time: adultTime,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.valueChild,
                      indicecodes: indice,
                      indiceBroad: index,
                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }

                  }
                } else {
                  return res.send("5");
                }

              })
            } else {

              if (discountFinded[0].type === 'Fixo') {

                price = parseFloat(discountFinded[0].value).toFixed(2);

                if (req.params.valueChild <= discountFinded[0].value) {
                  price = parseFloat(req.params.valueChild).toFixed(2);
                }



              } else {

                price = req.params.valueChild;
                price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


              }

              const data = {
                idcria: req.params.idCria,
                idAdult: req.params.idAdult,
                code: req.params.codDesc,
                name: childName,
                time: adultTime,
                value: price,
                discount: discountFinded[0].name,
                Valorinicial: req.params.valueChild,
                indicecodes: indice,


              };
              try {
                return res.status(201).json(data);
              } catch (err) {
                return res.sendStatus(500);
              }
            }



          }

        }
      })
    }
  } else {
    return res.send("7");
  }







});

router.get('/discountAdult/:idAdult/:valueChild/:codDesc', async (req, res) => {

  const discountFinded = await discount.find({ 'codes.numberCode': req.params.codDesc, 'to': "Adult" });


  let finalPrice = req.params.value;


  let valueDisc = discountFinded[0].value;

  const adultFinded = await product.find({ 'adult.id': req.params.idAdult });

  let adultName = adultFinded[0].adult.name;

  const validade = moment(discountFinded[0].validity).utc()
  const from = moment(validade).endOf("days").format();
  const diaatual = moment().format();

  if (moment(diaatual).isBefore(from)) {
    console.log("entre")
    if (discountFinded[0].temporalityType === "Geral") {
      console.log("geral")
      discountFinded[0].codes.forEach((elemente, indice, array) => {
        if (elemente.numberCode === req.params.codDesc) {

          if (elemente.statusBroadlUser.length > 0) {
            elemente.statusBroadlUser.forEach((event, index, array2) => {


              if (event.idUser === req.params.idAdult) {
                console.log("entrei 2")
                if (discountFinded[0].temporalityDate === "Diario") {

                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, "days").format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {

                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    //desconto usado ja no dia
                    return res.send("1");
                  }
                } else if (discountFinded[0].temporalityDate === "Semanal") {

                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(7, "days").format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }

                    const data = {

                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("2");
                  }
                } else if (discountFinded[0].temporalityDate === "Mensal") {
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'month').format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }

                    const data = {

                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("3");
                  }
                } else if (discountFinded[0].temporalityDate === "Anual") {
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'years').format();

                  if (moment(hj).isAfter(proximafata)) {

                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {

                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,
                      indiceBroad: index,

                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }
                  } else {
                    return res.send("4");
                  }
                } else if (discountFinded[0].temporalityDate === "Livre") {
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'years').format();



                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }


                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,
                    indiceBroad: index,

                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }

                } else if (discountFinded[0].temporalityDate === "Unico") {
                  if (!(discountFinded[0].codes[indice].statusUnique)) {
                    console.log("=========coisa unica")
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();



                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }

                    console.log(price)
                    const data = {

                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,
                      indiceBroad: index,
                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.send("9");
                    }

                  } else if (discountFinded[0].codes[indice].statusUnique) {
                    return res.send("9")
                  }
                }
              } else {
                return res.send("5");
              }

            })
          } else {

            if (discountFinded[0].type === 'Fixo') {

              price = parseFloat(discountFinded[0].value).toFixed(2);

              if (req.params.valueChild <= discountFinded[0].value) {
                price = parseFloat(req.params.valueChild).toFixed(2);
              }



            } else {

              price = req.params.valueChild;
              price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


            }


            console.log("entrei aki 89", price, req.params.valueChild)
            const data = {

              idAdult: req.params.idAdult,
              code: req.params.codDesc,
              name: adultName,
              value: price,
              discount: discountFinded[0].name,
              Valorinicial: req.params.value,
              indicecodes: indice,


            };
            try {
              return res.status(201).json(data);
            } catch (err) {
              return res.sendStatus(500);
            }
          }



        }
      })

    } else if (discountFinded[0].temporalityType === "Unico") {
      console.log("ente3")
      discountFinded[0].codes.forEach((elemente, indice, array) => {
        console.log(elemente.statusUniqueUser != undefined, elemente.hasOwnProperty('numberCode'))
        if (elemente.statusUniqueUser != undefined) {
          console.log("entrei aki 4")
          if (elemente.statusUniqueUser === req.params.idAdult) {
            if (elemente.numberCode === req.params.codDesc) {



              if (discountFinded[0].temporalityDate === "Diario") {

                let hj = moment().format();

                let ultimadata = moment(elemente.statusUniqueDate).format();
                let proximafata = moment(ultimadata).add(1, "days").format();

                if (moment(hj).isAfter(proximafata)) {

                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }

                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,


                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }
                } else {


                  return res.send("1");

                }
              } else if (discountFinded[0].temporalityDate === "Semanal") {

                let hj = moment().format();

                let ultimadata = moment(elemente.statusUniqueDate).format();
                let proximafata = moment(ultimadata).add(7, "days").format();

                if (moment(hj).isAfter(proximafata)) {

                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }


                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,


                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }
                } else {
                  return res.send("2");
                }
              } else if (discountFinded[0].temporalityDate === "Mensal") {
                let hj = moment().format();

                let ultimadata = moment(elemente.statusUniqueDate).format();
                let proximafata = moment(ultimadata).add(1, 'month').format();

                if (moment(hj).isAfter(proximafata)) {

                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }


                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,


                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }
                } else {
                  return res.send("3");
                }
              } else if (discountFinded[0].temporalityDate === "Anual") {
                let hj = moment().format();

                let ultimadata = moment(elemente.statusUniqueDate).format();
                let proximafata = moment(ultimadata).add(1, 'years').format();

                if (moment(hj).isAfter(proximafata)) {

                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }


                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,


                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.sendStatus(500);
                  }
                } else {
                  return res.send("4");
                }
              } else if (discountFinded[0].temporalityDate === "Livre") {
                let hj = moment().format();

                let ultimadata = moment(elemente.statusUniqueDate).format();
                let proximafata = moment(ultimadata).add(1, 'years').format();



                if (discountFinded[0].type === 'Fixo') {

                  price = parseFloat(discountFinded[0].value).toFixed(2);

                  if (req.params.valueChild <= discountFinded[0].value) {
                    price = parseFloat(req.params.valueChild).toFixed(2);
                  }



                } else {

                  price = req.params.valueChild;
                  price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                }


                const data = {

                  idAdult: req.params.idAdult,
                  code: req.params.codDesc,
                  name: adultName,
                  value: price,
                  discount: discountFinded[0].name,
                  Valorinicial: req.params.value,
                  indicecodes: indice,

                };
                try {
                  return res.status(201).json(data);
                } catch (err) {
                  return res.sendStatus(500);
                }

              } else if (discountFinded[0].temporalityDate === "Unico") {
                if (!(discountFinded[0].codes[indice].statusUnique)) {
                  console.log("=========coisa unica")
                  let hj = moment().format();

                  let ultimadata = moment(event.dateUser).format();
                  let proximafata = moment(ultimadata).add(1, 'years').format();



                  if (discountFinded[0].type === 'Fixo') {

                    price = parseFloat(discountFinded[0].value).toFixed(2);

                    if (req.params.valueChild <= discountFinded[0].value) {
                      price = parseFloat(req.params.valueChild).toFixed(2);
                    }



                  } else {

                    price = req.params.valueChild;
                    price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                  }


                  const data = {

                    idAdult: req.params.idAdult,
                    code: req.params.codDesc,
                    name: adultName,
                    value: price,
                    discount: discountFinded[0].name,
                    Valorinicial: req.params.value,
                    indicecodes: indice,
                    indiceBroad: index,
                  };
                  try {
                    return res.status(201).json(data);
                  } catch (err) {
                    return res.send("9");
                  }

                }
              }

            }
          } else {
            return res.send("5");
          }


        } else {
          if (elemente.numberCode === req.params.codDesc) {

            if (elemente.statusBroadlUser.length > 0) {
              elemente.statusBroadlUser.forEach((event, index, array2) => {


                if (event.idUser === req.params.idAdult) {

                  if (discountFinded[0].temporalityDate === "Diario") {

                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, "days").format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: adultName,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.value,
                        indicecodes: indice,


                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.status(01);
                    }
                  } else if (discountFinded[0].temporalityDate === "Semanal") {

                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(7, "days").format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: adultName,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.value,
                        indicecodes: indice,



                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.status("2");
                    }
                  } else if (discountFinded[0].temporalityDate === "Mensal") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'month').format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }


                      const data = {
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: adultName,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.value,
                        indicecodes: indice,

                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.send("2");
                    }
                  } else if (discountFinded[0].temporalityDate === "Anual") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();

                    if (moment(hj).isAfter(proximafata)) {

                      if (discountFinded[0].type === 'Fixo') {

                        price = parseFloat(discountFinded[0].value).toFixed(2);

                        if (req.params.valueChild <= discountFinded[0].value) {
                          price = parseFloat(req.params.valueChild).toFixed(2);
                        }



                      } else {

                        price = req.params.valueChild;
                        price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                      }

                      const data = {
                        idAdult: req.params.idAdult,
                        code: req.params.codDesc,
                        name: adultName,
                        value: price,
                        discount: discountFinded[0].name,
                        Valorinicial: req.params.value,
                        indicecodes: indice,



                      };
                      try {
                        return res.status(201).json(data);
                      } catch (err) {
                        return res.sendStatus(500);
                      }
                    } else {
                      return res.send("4");
                    }
                  } else if (discountFinded[0].temporalityDate === "Livre") {
                    let hj = moment().format();

                    let ultimadata = moment(event.dateUser).format();
                    let proximafata = moment(ultimadata).add(1, 'years').format();



                    if (discountFinded[0].type === 'Fixo') {

                      price = parseFloat(discountFinded[0].value).toFixed(2);

                      if (req.params.valueChild <= discountFinded[0].value) {
                        price = parseFloat(req.params.valueChild).toFixed(2);
                      }



                    } else {

                      price = req.params.valueChild;
                      price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


                    }


                    const data = {
                      idAdult: req.params.idAdult,
                      code: req.params.codDesc,
                      name: adultName,
                      value: price,
                      discount: discountFinded[0].name,
                      Valorinicial: req.params.value,
                      indicecodes: indice,


                    };
                    try {
                      return res.status(201).json(data);
                    } catch (err) {
                      return res.sendStatus(500);
                    }

                  }
                } else {
                  return res.send("5");
                }

              })
            } else {

              if (discountFinded[0].type === 'Fixo') {

                price = parseFloat(discountFinded[0].value).toFixed(2);

                if (req.params.valueChild <= discountFinded[0].value) {
                  price = parseFloat(req.params.valueChild).toFixed(2);
                }



              } else {

                price = req.params.valueChild;
                price = parseFloat(price * (discountFinded[0].value / 100)).toFixed(2);


              }

              const data = {
                idAdult: req.params.idAdult,
                code: req.params.codDesc,
                name: adultName,
                value: price,
                discount: discountFinded[0].name,
                Valorinicial: req.params.value,
                indicecodes: indice,




              };
              console.log("entei aki")
              try {
                return res.status(201).json(data);
              } catch (err) {
                return res.sendStatus(500);
              }
            }



          }
        }
      })


    }
  } else {
    return res.send("7");
  }
  // if (discountFinded[0].type === 'Fixo') {
  //   finalPrice = parseFloat(valueDisc).toFixed(2);
  //   console.log("preço descontado:", finalPrice);
  // } else {
  //   finalPrice = parseFloat(finalPrice * (valueDisc / 100)).toFixed(2);
  //   console.log("preço descontado:", finalPrice);
  // }

  // const data = {
  //   name: adultName,
  //   value: finalPrice, //valor que vai ficar no final para o cliente pagar
  //   discount: discountFinded[0].name,
  //   tipo: discountFinded[0].type,
  //   valueD: discountFinded[0].value,
  // };
  // try {
  //   return res.status(201).json(data);
  // } catch (err) {
  //   return res.sendStatus(500);
  // }


});

router.post('/a', async (req, res) => {
  const a = req.cookies.TOKEN_KEY;
  const b = jwt.verify(a, config.secret_auth);

  const adultFound = await adult.find({ _id: b.id, isEmployee: true }).populate('identifierEmployee');
  const funcionario = adultFound[0].name.firstName + " " + adultFound[0].name.surName;


  console.log('executed');
  const products = req.body.map(async (child, indice) => {

    try {
      const deletedService = await product.findByIdAndRemove(child.entrada._id);
      console.log(child.desconto[indice])
      let code = undefined;
      let type = undefined;
      let typeadulto = undefined;
      let codeadult = undefined;
      if (child.desconto[indice].codigos === undefined) {
        code = undefined;
        type = undefined;
      } else {
        code = child.desconto[indice].codigos.code;
        type = "Criança"
      }
      if(child.desconto[indice].adult === undefined){
        codeadult =undefined;
        typeadulto = undefined;

      }else{
        codeadult =child.desconto[indice].adult.code;
        typeadulto = "Adulto";
      }
      if (indice === req.body.length - 1) {
        const log = new Logs({
          activity: child.entrada.service,
          action: 'Saida Adulto',
          dateOperation: new Date(),
          from: funcionario, //ajsuta o id dps de fazer o login funcionar
          to: child.entrada.adult.name,
          price: child.valor,
          priceMethod: child.Form,
          priceDiscount: {
            code: codeadult,
            type: typeadulto
          }

        })
        const newLog = await log.save();
        const logs = new Logs({
          activity: child.entrada.service,
          action: 'Saida',
          dateOperation: new Date(),
          from: funcionario, //ajsuta o id dps de fazer o login funcionar
          to: child.entrada.adult.name,
          price: child.valor3[indice].valueF,
          cco: child.entrada.children.name,
          priceMethod: child.Form,
          timeLojaLast: new Date(),
          timeLojaFirst: child.entrada.time,
          priceDiscount: {
            code: code,
            type: type
          }

        })
        const newLogs = await logs.save()
      }
      else {
        const log = new Logs({
          activity: child.entrada.service,
          action: 'Saida',
          dateOperation: new Date(),
          from: funcionario, //ajsuta o id dps de fazer o login funcionar
          to: child.entrada.adult.name,
          price: child.valor3[indice].valueF,
          cco: child.entrada.children.name,
          priceMethod: child.Form,
          timeLojaLast: new Date(),
          timeLojaFirst: child.entrada.time,
          priceDiscount: {
            code: code,
            type: type
          }

        })
        const newLog = await log.save()
      }

      if (!deletedService) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }

  });
  console.log("conseguiiii")
  const productFinded = await product.find({ 'children.id': req.body.idcria });



});
router.post('/discont/:id/:codDesc/:index', async (req, res) => {
  const discountFinded = await discount.find({ 'codes.numberCode': req.params.codDesc });
  console.log(discountFinded);
  if (discountFinded[0].temporalityType === "Geral") {

    if (discountFinded[0].temporalityDate === "Unico") {
      discountFinded[0].codes[req.params.index].statusUnique = true;
      discountFinded[0].codes[req.params.index].statusBroadlUser.push({ idUser: req.params.id, dateUser: new Date() })
      discountFinded[0].save();
    } else {
      console.log("consefui")
      discountFinded[0].codes[req.params.index].statusBroadlUser.push({
        idUser: req.params.id, dateUser: new Date()
      })
      discountFinded[0].save();
    }

  } else if (discountFinded[0].temporalityType === "Unico") {
    if (discountFinded[0].codes[req.params.index].hasOwnProperty('statusUniqueUser')) {
      discountFinded[0].codes[req.params.index].statusUniqueDate = new Date();
      discountFinded[0].save();
    } else {
      discountFinded[0].codes[req.params.index].statusUniqueUser = req.params.id;
      discountFinded[0].codes[req.params.index].statusUniqueDate = new Date();
      discountFinded[0].save();
    }
  }
  console.log(discountFinded[0].codes)
  try {
    return res.status(201);
  } catch (err) {
    return res.sendStatus(500);
  }
});
module.exports = router;