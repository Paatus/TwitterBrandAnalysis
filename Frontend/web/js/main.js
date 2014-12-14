

$(function() {



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

    //
    //
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

    // login function
    //
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

    // login cookies
    // function createCookies(name, value, days){
    //     var expires;

    //     if(days){
    //         var date=new Date();
    //         date.setTime(data.getTime()+(day*24*60*60*1000));
    //         expires="; expires=" +data.toGMTSstring();
    //     } else{
    //         expires="";
    //     }
    //     document.cookie=escape(name) + "=" + escape(value) + expires + "; path=/";
    // }

    // function readCookie(name) {
    //     var nameEQ = escape(name) + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    //         if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    //     }
    //     return null;
    // }

    // function eraseCookie(name) {
    //     createCookie(name, "", -1);
    // }
    // login submit
<<<<<<< Updated upstream
    //$('#login').click(function(){
    //   $("#login-body").show().html("<h1>Thank you!</h1>");
    //   alert('submited');
    //});
=======
    $('#login').click(function(){
       $("#login-body").show().html("<h1>Thank you!</h1>");
       alert('submited');
       $("#login-form").submit();
    });
>>>>>>> Stashed changes

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



