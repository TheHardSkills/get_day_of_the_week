const constantFullDate = ["24.08.1", "Tuesday"];
const sendButton = document.getElementById('sendButton');

sendButton.onclick = function () {
    const constantFullDate = ["24.08.1", "Tuesday"];

    const enterDate = document.getElementById('enterYear').value;
    const constDateForProcessing = getParsedDate(constantFullDate[0]);
    const enterDateForProcessing = getParsedDate(enterDate);

    if (enterDateForProcessing.length === 3) {
        if ((enterDateForProcessing[0] > 0 && enterDateForProcessing[0] <= 30) && (enterDateForProcessing[1] > 0 && enterDateForProcessing[1] <= 12)) {
            document.getElementById('str').innerHTML = "Day of the week: " + getDayOfTheWeek(getIntermediateCalculations(enterDate));
            (constDateForProcessing, enterDateForProcessing);
        }
        else if (enterDateForProcessing[0] === 31 && enterDateForProcessing[1] === 2) {
            if (getCountOfDaysInYear(enterDateForProcessing[2]) === 361) {
                document.getElementById('str').innerHTML = "Day of the week: " + getDayOfTheWeek(getIntermediateCalculations(enterDate));
            } else alert("Input Error");
        } else alert("Input Error");
    } else alert("Input Error");
};

const getCountOfDaysInYear = (year) => {
    const normalYear = 360;
    const leapYear = 361;
    let countOfDaysInYear = normalYear;
    if (year % 5 === 0) {
        if (year % 100 === 0) {
            if (year % 500 === 0) {
                countOfDaysInYear = leapYear;
            }
        }
        else countOfDaysInYear = leapYear;
    };
    return countOfDaysInYear;
};

const getParsedDate = (date) => {
    const stringFormatDateInArray = date.split('.');
    let dateInArray = [];
    for (let i = 0; i < stringFormatDateInArray.length; i++) {
        dateInArray.push(Number(stringFormatDateInArray[i]));
    };
    return dateInArray;
};

const get_x_1 = (constDate, enterDate) => {
    //count of days from constant date to new year
    const enterDateForProcessing = enterDate;
    const constDateForProcessing = constDate;

    const countOfDays = constDateForProcessing[0] + (constDateForProcessing[1] * 30);
    const countOfDaysInYear = getCountOfDaysInYear(constDateForProcessing[2]);
    let countOfDaysToNewYear = countOfDaysInYear - countOfDays;

    const whatIsThisYear = getCountOfDaysInYear(enterDateForProcessing[2]);
    if (whatIsThisYear === 361 && enterDateForProcessing[1] > 2) { //if the year is a leap year, 2 - February number
        countOfDaysToNewYear += 1;
    };
    if (enterDateForProcessing[2] === constDateForProcessing[2]) {
        countOfDaysToNewYear = 0;
    };
    return countOfDaysToNewYear;
};

const get_x_2 = (constDate, enterDate) => {
    //count of full year from const date to enter date
    const enterDateForProcessing = enterDate;
    const constDateForProcessing = constDate;

    let countOfDaysFromTheEnteredToConstantDate = [];
    for (let i = constDateForProcessing[2] + 1; i <= enterDateForProcessing[2] - 1; i++) {
        const countOfDaysInTheYear = getCountOfDaysInYear(i);
        countOfDaysFromTheEnteredToConstantDate.push(countOfDaysInTheYear);
    };

    let countOfDaysFromEnteredToConstantDate = 0;
    for (let i = 0; i < countOfDaysFromTheEnteredToConstantDate.length; i++) {
        countOfDaysFromEnteredToConstantDate += countOfDaysFromTheEnteredToConstantDate[i];
    };
    return countOfDaysFromEnteredToConstantDate;
};

const get_x_3 = (enterDate) => {
    //count of days from new year to enter date
    const enterDateForProcessing = enterDate;

    const countOfDaysFromNewYearToEnterDate = enterDateForProcessing[0] + (enterDateForProcessing[1] * 30);
    const whatIsThisYear = getCountOfDaysInYear(enterDateForProcessing[2]);
    if (whatIsThisYear === 361 && enterDateForProcessing[1] > 2) { //if the year is a leap year, 2 - February number
        countOfDaysFromNewYearToEnterDate += 1;
    };
    return countOfDaysFromNewYearToEnterDate;
};

const getConstantDataInDays = (enterDateForProcessing) => {
    const constDateForProcessing = getParsedDate(constantFullDate[0]);
    const constantDataInDays = constDateForProcessing[0] + (constDateForProcessing[1] * 30);
    const whatIsThisYear = getCountOfDaysInYear(enterDateForProcessing[2]);
    if (whatIsThisYear === 361 && constDateForProcessing[1] > 2) { //if the year is a leap year, 2 - February number
        constantDataInDays += 1;
    };
    return constantDataInDays;
};

const getIntermediateCalculations = (enterDate) => {
    const constDateForProcessing = getParsedDate(constantFullDate[0]);
    const enterDateForProcessing = getParsedDate(enterDate);

    const getCountOfDays = get_x_1(constDateForProcessing, enterDateForProcessing) + get_x_2(constDateForProcessing, enterDateForProcessing) + get_x_3(enterDateForProcessing);

    let countOfDaysPassedFromConstantToEnteredDate = getCountOfDays;
    if (enterDateForProcessing[2] === constDateForProcessing[2]) {
        countOfDaysPassedFromConstantToEnteredDate = getCountOfDays - getConstantDataInDays(enterDateForProcessing);
    };
    let getCountsOfDaysInNotFullWeek = getCountOfDays % 7;
    if (enterDateForProcessing[2] === constDateForProcessing[2]) {
        getCountsOfDaysInNotFullWeek = countOfDaysPassedFromConstantToEnteredDate % 7;
    };
    return getCountsOfDaysInNotFullWeek;
};


const getDayOfTheWeek = (getCountsOfDaysInNotFullWeek) => {
    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const constDayOfTheWeekForProcessing = constantFullDate[1];
    let indexForConstDayOfTheWeek = 0;
    for (let i = 0; i < daysOfTheWeek.length; i++) {
        if (constDayOfTheWeekForProcessing === daysOfTheWeek[i]) {
            indexForConstDayOfTheWeek = i;
        };
    };
    const res = indexForConstDayOfTheWeek + getCountsOfDaysInNotFullWeek;
    let indexOfTheEnteredDayOfTheWeek = res % 7;

    if (indexOfTheEnteredDayOfTheWeek < 0) {
        indexOfTheEnteredDayOfTheWeek = daysOfTheWeek.length + indexOfTheEnteredDayOfTheWeek;
    };
    const dayOfTheWeek = daysOfTheWeek[indexOfTheEnteredDayOfTheWeek];
    return dayOfTheWeek;
};


