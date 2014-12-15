

$(function() {
// Public Page
    // login function
    $('#login-name').keyup(function(){
        var username=$(this).val();
        if (!ck_username.test(username)){
            $(this).next().show().html("Min 3 charts no space");
        }else{
            $(this).next().hide();
        }
    });
    $('#login-password').keyup(function(){
        var password=$(this).val();
        if (!ck_password.test(password)){
            $(this).next().show().html("Min 6 Charts");
        }else{
            $(this).next().hide();
        }
    });
    $('#login').click(function(){
       $("#login-body").show().html("<h1>Thank you!</h1>");
       $("#login-form").submit();
    });



     // sign-up function
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
            $("#sign-form").submit();
            $("#signup-body").show().html("<h1>Thank you!</h1>");
        }
        return false;
    });




// Pivate page
    //user setting form
    $('#setting').click(function(){
        var newPassward = $("#setting-newpassword").val();
        var comfirmPassward = $("#setting-comfirmpassword").val();
        if(newPassward===comfirmPassward){
            $("#setting-body").show().html("<h1>Thank you!</h1>");
            $("#setting-form").submit();
        }
        return $("#setting-body").show().html("<h3>new passwords are not same</h3>");;

    });
    // keyword area
    // add keywords&edit keywords
    $('#search-the-world').submit(function( event ) {
        event.preventDefault();
        var value = $(this).find('input').val();

        if (value.trim() !== "") {
            var item = $("<li><span></span></li>");
            item.first('span').html($(this).find('input').val());

            $('.search-history').prepend(item);

            $(this).find('input').val('');
            if ($('.search-history li img').length){
                $('.search-history li img').remove();
            };
        }
        return false;
    });
    // load keywords in different page
    var preWords = localStorage.getItem('search-history').replace(/^\"|\"$/g, '');

    preWords.split('","').forEach(function(value) {
        var item = $("<li><span></span></li>");
        item.first('span').html(value);
        $('.search-history').prepend(item);
    });
    // pass stored history to website
    $.ajax({
        url: "/api/keywords/get",
        success: function( data ) {
            jQuery.parseJSON(data).forEach(function(value) {
                $('.search-history').prepend(value);
            });
        }
    });
    $('#editButton').click(function(){
        if ($('.search-history li img').length) {
            $('.search-history li img').remove();
        }else{
            $('.search-history li').append('<img id="deletIcon" src="imgs/delet.png" />');
        };
    });

    $("body").on("click", '#deletIcon', function() {
        $(this).parent().remove();
    });
    // view page
    // dropdown menu for word-cloud
    $('#positive-cloud').click(function(){
        $('#container4').show();
        $('#container41').hide();
        $('#container42').hide();
    });
    $('#negative-cloud').click(function(){
        $('#container41').show();
        $('#container4').hide();
        $('#container42').hide();
    });
    $('#all-cloud').click(function(){
        $('#container42').show();
        $('#container4').hide();
        $('#container41').hide();
    });

});



