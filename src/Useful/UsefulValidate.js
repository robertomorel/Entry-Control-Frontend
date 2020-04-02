/*
Script que contém funções gerais de validação
*/

// -- Validação de formato de hora (00:00)
const DateTimeMask = (e, requiredInput = false) => {

    let dateTime = e.target.value;

    /*
    if ( dateTime.length === 4 ){
        dateTime = dateTime.substr(0, 2) + ":" + dateTime.substr(2, 2) + "";  
        e.target.value = dateTime;
    } 
    */

    if (requiredInput && (!dateTime || dateTime.length === 0)) {
        e.target.value = "";
        alert('Preencha a hora de entrada para continuar.');
        return;
    }

    if (dateTime.length !== 5) {
        e.target.value = "";
        alert('A hora informada não é válida.');
        return;
    }


    if (!dateTime.match(/:/)) {
        e.target.value = "";
        alert('A hora informada não é válida.');
        return;
    }

    const time = dateTime.split(":");

    if (parseInt(time[0]) > 23 || parseInt(time[1]) > 59) {
        e.target.value = "";
        alert('A hora informada não é válida.');
        return;
    }

    time.forEach(n => {
        if (isNaN(n)) {
            e.target.value = "";
            alert('A hora informada não é válida.');
            return;
        }
    })

}

// -- Validação entre as horas de intervalo
const HourSequence = (objDate) => {

    const { lunchIniHour, lunchEndHour, endHour } = objDate;

    if (lunchEndHour && !lunchIniHour) {
        alert('Não é possível informar a hora de retorno do intervalo sem antes ter informado a hora de entrada do intervalo.');
        return false;
    }

    if (endHour && !lunchEndHour) {
        alert('Não é possível informar a hora de saída sem antes ter informado a hora de retorno do intervalo.');
        return false;
    }

    return true;

}

export default DateTimeMask;
export { HourSequence };