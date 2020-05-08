const baseFullDate = ["24.08.1", "Tuesday"];

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
    const parseBaseDate = parseDate(baseFullDate[0]);
    const parseEnterValue = parseDate(val);

    if (parseEnterValue.length === 3) {
        if ((parseEnterValue[0] > 0 && parseEnterValue[0] <= 30) && (parseEnterValue[1] > 0 && parseEnterValue[1] <= 12)) {
            document.getElementById('str').innerHTML = "Day of the week: " + findTheDayOfTheWeekOnChronos(parseBaseDate, parseEnterValue);
        } else alert("Input Error");
    } else alert("Input Error");

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

    const baseDateDay = baseFullDate[1];
    let baseDateDayIndex = 0;
    for (let i = 0; i < daysOfTheWeek.length; i++) {
        if (baseDateDay === daysOfTheWeek[i]) {
            baseDateDayIndex = i;
        }
    };
    console.log(baseDateDayIndex)
    let countOfYearsPassed = baseDate[2] - targetDate[2];
    const a = -1
    if (countOfYearsPassed < 0) { countOfYearsPassed = countOfYearsPassed * a }
    const leapYearsPast = findLeapYearsElapsedFromEnteredDate(baseDate, targetDate);
    const countOfLeapYears = leapYearsPast.length;

    const countOfNormalYears = countOfYearsPassed - countOfLeapYears;
    const countOfDaysInTheCurrentYear = (targetDate[1] * 30) + targetDate[0];
    const countOfDaysInTheBaseYear = (baseDate[1] * 30) + baseDate[0];

    const sumOfDaysAfterBaseDate = (countOfLeapYears * countOfLeapDays) + (countOfNormalYears * countOfNormalDays) + (countOfDaysInTheCurrentYear - countOfDaysInTheBaseYear);
    const targetDateOfTheWeek = (sumOfDaysAfterBaseDate % 7);


    const dayOfTheWeekIndex = baseDateDayIndex + targetDateOfTheWeek;
    let needIndex = null;
    let trueDayOfTheWeek = null;
    if (dayOfTheWeekIndex >= daysOfTheWeek.length) {
        needIndex = dayOfTheWeekIndex - daysOfTheWeek.length;
        trueDayOfTheWeek = daysOfTheWeek[needIndex];
    }
    else {
        trueDayOfTheWeek = daysOfTheWeek[dayOfTheWeekIndex];
    }
    return trueDayOfTheWeek;
}