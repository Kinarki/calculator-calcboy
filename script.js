var my_calculator = new calculator(calcFunction);


function calcFunction(type, value, item){
    switch(value){
        case undefined:
            $('#output').html('');
            break;
        default:
            $('#output').html(value);
            break;
    }
}

$(document).ready(function(){
    $('button').on('click', function(){
        var val = $(this).val();
        switch (val) {
            case 'CE':
                my_calculator.allClear();
                break;
            default:
                my_calculator.addItem($(this).val());
                break;
        }
    });
});