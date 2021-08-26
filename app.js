console.log("let's start !");

reverseStr = (str) => {
    var listOfCharts = str.split('');
    var reverseListOfChars = listOfCharts.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;
}

isPalindrome = (str) => {
    var reverse = reverseStr(str);
    return str === reverse;
}

convertDateToString = () => {
    var dateStr = {
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

var date = {
    day: 5,
    month: 9,
    year: 2020
}

console.log(convertDateToString(date))