
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
     $('#toggle_message').click(function(){
        $('#container4').toggle('fast');

        // if(value =='Positive'){
        //     $('#toggle_message').attr('value','Negative');
        //     }else if(value == 'Negative'){
        //     $('#toggle_message').attr('value','Positive');
        // }
    });

     // start signup function
    var ck_username = /^[A-Za-z0-9_]{3,20}$/;
    var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{6,20}$/;
    // Username validation
    $('#signup-name').keyup(function(){
        var username=$(this).val();
        if (!ck_username.test(username)){
            $(this).next().show().html("Min 3 charts no space");
        }else{
            $(this).next().hide();
        }
    });
    // Password validation
    $('#signup-password').keyup(function(){
        var password=$(this).val();
        if (!ck_password.test(password)){
            $(this).next().show().html("Min 6 Charts");
        }else{
            $(this).next().hide();
        }
    });
    // Submit button action
    $('#signup').click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        if(ck_username.test(username) && ck_password.test(password)){
            $("#signup-body").show().html("<h1>Thank you!</h1>");
        }
        return false;
    });

});



