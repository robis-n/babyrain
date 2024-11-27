const element = document.querySelector('.nav');

$('.nav__toggle-btn').click(function () {
    var btn = 0;

    $(this).toggleClass('active');
    console.log("Clicked menu button");
    $("#mainListDiv").toggleClass("nav__wrapper--visible");
    $("#mainListDiv").fadeIn();
});

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        /*element.style.display = 'block';*/
        $('.nav').addClass('navappear');
    } else {
        /*element.style.display = 'none';*/
        $('.nav').removeClass('navappear');
    }
});
