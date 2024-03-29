//declaring all the global variables
const $otherTitle = $('#other-title');
const $title = $('#title');
const $design = $('#design');
const $colorOptions = $('#color option');
const $checkboxes = $( ":checkbox" );
const $total = $('<span></span>').text('Total = $');
const $cost0 = $('<span></span>').text('0');
const $payment = $('#payment');
const $checkboxErrorMessage = $('<span></span>').text('You must pick one!').css({'color':'red', 'border':'2px solid red'});
const $zipMessage =$('<span></span>').text('Must enter zip code').css({'color':'red', 'border':'2px solid red'});
const $zipMessage2 = $('<span></span>').text('Must be 5 digits long').css({'color':'red', 'border':'2px solid red'});
let cost = 0;

//focus on name input
$('#name').focus();

//hides the otherTitle text field based on the title selection
$otherTitle.hide();
$title.on('change', function() {
    if ($title.val() === 'other') {
      $otherTitle.show();  
    } else {
      $otherTitle.hide();
    }
});

//sets up the initial setup for theme and color selection
$('#colors-js-puns').hide();
$colorOptions.eq(0).text('Please select a T-Shirt theme');
$colorOptions.each(function(index) {
    $colorOptions.attr('disabled', true);
    $colorOptions.attr('hidden', true);
});

//disables/hides color options based on theme selection
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
    $('#colors-js-puns').show();
})

// creates a cost total and disables checkboxes/ creates message for time constrictions based off user checkbox selection
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
    // adds and subracts to the total based off checkbox selection
    if ($(event.target).prop('checked') === true) {
        cost += parseInt($(event.target).attr('data-cost'));
        $cost0.text(cost);
    } else {
        cost -= parseInt($(event.target).attr('data-cost'));
        $cost0.text(cost);
    }
});

// function for hiding all payment sections
function hidePayments() {
    $('#credit-card').hide();
    $('#bitcoin').hide();
    $('#paypal').hide();
}

// sets credit card section to defualt
$('#payment option').eq(0).attr('disabled', true);
hidePayments();
$payment.val('credit card');
$('#credit-card').show();

//changes which payment fields show up based off selection
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

// checks to see if a checkbox has been checked and sends the appropiate error message
function checkboxValidation() {
    for (let i = 0; i < $checkboxes.length; i++) {
        if ($checkboxes.eq(i).prop('checked')) {
            $checkboxErrorMessage.remove();
            return true;
        }
    }
    $checkboxErrorMessage.remove();
    $('.activities legend').after($checkboxErrorMessage);
    return false;
}

// sends out error message if name field is empty
function nameValidation() {
  let result = /.+/.test($('#name').val());
  let message = $('<span></span>').text('Invalid Input!').css({'color':'red', 'border':'2px solid red'});;
  if ($('#name').prev().text() === 'Invalid Input!') {
    $('#name').prev().remove();
  }
  if (!result) {
      $('#name').before(message);
  } 
  return result;
}

// sends out error message if email isn't formatted correctly and added to a keyup event
function emailValidation() {
    let result = /^[^@]+@[^@.]+.[a-z]+$/.test($('#mail').val()); 
    let message = $('<span></span>').text('Invalid Input!').css({'color':'red', 'border':'2px solid red'});;
    if ($('#mail').prev().text() === 'Invalid Input!') {
        $('#mail').prev().remove();
    }
    if (!result) {
        $('#mail').before(message);
    }
    return result; 
}
$('#mail').on('keyup', function() {
    emailValidation();
});

//sends out error message if the card number isn't formatted correctly
function cardNumberValidation() {
    let result = /^\d{13}\d?\d?\d?$/.test($('#cc-num').val());
    let message = $('<span></span>').text('Invalid Input!').css({'color':'red', 'border':'2px solid red'});;
    if ($('#cc-num').prev().text() === 'Invalid Input!') {
        $('#cc-num').prev().remove();
    }
    if (!result) {
        $('#cc-num').before(message);
    } 
    return result;
}

// sends out error message if the zip code isn't formatted correctly
function zipCodeValidation() {
    let result = /.+/.test($('#zip').val());
    let result2 = /^\d{5}$/.test($('#zip').val());
    $zipMessage.remove();
    $zipMessage2.remove();
    if (!result) {
        $('#zip').before($zipMessage);
    } else if (!result2) {
        $('#zip').before($zipMessage2);
    }
    return result;
}

// sends out error message if the cvv isn't formatted correctly
function cvvValidation() {
    let result = /^\d{3}$/.test($('#cvv').val());
    let message = $('<span></span>').text('Invalid Input!').css({'color':'red', 'border':'2px solid red'});;
    if ($('#cvv').prev().text() === 'Invalid Input!') {
        $('#cvv').prev().remove();
    }
    if (!result) {
        $('#cvv').before(message);
    } 
    return result;
}

// checks to make sure everything is filled and formatted correctly upon clicking submit and stops page from sending if anything is out of place
$('button').on('click', function(event) {
    nameValidation();
    emailValidation();
    checkboxValidation();
    if (nameValidation() === false || emailValidation() === false || checkboxValidation() === false) {
        event.preventDefault();
    }
    if ($payment.val() === 'credit card') {
        cardNumberValidation();
        zipCodeValidation();
        cvvValidation();
        if (cardNumberValidation() === false || zipCodeValidation() === false || cvvValidation() === false) {
            event.preventDefault();
        }
    } 
});