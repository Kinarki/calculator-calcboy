//var my_calculator = new Calculator(calcFunction);
var num_array = [''];
var i = 0;
var operator = null;
var num1 = null;
var num2 = null;
var op = null;
var result = null;


function inputDigit(number) {
    num_array[i] += number;
    refreshDisplay();
}

function refreshDisplay() {
    $('#output').text(num_array.join(' '));
}

function incrementArray(oper) {
    i++;
    num_array.push(oper);
    refreshDisplay();
    i++;
    num_array.push('');
}

$(document).ready(function(){
    $('.operands').on('click', 'button', function(){
        var val = $(this).val();

        inputDigit(val);
    });

    $('.ope').on('click', 'button', function(){
       operator = $(this).val();

        incrementArray(operator);
    });
});

//function doMath(){
//    var temp_array = num_array.join(' ');
//    result = eval(temp_array);
//    $('#output').text(result);
//    num_array = [''];
//    i = 0;
//    num_array[i] += result;
//}

function clearLast() {
    var temp = num_array.join(' ');
    var tempo = temp.substring(0, temp.length-1);
    num_array = tempo.split(' ');
    i = num_array.length-1;
    $('#output').text(tempo);
}

function clearEverything() {
    $('#output').text(0);
    num_array = [''];
    i = 0;
    result = null;
    operator = null;
    num1 = null;
    num2 = null;
    op = null;
}

function decimalPoint() {
    num_array[i] += '.';
    refreshDisplay();
}


function doMaths () {
    for (var i = 0; i < num_array.length; i++) {
        if (isNaN(num_array[i])) {
            if (op == null) {
                op = num_array[i];
                num1 = parseFloat(num_array[i -1]);
                num2 = parseFloat(num_array[i +1]);

                result = calculate(num1, num2, op);

                num_array[i -1] = result;
                num_array.splice(i,2);

                refreshDisplay();

                result = null;
                operator = null;
                num1 = null;
                num2 = null;
                op = null;
                i = 0;
            }
        }
    }
}

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            result = (num1 + num2);
            break;
        case '-':
            result = (num1 - num2);
            break;
        case '/':
            if (num2 === 0) {
                result = 'error: can\'t divide by 0! You are messing with dark forces you can\'t even begin to comprehend!';
            }
            else {
                result = (num1 / num2);
            }
            break;
        case '*':
            result = (num1 * num2);
            break;
        //default:
    }
    return result;
}