// $(function() {
//     $('.navbar-control').keypress(function (event) {
//         if (event.which == 13) {
//             var item = $('.search-history').append($("<li><img class='remove-item' src='remove' /></li><span></span>"));
//             item.find('span').html($(this).val());

//             $(this).val('');
//             return false;
//         }
//     });

//     $("body").on("click", ".remove-item", function() {
//         $(this).parent().remove();
//     });
// });
$(function() {
    $("#searchInput").keypress(function(event) {
        if (event.which == 13) {
            var item = $('.search-history').append($("<li><img class='remove-item' src='remove' /></li><span></span>"));
            item.find('span').html($(this).val());

            $(this).val('');
            return false;
        }
    });
    $("body").on("click", ".remove-item", function() {
        $(this).parent().remove();
    });

});
