// Wait for the document to be ready
$(document).ready(function() {
    $('.nav__toggle-btn').click(function () {
        $(this).toggleClass('active');
        console.log("Clicked menu button");
        $(".nav__wrapper").toggleClass("nav__wrapper--visible");
    });

    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.nav').addClass('navappear');
            console.log("OK");
        } else {
            $('.nav').removeClass('navappear');
        }
    });
});
