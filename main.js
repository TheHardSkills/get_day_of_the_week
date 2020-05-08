//const baseDate = ["24.08.1001", "Tuesday"];
const baseDate = ["24.08.1", "Tuesday"];

const parseDate = (date) => {
    const dateArray = date.split('.');
    let arr = [];
    for (let i = 0; i < dateArray.length; i++) {
        arr.push(Number(dateArray[i]));
    }
    return arr;
}

var sendButton = document.getElementById('sendButton');

sendButton.onclick = function () {
    let val = document.getElementById('enterYear').value;
    const parseBaseDate = parseDate(baseDate[0]);
    const parseEnterValue = parseDate(val);

    if (parseEnterValue.length === 3) {
        document.getElementById('str').innerHTML = "Day of the week: " + findTheDayOfTheWeekOnChronos(parseBaseDate, parseEnterValue);
    }
    else alert("Input Error");

};

const findLeapYearOnChronos = (year) => {
    let leapYear = 0;
    if (year % 5 === 0) {
        if (year % 100 === 0) {
            if (year % 500 === 0) {
                leapYear = year;
            }
        }
        else leapYear = year;
    }
    return leapYear;
}
const findLeapYearsElapsedFromEnteredDate = (baseDate, targetDate) => {
    const targetDateYear = targetDate[2];
    const baseDateYear = baseDate[2];


    let listOfYearsBefore = [];
    for (let i = (baseDateYear - 0); i < targetDateYear; i++) {
        listOfYearsBefore.push(i);
    }

    let listOfLeapYear = [];
    for (let i = 0; i < listOfYearsBefore.length; i++) {
        let res = findLeapYearOnChronos(listOfYearsBefore[i]);
        if (res !== 0) {
            listOfLeapYear.push(res);
        }
    }
    return listOfLeapYear;
}

const findTheDayOfTheWeekOnChronos = (baseDate, targetDate) => {
    const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const countOfLeapDays = 361;
    const countOfNormalDays = 360;

    let countOfYearsPassed = baseDate[2] - targetDate[2];
    const a = -1
    if (countOfYearsPassed < 0) { countOfYearsPassed = countOfYearsPassed * a }
    const leapYearsPast = findLeapYearsElapsedFromEnteredDate(baseDate, targetDate);
    const countOfLeapYears = leapYearsPast.length;

    const countOfNormalYears = countOfYearsPassed - countOfLeapYears;
    const countOfDaysInTheCurrentYear = (targetDate[1] * 30) + targetDate[0];

    const sumOfDaysAfterBaseDate = (countOfLeapYears * countOfLeapDays) + (countOfNormalYears * countOfNormalDays) + countOfDaysInTheCurrentYear + 3;
    const targetDateOfTheWeek = (sumOfDaysAfterBaseDate % 7);

    let dayOfTheWeek = "";
    switch (targetDateOfTheWeek) {
        case 0:
            dayOfTheWeek = "Monday";
            break;
        case 1:
            dayOfTheWeek = "Tuesday";
            break;
        case 2:
            dayOfTheWeek = "Wednesday";
            break;
        case 3:
            dayOfTheWeek = "Thursday";
            break;
        case 4:
            dayOfTheWeek = "Friday";
            break;
        case 5:
            dayOfTheWeek = "Saturday";
            break;
        case 6:
            dayOfTheWeek = "Sunday";
            break;

        default:
            console.log(targetDateOfTheWeek);
            console.log("something wrong..");
            break;
    }

    return dayOfTheWeek;
}