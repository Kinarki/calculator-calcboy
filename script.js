//var my_calculator = new Calculator(calcFunction);
var num_array = [''];
var i = 0;
var operator = null;
var result;

function input_digit(number) {
    num_array[i] += number;
    $('#output').text(num_array.join(' '));
}

function increment_array(oper) {
    i++;
    num_array.push(oper);
    $('#output').text(num_array.join(' '));
    i++;
    num_array.push('');
}

$(document).ready(function(){
    $('.operands').on('click', 'button', function(){
        var val = $(this).val();

        input_digit(val);
    });

    $('.ope').on('click', 'button', function(){
       operator = $(this).val();

        increment_array(operator);
    });
});

function doMath(){
    var temp_array = num_array.join(' ');
    result = eval(temp_array);
    $('#output').text(result);
    num_array = [''];
    i = 0;
    num_array[i] += result;
}

function clearLast() {
    var temp = num_array.join(' ');
    var temp = temp.substring(0, temp.length-1);
    num_array = temp.split(' ');
    i = num_array.length-1;
    $('#output').text(temp);
}

function clearEverything() {
    $('#output').text(0);
    num_array = [''];
    i = 0;
    operator = null;
}

function decimalPoint() {
    $('#output').text(num_array[i] += '.');
}


//function doMath (num1, num2, op) {
//    num1 = parseInt(number1);
//    num2 = parseInt(number2);
//    op = operator;
//    var result;
//    console.log(num1, op, num2);
//
//    switch (op) {
//        case '+':
//            result = (num1 + num2);
//            break;
//        case '-':
//            result = (num1 - num2);
//            break;
//        case '/':
//            if (num2 === 0) {
//                result = 'error: can\'t divide by 0! You are messing with dark forces you can\'t even begin to comprehend!';
//            }
//            else {
//                result = (num1 / num2);
//            }
//            break;
//        case 'x':
//            result = (num1 * num2);
//            break;
//    }
//}