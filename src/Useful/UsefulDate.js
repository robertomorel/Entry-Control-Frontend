/*
Script que contém funções gerais de manivulação e validação de datas
*/

import {
    parseISO,
    isBefore
} from 'date-fns';

// -- Transforma uma string de hora no formato (00:00) para uma data ISO
const HourStringToDateFormat = (hourString) => {

    try {

        const time = hourString.split(":");

        const correntDate = new Date();
        return new Date(correntDate.getFullYear(),
            correntDate.getMonth(),
            correntDate.getDate(),
            parseInt(time[0]),
            parseInt(time[1]));

        /*        
        var formattedTimestamp = Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        }).format(dateHour);
        */

    } catch (err) {
        alert("Ocorreu um erro inesperado ao formatar a data.");
    }

}

// -- Validações de intervalo entre as horas de cada folha
// -- Regra de negócio da folha de ponto
const TimeValidate = (objDate) => {

    const { f_iniHour, f_lunchIniHour, f_lunchEndHour, f_endHour } = objDate;

    let erro = "";

    if (f_iniHour && f_lunchIniHour &&
        isBefore(f_lunchIniHour, f_iniHour)) {
        erro = erro.concat("A hora de entrada não pode ser maior que a hora de início do intervalo. ");
    }

    if (f_lunchIniHour && f_lunchEndHour) {
        if (isBefore(f_lunchEndHour, f_lunchIniHour))
            erro = erro.concat("A hora de início do intervalo não pode ser maior que a hora final do intervalo. ");
        if ((f_lunchEndHour - f_lunchIniHour) / 60000 < 60)
            erro = erro.concat("Não é permitido ter menos que 1hr de intervalo. ");
    }

    if (f_lunchEndHour && f_endHour &&
        isBefore(f_endHour, f_lunchEndHour)) {
        erro = erro.concat("A hora final do intervalo não pode ser maior que a hora de saída.");
    }

    console.log(erro);

    if (erro !== "") {
        alert(erro);
        return false;
    }

    return true;

};

// -- Método para calcular o saldo ou horas à compensar 
// -- Regra de negócio da folha de ponto
const ShowBalance = (objArr) => {

    const ih = HourStringToDateFormat("08:00");
    const eh = HourStringToDateFormat("18:00");
    const lih = HourStringToDateFormat("12:00");
    const leh = HourStringToDateFormat("13:00");

    let count = 0;

    objArr.filter(obj =>
        (obj.iniHour && obj.endHour && obj.lunchIniHour && obj.lunchEndHour)
    ).forEach(obj => {
        //console.log((ih - parseISO(obj.iniHour))/60000);
        let value = (ih - parseISO(obj.iniHour)) +
            (parseISO(obj.lunchIniHour) - lih) +
            (leh - parseISO(obj.lunchEndHour)) +
            (parseISO(obj.endHour) - eh);

        value = (value !== 0) ? value / 60000 : 0;

        // -- Aplicação da regra de tolerância de 10 min da folha de ponto
        if (value !== 0) {
            if (value < 0) {
                if (value >= -10) { // -- Está na tolerância para atraso
                    value = 0;
                }
            } else {
                if (value <= 10) {
                    value = 0; // -- Está na tolerância para saldo
                }
            }
        }
        
        count += value;
    });

    return count;

};

export default HourStringToDateFormat;
export { TimeValidate, ShowBalance };