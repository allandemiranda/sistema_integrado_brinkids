import axios from 'axios';


export const Num = async (idadulto) => {
    const lista = [];
    const numero = axios.get('/belongings')
        .then((response) => {
            for (var a = 1; a <= response.data.number; a++) {
                lista.push({ disp: true, N: a })
            }
            return lista
        }).then((event) => {
            const lista = [];
            const favetasUsadas = axios.get('/product')
                .then((response) => {
                    response.data.map((mape, indice) => {
                        lista.push({ Numeros: mape.belongings, ids: mape.adult.id });
                    })
                    const you = {
                        Ngavetas: event,
                        Gavetasusadas: lista
                    }
                    return you;
                }).then((mip) => {
                    let temporario = mip.Ngavetas;
                    let numero;
                    let func = true;
                    for(var a =0;a<mip.Gavetasusadas.length;a++){
                        if(mip.Gavetasusadas[a].ids===idadulto){
                            numero =mip.Gavetasusadas[a].Numeros;
                            func = false;
                            break;
                        }
                    }
                    
                    if (func) {
                        mip.Gavetasusadas.map((event, indice) => {
                            mip.Ngavetas.map((invent, index) => {

                                if (event.Numeros === invent.N) {
                                    temporario[index].disp = false;
                                }
                                console.log(event.Numeros, "==", index, ":::", temporario[index])
                            })
                        })
                        for (var p = 0; p < temporario.length; p++) {
                            if (temporario[p].disp === true) {
                                numero = temporario[p].N;
                                temporario[p].disp = false;
                                break;
                            }
                            numero = 0;
                        }
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
