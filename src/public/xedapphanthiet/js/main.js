$(function () {


    new WOW().init();

    /*----------  slider index / START  ----------*/

    $('.slOw__sl').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        animateOut: 'fadeOut',
        smartSpeed: 450,
        navText: [
            "<i class='icofont-rounded-left'></i>",
            "<i class='icofont-rounded-right'></i>"
        ],
        autoplay: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dost: true
            },
            600: {
                items: 1,
                nav: true,
                dost: true
            },
            1000: {
                items: 1,
                nav: true,
                dost: true
            }
        }
    });

    // products owl-owlcarseoul

    $('.soph__1').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        item: 4,
        lazyLoad: true,
        animateOut: 'fadeOut',
        smartSpeed: 450,
        autoplay: false,
        autoplayHoverPause: true,
        navText: [
            "<i class='icofont-rounded-left'></i>",
            "<i class='icofont-rounded-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            400: {
                items: 2,
                nav: true,
            },
            600: {
                items: 2,
                nav: true,
            },
            1000: {
                items: 4,
                nav: true,
            }
        }
    });


    $('.news__owl').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        item: 1,
        lazyLoad: true,
        animateOut: 'fadeOut',
        smartSpeed: 450,
        autoplay: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='icofont-rounded-left'></i>",
            "<i class='icofont-rounded-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 1,
                nav: true,
            },
            1000: {
                items: 1,
                nav: true,
            }
        }
    });


    $('.product-details').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        item: 1,
        lazyLoad: true,
        animateOut: 'fadeOut',
        smartSpeed: 450,
        autoplay: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='icofont-rounded-left'></i>",
            "<i class='icofont-rounded-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 1,
                nav: true,
            },
            1000: {
                items: 1,
                nav: true,
            }
        }
    });


    /*----------  slider index / END  ----------*/


    /*----------  show more content details / start  ----------*/

    $('.btn-show-more-content').on('click', function (e) {
        e.preventDefault();
        $('.product-description').removeClass('less-content');
        $(this).hide();

    })
    /*----------  show more content details / end  ----------*/
    var btn = $('#button');
    /*----------  show more content details / end  ----------*/
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 100) { // If page is scrolled more than 50px
            $('.header').addClass('fixed-show');
            btn.addClass('show');
        } else {
            btn.removeClass('show');
            $('.header').removeClass('fixed-show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });
    /*---------- select title / start  ----------*/
    var img_tt = $('.img_tt');
    for (var x = 1; x < img_tt.length; x++) {
        var xString = x.toString();
        var classOld = img_tt[x].classList.value;
        var valueNew = img_tt[x].className = 'img_tt' + ' ' + xString;
        img_tt[x].switchClass = (classOld, valueNew);
    }
    /*----------  select title / end  ----------*/

    /*---------- tittle backgroud randome / start  ----------*/
    var colors = ['#C6504E', '#3C8386'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    $('.soph__title').css("background-color", random_color)
    /*---------- tittle backgroud randome / end  ----------*/

    /*---------- Filter button / start  ----------*/

    $('.filter-button').on('click', function () {
        $('.sidebar__right').addClass('showed');
        $('.bg_grey').addClass('showed');
    });

    $('.bg_grey').on('click', function () {
        $('.sidebar__right').removeClass('showed');
        $(this).removeClass('showed');
    });

    /*---------- tFilter button / end  ----------*/
})



