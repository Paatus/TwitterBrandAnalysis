$(document).ready(function() {
    $("#demosMenu").change(function() {
        window.location.href = $(this).find("option:selected").attr("id") + '.html';
    });
});

$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage'],
        sectionsColor: ['#343838', '#343838'],
        afterRender: function() {


            //playing the video
            $('video').get(0).play();
        },
        css3: true
    });
});
