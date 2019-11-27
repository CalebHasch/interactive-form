const $otherTitle = $('#other-title');
const $title = $('#title');
const $design = $('#design');
const $colorOptions = $('#color option');
const $checkboxes = $( ":checkbox" );

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
//const disabledMessage = $('<span></span>').text('Unavailable due to time confliction');

$checkboxes.on('change', function(event) {
    for (let i = 1; i < 7; i++) {
         const disabledMessage = $('<span></span>').text('Unavailable due to time confliction');
        if ($(event.target).attr('name') === $checkboxes.eq(i).attr('name')) {
        } else if ($(event.target).prop('checked') === true && $(event.target).attr('data-day-and-time') === $checkboxes.eq(i).attr('data-day-and-time')) {
            $checkboxes.eq(i).attr('disabled', true);
            $('.activities label').eq(i).before(disabledMessage); 
        } else if ($(event.target).attr('data-day-and-time') === $checkboxes.eq(i).attr('data-day-and-time')) {
            $checkboxes.eq(i).removeAttr('disabled');
            //disabledMessage.remove();
            console.log(disabledMessage);
        }
    }
});
