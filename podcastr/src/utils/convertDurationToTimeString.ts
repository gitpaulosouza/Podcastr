// Ecportando a função para colocar a string de duração na frente de cada episode

export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / 3600); // calculo de quantas horas
    const minutes = Math.floor((duration % 3600)/ 60); // calculo de minutos
    const seconds = duration % 60; // calculo de segundos

    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return timeString;
} // Se a quantidade de  horas for '1' o .padStart vai colocar um '01' deixando hrs, min e sec com 2 digitos
    //.join une os caracteres a partir do caracter que é passado nos ()
    //unit significa cada unidade do array