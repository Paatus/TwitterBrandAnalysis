
// $(function() {
//     $("#searchInput").keypress(function(event) {
//         if (event.which == 13) {
//             var item = $('.search-history').append($("<li><img class='remove-item' src='remove' /><span></span></li>"));
//             // var item = $('.search-history').append($("<li><span></span></li>"));
//             item.find('span').html($(this).val());

//             $(this).val('');
//             return false;
//         }
//     });
//     $("body").on("click", ".remove-item", function() {
//         $(this).parent().remove();
//     });
//     $("#searchButton").click(function(){
//         $("#searchInput").keypress();
//     });

// });
$(function() {
    $('#search-the-world').submit(function( event ) {
        event.preventDefault();
        var value = $(this).find('input').val();

        if (value.trim() !== "") {
            var item = $("<li><span></span></li>");
            item.first('span').html($(this).find('input').val());

            $('.search-history').prepend(item);

            $(this).find('input').val('');
        }
        return false;
    });
    $("body").on("click", 'li', function() {
        $(this).remove();
    });
     $('#toggle_message').(function(){
        $('#container4').toggle('fast');

        // if(value =='Positive'){
        //     $('#toggle_message').attr('value','Negative');
        //     }else if(value == 'Negative'){
        //     $('#toggle_message').attr('value','Positive');
        // }
    });

});



