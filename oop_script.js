(function() {

    // handles calculations and array manipulation
    var Calculation = function(array, infoHandler) {
        var calc = this;

        // multiply method
        calc.multiply = function(num1, num2) {
            return parseFloat(num1) * parseFloat(num2);
        };

        // divide method
        calc.divide = function(num1, num2, array) {

            // check to see if dividing by 0
            if(num2 === '0') {

                // alert to let the user know they can't divide by 0
                alert('Can\'t divide by 0.  You are messing with dark forces you can\'t even begin to comprehend');

                // clear array
                array = [''];
                return array;
            }
            else {
                return parseFloat(num1) / parseFloat(num2);
            }
        };

        // addition method
        calc.add = function(num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
        };

        // subtraction method
        calc.subtract = function(num1, num2) {
            return parseFloat(num1) - parseFloat(num2);
        };

        // method to search array passed by Info_handler
        calc.operatorCheck = function(array, infoHandler) {

            // variables to check array with indexOf()
            var multiplyChar = "*";
            var divideChar = '/';
            var addChar = '+';
            var subChar = '-';

            // no need to check if operators are present
            if (array.length <= 1) {
                return array;
            }
            else {
                // searching array for '*'
                if (array.indexOf(multiplyChar) != -1) {

                    // locating first index of '*' for array manipulation
                    var multiIndex = array.indexOf(multiplyChar);

                    // grabbing numbers on either side of operator for calculation
                    var multiply = calc.multiply((array[(multiIndex - 1)]), (array[(multiIndex + 1)]));

                    // replacing returned sum in to array while cutting out numbers
                    // and operator used in calculation
                    array.splice((multiIndex - 1), 3, multiply);
                }

                // searching array for '/'
                else if (array.indexOf(divideChar) != -1) {

                    // locating first index of '/' for array manipulation
                    var diviIndex = array.indexOf(divideChar);

                    // grabbing numbers on either side of operator for calculation
                    var divide = calc.divide((array[(diviIndex - 1)]), (array[(diviIndex + 1)]), array);

                    // replacing returned sum in to array while cutting out numbers
                    // and operator used in calculation
                    array.splice((diviIndex - 1), 3, divide);
                }
                else {
                    // searching array for '+'
                    if (array.indexOf(addChar) != -1) {

                        // locating first index of '+'
                        var addIndex = array.indexOf(addChar);

                        // grabbing numbers on either side of operator for calculation
                        var addition = calc.add((array[(addIndex - 1)]), (array[(addIndex + 1)]), addChar);


                        // replacing returned sum in to array while cutting out numbers
                        // and operator used in calculation
                        array.splice((addIndex-1), 3, addition);

                    }

                    // searching for '-'
                    else if (array.indexOf(subChar) != -1) {

                        // locating first index of '-'
                        var subIndex = array.indexOf(subChar);

                        // grabbing numbers on either side of operator for calculation
                        var subtract = calc.subtract((array[(subIndex - 1)]), (array[(subIndex+1)]), subChar);

                        // replacing returned sum in to array while cutting out numbers
                        // and operator used in calculation
                        array.splice((subIndex - 1), 3, subtract);
                    }
                }
                // repeat operatorCheck until less than 3 indexes are available
                if (array.length >= 3) {
                    calc.operatorCheck(array, infoHandler);
                }

                // refresh display
                infoHandler.refreshDisplay();
            }
        };
    };  // end Calculation object



    // handles information manipulation
    var Info_handler = function (calculator) {
        var info = this;
        var num_array = [''];

        // refresh display
        info.refreshDisplay = function() {
            $('#output').text(num_array.join(' '));
        };

        // method for single clear
        info.clear = function() {

            // saving array[index] for manipulation
            var temp = num_array[num_array.length - 1];

            // if an empty array set and user clicks 'C' too much
            // resets to the initial saved variable
            if (num_array.length === 1 && num_array[0] === "") {
                info.clearAll();
            }
            // checks if an operator is present
            // and is not a decimal point
            else if (isNaN(parseFloat(temp)) && temp !== '.') {

                // two pops for the way I set up my array in info.inputDigit
                num_array.pop();
                num_array.pop();
            }
            else {
                // slicing last number off temp holder
                temp = temp.slice(0, temp.length - 1);

                // replacing new spliced number in array
                num_array.splice((num_array.length - 1), 1, temp);
            }

            // refresh display
            info.refreshDisplay();
        };

        // resets array and display to original setting
        info.clearAll = function() {
            num_array = [''];
            $('#output').text(0);
        };

        // method used to set up array
        info.inputDigit = function(character) {

            // checking for numbers 0-9 and decimal
            if (character >= 0 && character <= 9 || character === '.') {

                // while true concats digits and decimal with previous index
                num_array[num_array.length - 1] += character;
            }

            // checking for operators
            else if (character === '+'  ||
                character === '-'  ||
                character === '*'  ||
                character === '/') {

                // checking if previous index is not an operator
                if(!isNaN(parseFloat(num_array[num_array.length - 1]))) {

                    // pushing an empty string to the following index
                    // for easier manipulation with digits
                    num_array.push(character, '');
                }

                // alert user not able to input two consecutive operators
                else {
                    alert('Can\'t add an operator yet.');
                }
            }

            // refresh display
            info.refreshDisplay();

            // returns array for manipulation
            return num_array;
        };

        // method to call calculation
        info.calculate = function(calculator, infoHandler) {
            if (num_array.length > 2) {

                // calling the main manipulator method
                calculator.operatorCheck(num_array, infoHandler);
            }
        };
    };  // end Info_handler object


    $(document).ready(function() {

        // instantiating constructors
        var infoHandler = new Info_handler();
        var calculator = new Calculation();

        // setting up buttons for click, keypress and keydown
        $('button').click(function(){
            var value = $(this).val();
            var operator = function(target, className) {
                $(target).addClass(className);
                setTimeout(function() {
                    $(target).removeClass(className)
                }, 200);
            };

            switch(value) {

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                    infoHandler.inputDigit(value);
                    break;
                case '*':
                    operator('.ope', 'shift-down');
                    infoHandler.inputDigit(value);
                    break;
                case '/':
                    operator('.ope', 'shift-right');
                    infoHandler.inputDigit(value);
                    break;
                case '+':
                    operator('.ope', 'shift-up');
                    infoHandler.inputDigit(value);
                    break;
                case '-':
                    operator('.ope', 'shift-left');
                    infoHandler.inputDigit(value);
                    break;

                case 'CE':
                    infoHandler.clearAll();
                    break;

                case 'C':
                    infoHandler.clear();
                    break;

                case '=':
                    infoHandler.calculate(calculator, infoHandler);
                    break;

                default:
                    break;
            }
        });

        $(document).keydown(function(e) {

            // equals operator 187 = '=', 13 = Enter key
            if (e.which === 187 || e.which === 13) {

                // passes info to infoHandler
                infoHandler.calculate(calculator, infoHandler);
            }

        });

        $(document).keypress(function(e) {

            // operators - keypad
            // 42 = '*', 43 = '+', 45 = '-', 46 = '.', 47 = '/'
            // digits - keypad
            // 48 - 57 = 0 - 9
            // digits - numpad
            // 96 - 105 = 0 - 9
            // operators - numpad
            // 106 = '*', 107 = '+', 108 = '-', 109 = '.', 110 = '/'

            if ((e.which > 41 && e.which < 44) ||
                (e.which > 44 && e.which < 58) ||
                (e.which > 95 && e.which < 112)) {

                var keyPressed = String.fromCharCode(e.which);

                // passes digit or operator to infoHandler
                infoHandler.inputDigit(keyPressed);
            }
        });
    });

}());