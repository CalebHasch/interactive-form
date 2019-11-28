const $otherTitle = $('#other-title');
const $title = $('#title');
const $design = $('#design');
const $colorOptions = $('#color option');
const $checkboxes = $( ":checkbox" );
const $total = $('<span></span>').text('Total = $');
const $cost0 = $('<span></span>').text('0');
const $payment = $('#payment');
const $checkboxErrorMessage = $('<span></span>').text('You must pick one!').css({'color':'red', 'border':'2px solid red'});
const $invalidInput = $('<span></span>').text('Invalid Input!').css({'color':'red', 'border':'2px solid red'});
let cost = 0;

$('#name').focus();

$otherTitle.hide();

$title.on('change', function() {
    if ($title.val() === 'other') {
      $otherTitle.show();  
    } else {
      $otherTitle.hide();
    }
});

$colorOptions.eq(0).text('Please select a T-Shirt theme');
$colorOptions.each(function(index) {
    $colorOptions.attr('disabled', true);
    $colorOptions.attr('hidden', true);
});

$design.on('change', function() {
    if ($('#design option').length === 3) {
        $('#design option').eq(0).remove();
    }
    if($design.val() === 'js puns') {
        $('#color').val('cornflowerblue');
        $colorOptions.eq(0).text('Cornflower Blue (JS Puns shirt only)');
        for (let i = 0; i < 3; i++) {
            $colorOptions.eq(i).removeAttr('hidden');
            $colorOptions.eq(i).removeAttr('disabled');
            $colorOptions.eq(i + 3).attr('disabled', true);
            $colorOptions.eq(i + 3).attr('hidden', true);
        }
    }
    else if($design.val() === 'heart js') {
        $('#color').val('tomato');
        for (let i = 3; i < 6; i++) {
            $colorOptions.eq(i).removeAttr('hidden');
            $colorOptions.eq(i).removeAttr('disabled');
            $colorOptions.eq(i - 3).attr('disabled', true);
            $colorOptions.eq(i - 3).attr('hidden', true);
        }
    }
})

$('.activities').append($total);
$total.after($cost0);

$checkboxes.on('change', function(event) {
    for (let i = 1; i < 7; i++) {
         const disabledMessage = $('<span></span>').text('Unavailable due to time confliction');
        if ($(event.target).attr('name') === $checkboxes.eq(i).attr('name')) {
        } else if ($(event.target).prop('checked') === true && $(event.target).attr('data-day-and-time') === $checkboxes.eq(i).attr('data-day-and-time')) {
            $checkboxes.eq(i).attr('disabled', true);
            $('.activities label').eq(i).before(disabledMessage); 
        } else if ($(event.target).attr('data-day-and-time') === $checkboxes.eq(i).attr('data-day-and-time')) {
            $checkboxes.eq(i).removeAttr('disabled');
            $('.activities label').eq(i-1).next().remove();
            console.log(disabledMessage);
        }
    }
    if ($(event.target).prop('checked') === true) {
        cost += parseInt($(event.target).attr('data-cost'));
        $cost0.text(cost);
    } else {
        cost -= parseInt($(event.target).attr('data-cost'));
        $cost0.text(cost);
    }
});

function hidePayments() {
    $('#credit-card').hide();
    $('#bitcoin').hide();
    $('#paypal').hide();
}

$('#payment option').eq(0).attr('disabled', true);
hidePayments();
$payment.val('credit card');
$('#credit-card').show();

$payment.on('change', function() {
    if($payment.val() === 'paypal') {
        hidePayments();
        $('#paypal').show();
    } else if($payment.val() === 'bitcoin') {
        hidePayments();
        $('#bitcoin').show();
    } else if($payment.val() === 'credit card') {
        hidePayments();
        $('#credit-card').show();
    }
});

//namefield .+
//email ^[^@]+@[^@.]+.[a-z]+$
//zip ^\d{5}$
//credit card ^\d{13}\d?\d?\d?$
// CVV ^\d{3}$

function checkboxValidation() {
    for (let i = 0; i < $checkboxes.length; i++) {
        if ($checkboxes.eq(i).prop('checked')) {
            return;
        }
    }
    $checkboxErrorMessage.remove();
    $('.activities legend').after($checkboxErrorMessage);
}

function nameValidation() {
  let result = /.+/.test($('#name').val());
  if (!result) {
      $('#name').before($invalidInput);
  } 
}

function emailValidation() {
    let result = /.+/.test($('#mail').val());
    if (!result) {
        $('#mail').before($invalidInput);
        console.log('hi');
    } 
}
function cardNumberValidation() {
    let result = /^[^@]+@[^@.]+.[a-z]+$/.test($('#name').val());
    if (!result) {
        $('#name').before($invalidInput);
    } 
}

function zipCodeValidation() {
    let result = /.+/.test($('#name').val());
    if (!result) {
        $('#name').before($invalidInput);
    } 
}

function cvvValidation() {
    let result = /.+/.test($('#name').val());
    if (!result) {
        $('#name').before($invalidInput);
    } 
}