const reverseStr = (str) => {
    let listOfCharts = str.split('');
    let reverseListOfChars = listOfCharts.reverse();
    let reversedStr = reverseListOfChars.join("");
    return reversedStr;
}

const isPalindrome = (str) => {
    let reverse = reverseStr(str);
    return str === reverse;
}

const convertDateToString = (date) => {
    let dateStr = {
        day: " ",
        month: " ",
        year: " ",
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}

const getAllDateFormats = (date) => {

    let dateStr = convertDateToString(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

const checkPalindromeForAllDateFormats = (date) => {
    let listOfPalindromes = getAllDateFormats(date);

    let flag = false;
    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

const isLeapYear = (year) => {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

const getPreviousDate = (date) => {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3 && day === 0) {
        if (isLeapYear(year)) {
            day = 29;
            month--;
        } else {
            day = 28;
            month--;
        }
    } else {
        if (day === 0) {
            month--;
            day = daysInMonth[month - 1]
        }
    }
    if (month <= 0) {
        day = 31
        month = 12
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

const getNextPalindromeDate = (date) => {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        var nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

const getPreviousPalindromeDate = (date) => {
    var counterForPrevious = 0;
    var previousDate = getPreviousDate(date)
    while (1) {
        counterForPrevious++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        var previousDate = getPreviousDate(previousDate)
    }
    return [counterForPrevious, previousDate];
}

const dateInputRef = document.querySelector("#birthday-date");
const showButtonRef = document.querySelector("#show-button");
const resultRef = document.querySelector("#result");
const privacyNote = document.querySelector("#privacy-policy");
const privacyPolicyBtn = document.querySelector("#privacy-button");
const result_PerviousPaildrome = document.querySelector("#result-previous-pailndrome");
const result_NearestPaildrome = document.querySelector("#result-nearest-pailndrome");

const clickHandler = () => {
    let birthdayStr = dateInputRef.value;

    if (birthdayStr !== " ") {
        let listOfDate = birthdayStr.split("-");

        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        let isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            resultRef.innerText = "Your Birthday is Palindrome"
        } else {
            let [counter, nextDate] = getNextPalindromeDate(date);
            let [counterForPrevious, previousDate] = getPreviousPalindromeDate(date)

            resultRef.innerText = `Your birthdate is not palindrome, Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.`

            result_PerviousPaildrome.innerHTML = ` Previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}.`

            if (counter > counterForPrevious) {
                result_NearestPaildrome.innerHTML = `Among those two nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}. You missed it by ${counterForPrevious} days.`
            } else {
                result_NearestPaildrome.innerHTML = `Among those, nearest palindrome date from your birthdate is ${nextDate.day}-${nextDate.month}-${nextDate.year}. & You missed it by ${counter}  ${counter === 1 ? 'day' : 'days'}.`
            }
        }

    }
}

showButtonRef.addEventListener("click", clickHandler);

privacyPolicyBtn.addEventListener("click", () => {
    privacyNote.style.visibility = "hidden";
});