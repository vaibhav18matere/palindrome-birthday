console.log("let's start !");

function reverseStr(str) {
    var listOfCharts = str.split('');
    var reverseListOfChars = listOfCharts.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}


console.log(isPalindrome("242"));
console.log(isPalindrome("12321"));
console.log(isPalindrome("nani"));
console.log(isPalindrome("mama"));
