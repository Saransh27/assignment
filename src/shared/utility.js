import moment from 'moment';
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export function between(startdate, enddate, inputdate = moment().format('MM/DD/YYYY')) {
    const momentA = moment(startdate,"MM/DD/YYYY");
    const momentB = moment(enddate,"MM/DD/YYYY");
    const dateToVerify = moment(inputdate,'MM/DD/YYYY');
    if (dateToVerify >= momentA && dateToVerify<=momentB) return true;
    return false
}

export function currencyFormat (number) 
{
    if(!number) return 'budget not specified';

    return Math.abs(Number(number)) >= 1.0e+9
    ? (Math.abs(Number(number)) / 1.0e+9).toFixed(1) + "B"
    : Math.abs(Number(number)) >= 1.0e+6

    ? (Math.abs(Number(number)) / 1.0e+6).toFixed(1) + "M"
    : Math.abs(Number(number)) >= 1.0e+3
    ? (Math.abs(Number(number)) / 1.0e+3).toFixed(1) + "K"
    : (Math.abs(Number(number))).toFixed(1);
}
