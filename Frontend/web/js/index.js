$(document).ready(function() {
    $("#demosMenu").change(function() {
        window.location.href = $(this).find("option:selected").attr("id") + '.html';
    });
});


$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage'],
        sectionsColor: ['#99c6de', '#99c6de'],
        // sectionsColor: ['#343838', '#343838'],
        afterRender: function() {


            //playing the video
            $('video').get(0).play();
$('video').muted=false;
        },
        css3: true
    });
});

