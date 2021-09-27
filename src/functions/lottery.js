
export const splitArray = (array, parameter) => {
    let arrayOfArrays = [];
    let subArray = [];
    let lastValue = array[0][parameter];

    array.forEach((element, index) => {
        if (element[parameter] === lastValue) {
            subArray.push(element)
        } else if (element[parameter] < lastValue) {

            arrayOfArrays.push(subArray);
            lastValue = element[parameter];
            subArray = [];
            subArray.push(element);
        }
        if (index + 1 === array.length) arrayOfArrays.push(subArray);
    })

    return (arrayOfArrays)
}

export const generateLottery = (properties) => {
    let lottery = [];
    properties.forEach(property => {
        for (let i = 0; i < property.tickets; i++) {
            lottery.push(property.pId);
        }

    });
    return lottery;
}

let winners = [];
export const raffle = (lottery) => {
    let random = Math.round(Math.random() * (lottery.length - 1 - 0) + 0);
    let winner = lottery[random];
    //console.log('ganador',winner)
    winners.push(winner);
    let newLottery = lottery.filter(value => {
        return value !== winner;
    });
    if (newLottery.length === 0) {
        return winners;
    } else {
        return raffle(newLottery);
    }
}

export const applyLotteryToAll = (arrayOfArrays) => {
    let sortedByLottery = [];
    arrayOfArrays.forEach((element) => {
        //console.log("Aplicada:", raffle(generateLottery(element)));
        //console.log('indexRaffle',index)
        sortedByLottery = raffle(generateLottery(element))
    });
    winners = []
    return sortedByLottery
}