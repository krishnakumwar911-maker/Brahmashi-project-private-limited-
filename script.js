/* =========================================================
   BRAHMARSHI PROJECTS PRIVATE LIMITED
   PREMIUM INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* ================================
       BASIC ELEMENTS
    ================================= */

    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");
    const enquiryForm = document.querySelector("#enquiryForm");


    /* ================================
       MOBILE MENU
    ================================= */

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const opened =
                navigation.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                opened
            );

            menuButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            body.classList.toggle(
                "menu-open",
                opened
            );

        });


        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                body.classList.remove("menu-open");

            });

        });

    }



    /* ================================
       SMOOTH SCROLL
    ================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const id = this.getAttribute("href");

            if (!id || id === "#") return;

            const target = document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });



    /* ================================
       HEADER SCROLL
    ================================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".about-highlight, " +
        ".product-card, " +
        ".project-main, " +
        ".project-item, " +
        ".enquiry-info, " +
        ".enquiry-form, " +
        ".contact-card"
    );


    revealElements.forEach(function (element) {
        element.classList.add("reveal-element");
    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("reveal-visible");
        });

    }



    /* ================================
       STAGGER EFFECT
    ================================= */

    document.querySelectorAll(".product-card")
        .forEach(function (card, index) {

            card.style.setProperty(
                "--animation-delay",
                index * 100 + "ms"
            );

        });


    document.querySelectorAll(".project-item")
        .forEach(function (item, index) {

            item.style.setProperty(
                "--animation-delay",
                index * 120 + "ms"
            );

        });


    document.querySelectorAll(".contact-card")
        .forEach(function (card, index) {

            card.style.setProperty(
                "--animation-delay",
                index * 100 + "ms"
            );

        });



    /* ================================
       ACTIVE NAVIGATION
    ================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".main-navigation a");


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const current =
                        "#" + entry.target.id;

                    navLinks.forEach(function (link) {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === current
                        );

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


        sections.forEach(function (section) {
            navObserver.observe(section);
        });

    }



    /* ================================
       HERO CARD 3D EFFECT
       DESKTOP ONLY
    ================================= */

    const heroCard =
        document.querySelector(".hero-card");

    const desktop =
        window.matchMedia("(hover: hover)").matches;


    if (heroCard && desktop) {

        heroCard.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    heroCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -5;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                heroCard.style.transform =
                    "perspective(900px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg) " +
                    "translateY(-6px)";

            }
        );


        heroCard.addEventListener(
            "mouseleave",
            function () {

                heroCard.style.transform = "";

            }
        );

    }



    /* ================================
       PRODUCT CARD HOVER
       DESKTOP ONLY
    ================================= */

    if (desktop) {

        document.querySelectorAll(".product-card")
            .forEach(function (card) {

                card.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            event.clientX - rect.left;

                        const y =
                            event.clientY - rect.top;

                        const rotateX =
                            ((y / rect.height) - 0.5) * -3;

                        const rotateY =
                            ((x / rect.width) - 0.5) * 3;

                        card.style.transform =
                            "perspective(700px) " +
                            "rotateX(" + rotateX + "deg) " +
                            "rotateY(" + rotateY + "deg) " +
                            "translateY(-6px)";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform = "";

                    }
                );

            });

    }



    /* ================================
       BUTTON RIPPLE
    ================================= */

    document.querySelectorAll(
        ".btn, " +
        ".header-cta, " +
        ".form-submit, " +
        ".hero-card-link, " +
        ".product-card > a, " +
        ".text-link"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "click-ripple";

                const rect =
                    this.getBoundingClientRect();

                ripple.style.left =
                    (event.clientX - rect.left) + "px";

                ripple.style.top =
                    (event.clientY - rect.top) + "px";

                this.appendChild(ripple);

                setTimeout(function () {
                    ripple.remove();
                }, 700);

            }
        );

    });



    /* ================================
       ENQUIRY FORM
    ================================= */

    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.querySelector("#name");

                const company =
                    document.querySelector("#company");

                const email =
                    document.querySelector("#email");

                const phone =
                    document.querySelector("#phone");

                const message =
                    document.querySelector("#message");


                const requiredFields = [
                    name,
                    email,
                    phone,
                    message
                ];


                let valid = true;


                requiredFields.forEach(function (field) {

                    if (!field) return;

                    field.classList.remove(
                        "input-error"
                    );


                    if (
                        field.value.trim() === ""
                    ) {

                        field.classList.add(
                            "input-error"
                        );

                        valid = false;

                    }

                });


                /* EMAIL */

                if (
                    email &&
                    email.value.trim() !== ""
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (
                        !emailPattern.test(
                            email.value.trim()
                        )
                    ) {

                        email.classList.add(
                            "input-error"
                        );

                        valid = false;

                    }

                }


                /* PHONE */

                if (
                    phone &&
                    phone.value.trim() !== ""
                ) {

                    const digits =
                        phone.value.replace(
                            /\D/g,
                            ""
                        );

                    if (digits.length < 10) {

                        phone.classList.add(
                            "input-error"
                        );

                        valid = false;

                    }

                }


                if (!valid) {

                    showMessage(
                        "Please fill all required fields correctly.",
                        "error"
                    );

                    return;

                }


                /* SUCCESS */

                const submit =
                    enquiryForm.querySelector(
                        ".form-submit"
                    );


                if (submit) {

                    const original =
                        submit.innerHTML;

                    submit.disabled = true;

                    submit.innerHTML =
                        "<span>Sending...</span>";


                    setTimeout(function () {

                        submit.innerHTML =
                            "<span>✓ Submitted Successfully</span>";


                        showMessage(
                            "Your enquiry has been submitted successfully!",
                            "success"
                        );


                        enquiryForm.reset();


                        setTimeout(function () {

                            submit.disabled = false;

                            submit.innerHTML =
                                original;

                        }, 2200);

                    }, 700);

                }

            }
        );

    }



    /* ================================
       REMOVE FORM ERRORS
    ================================= */

    document.querySelectorAll(
        ".enquiry-form input, .enquiry-form textarea"
    ).forEach(function (field) {

        field.addEventListener(
            "input",
            function () {

                this.classList.remove(
                    "input-error"
                );

            }
        );

    });



    /* ================================
       NOTIFICATION
    ================================= */

    function showMessage(message, type) {

        const old =
            document.querySelector(
                ".site-notification"
            );

        if (old) old.remove();


        const box =
            document.createElement("div");

        box.className =
            "site-notification " + type;


        box.innerHTML =
            '<span class="notification-icon">' +
            (type === "success" ? "✓" : "!") +
            '</span>' +

            '<span class="notification-message">' +
            message +
            '</span>' +

            '<button class="notification-close" type="button">' +
            "×" +
            "</button>";


        body.appendChild(box);


        setTimeout(function () {

            box.classList.add(
                "notification-show"
            );

        }, 30);


        const close =
            box.querySelector(
                ".notification-close"
            );


        if (close) {

            close.addEventListener(
                "click",
                function () {

                    box.classList.remove(
                        "notification-show"
                    );

                    setTimeout(function () {
                        box.remove();
                    }, 400);

                }
            );

        }


        setTimeout(function () {

            if (!box.isConnected) return;

            box.classList.remove(
                "notification-show"
            );

            setTimeout(function () {
                if (box.isConnected) box.remove();
            }, 400);

        }, 4500);

    }



    /* ================================
       SCROLL PROGRESS
    ================================= */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    body.appendChild(progress);


    function updateProgress() {

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (total <= 0) return;

        const percentage =
            (window.scrollY / total) * 100;

        progress.style.width =
            percentage + "%";

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();



    /* ================================
       BACK TO TOP
    ================================= */

    const topButton =
        document.createElement("button");

    topButton.className =
        "back-to-top";

    topButton.type = "button";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    topButton.innerHTML = "↑";

    body.appendChild(topButton);


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* ================================
       ESC KEY
    ================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") return;


            if (navigation && menuButton) {

                navigation.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* ================================
       FINISHED
    ================================= */

    console.log(
        "Brahmarshi Projects JS Loaded Successfully ✓"
    );

});