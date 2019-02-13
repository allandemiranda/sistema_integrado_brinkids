import axios from 'axios';


export const Num = async () => {
    const lista = [];
    const numero = axios.get('/belongings')
        .then((response) => {
            for (var a = 1; a <= response.data.number; a++) {
                lista.push(true)
            }
            return lista
        }).then((event) => {
            const lista = [];
            const favetasUsadas = axios.get('/product')
                .then((response) => {
                    response.data.map((mape, indice) => {
                        lista.push(mape.belongings);
                    })
                    const you = {
                        Ngavetas: event,
                        Gavetasusadas: lista
                    }
                    return you;
                }).then((mip) => {
                    let temporario = mip.Ngavetas;
                    let numero;
                    mip.Gavetasusadas.map((event, indice) => {
                        mip.Ngavetas.map((invent, index) => {
                           
                            if (event === index) {
                                temporario[index] = false;
                            }
                            console.log(event,"==",index,":::",temporario[index])
                        })
                    })
                    for (var p = 0; p < temporario.length; p++) {
                        if (temporario[p] === true) {
                            numero = p;
                            temporario[p] = false;
                            break;
                        }
                        numero = 0;
                    }

                    return numero;
                })
                .catch((err) => console.log(err));
                return favetasUsadas
        })
        .catch((err) => console.log(err));
    console.log(numero)
    return numero;
}
