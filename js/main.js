(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $("#partners").hover(
        function() {
            if (!$('.fa-bars').is(":visible")) {
                $(".dropdown-menu").show();
            }
        }, function() {
            if (!$('.fa-bars').is(":visible")) {
                $(".dropdown-menu").hide();
            }
        }
    );

    // Javascript to enable link to tab
    var url = document.location.toString();
    if (url.match('#')) {
        $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
    }

    $('#tab').bind('click', function(event) {
        url = $(this).find('a:first').attr('href');
        console.log(url);
        if (url.match('#')) {
            $('.nav-pills a[href="#' + url.split('#')[1] + '"]').tab('show');
        }
    });

    // Change hash for page-reload
    $('.nav-pills a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    })

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    $("form[name='contactForm']").validate({
        rules: {
            name: "required",
            phone: "required",
            address: "required",
            email: {
                required: true,
                email: true
            },
            acreage: "required",
            parcel: "required",
        },
        messages: {
            name: "Please enter your name",
            phone: "Please enter your phone number",
            address: "Please enter your address",
            email: "Please enter a valid email address",
            acreage: "Please enter your acreage",
            parcel: "Please enter your parcel address"
        },
        submitHandler: function(form) {
            var button = $("#form-submit");
            button.val("Submitting...");
            $.ajax({
                url:'http://formspree.io/' + $("#_sendto").val(),
                type:'post',
                data:$('#contactForm').serialize(),
                success:function(){
                    button.removeClass("form-submit");
                    button.addClass("form-submitted");
                    button.val("Your submission was received!");
                },
                error:function(){
                    button.removeClass("form-submit");
                    button.addClass("form-submitted");
                    button.val("Your submission was received!");
                }
            })
        }
    });

})(jQuery); // End of use strict
