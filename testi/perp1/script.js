
const element = document.querySelector('.nav');


$('.nav__toggle-btn').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu button");
    $("#mainListDiv").toggleClass("nav__wrapper--visible");
    $("#mainListDiv").fadeIn();

});

$(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('.nav').addClass('highlight');
                /*element.style.display = 'none';*/
                console.log("OK");
            } else {
                $('.nav').removeClass('highlight');
                /*element.style.display = 'block';*/
            }
        });
