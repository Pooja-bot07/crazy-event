// Mobile nav toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
}

// =========================================
// GALLERY FILTER
// =========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length && galleryItems.length) {

    filterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            // Remove active state from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
            });

            // Add active state to clicked button
            btn.classList.add('active');

            const category = btn.dataset.filter;

            galleryItems.forEach(item => {

                // Check the class of the gallery item
                const show =
                    category === 'all' ||
                    item.classList.contains(category);

                if (show) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }

            });

        });

    });

}



/* =========================================
   CRAZY EVENT INTRO
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const introScreen = document.getElementById("introScreen");

    if (!introScreen) return;

    // Prevent scrolling while intro is playing
    document.body.classList.add("intro-active");


    // Let the CRAZY EVENT title stay visible
    setTimeout(function () {

        introScreen.classList.add("intro-hide");

        document.body.classList.remove("intro-active");

    }, 3000);


    // Completely remove intro after animation
    setTimeout(function () {

        introScreen.remove();

    }, 4000);

});

/* =========================================
   CRAZY EVENT - GALLERY SCROLL REVEAL
========================================= */

const gallerySection = document.querySelector(".section-blush");

if (gallerySection) {

    const galleryObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    gallerySection.classList.add("gallery-visible");

                    galleryObserver.unobserve(gallerySection);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    galleryObserver.observe(gallerySection);
}

/* =========================================
   FULL GALLERY SCROLL ANIMATION
========================================= */

const fullGallery = document.querySelector(".gallery-grid");

if (fullGallery) {

    let galleryAnimated = false;

    function revealFullGallery() {

        if (galleryAnimated) return;

        const rect = fullGallery.getBoundingClientRect();
        const windowHeight =
            window.innerHeight ||
            document.documentElement.clientHeight;

        // Trigger when gallery is close to entering the screen
        if (rect.top <= windowHeight * 0.90) {

            galleryAnimated = true;

            fullGallery.classList.add("gallery-loaded");

            window.removeEventListener(
                "scroll",
                revealFullGallery
            );

        }
    }


    // Check immediately
    revealFullGallery();


    // Check while scrolling
    window.addEventListener(
        "scroll",
        revealFullGallery,
        { passive: true }
    );


    // Check again after the page and images finish loading
    window.addEventListener(
        "load",
        () => {
            setTimeout(() => {
                revealFullGallery();
            }, 300);
        }
    );

}
/* =========================================
   SERVICE SCROLL REVEAL
========================================= */

const serviceItems = document.querySelectorAll('.ce-service-item');

if (serviceItems.length) {
  const serviceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  serviceItems.forEach(item => {
    serviceObserver.observe(item);
  });
}

/* =========================================
   DESIGN SERVICE IMAGE PREVIEW
========================================= */

const designServices = document.querySelectorAll('.design-service');
const designPreviewImage = document.getElementById('designPreviewImage');
const designPreviewTitle = document.getElementById('designPreviewTitle');

if (designServices.length && designPreviewImage && designPreviewTitle) {

    let currentService = 0;
    let autoPlay;

    function showDesignService(index) {

        currentService = index;

        const service = designServices[index];

        // Remove active from all services
        designServices.forEach(item => {
            item.classList.remove('active');
        });

        // Activate selected service
        service.classList.add('active');

        // Get image, title and number
        const image = service.dataset.image;
        const title = service.querySelector('h3').textContent;
        const number = service.querySelector('.design-number').textContent;

        // Fade image out
        designPreviewImage.style.opacity = '0';

        setTimeout(() => {

            designPreviewImage.src = image;
            designPreviewImage.alt = title + ' decoration';

            designPreviewImage.onload = () => {
                designPreviewImage.style.opacity = '1';
            };

            designPreviewTitle.textContent = title;

            const numberElement =
                document.querySelector('.design-preview-label span');

            if (numberElement) {
                numberElement.textContent = number;
            }

        }, 180);
    }


    function startDesignAutoplay() {

        clearInterval(autoPlay);

        autoPlay = setInterval(() => {

            let next = currentService + 1;

            if (next >= designServices.length) {
                next = 0;
            }

            showDesignService(next);

        }, 4000);
    }


    // Change preview when hovering
    designServices.forEach((service, index) => {

        service.addEventListener('mouseenter', () => {
            showDesignService(index);
            startDesignAutoplay();
        });

        service.addEventListener('focus', () => {
            showDesignService(index);
            startDesignAutoplay();
        });

    });


    // Start with first service
    showDesignService(0);

    // Start automatic rotation
    startDesignAutoplay();
}

/* =========================================
   TESTIMONIAL VIDEO CAROUSEL
========================================= */

(function () {

    const slides = document.querySelectorAll(
        ".testimonial-video-slide"
    );

    const videos = document.querySelectorAll(
        ".testimonial-video"
    );

    const dots = document.querySelectorAll(
        ".testimonial-dot"
    );

    const prevButton = document.querySelector(
        ".testimonial-video-prev"
    );

    const nextButton = document.querySelector(
        ".testimonial-video-next"
    );

    const currentNumber = document.getElementById(
        "testimonialCurrent"
    );


    if (!slides.length) return;


    let currentSlide = 0;


    function showSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        currentSlide = index;


        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        if (currentNumber) {

            currentNumber.textContent =
                String(currentSlide + 1).padStart(2, "0");

        }


        videos.forEach(function (video, i) {

            if (i !== currentSlide) {
                video.pause();
            }

        });

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                showSlide(currentSlide - 1);

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                showSlide(currentSlide + 1);

            }
        );

    }


    dots.forEach(function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const index =
                    Number(dot.dataset.slide);

                showSlide(index);

            }
        );

    });


    /*
       Pause other videos when a new video starts.
    */

    videos.forEach(function (video) {

        video.addEventListener(
            "play",
            function () {

                videos.forEach(function (otherVideo) {

                    if (otherVideo !== video) {
                        otherVideo.pause();
                    }

                });

            }
        );

    });


    showSlide(0);

})();
const writtenReviewTrack = document.querySelector(".written-review-track");

if (writtenReviewTrack) {
    const reviewCards = Array.from(
        writtenReviewTrack.querySelectorAll(".written-review-card")
    );

    reviewCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        writtenReviewTrack.appendChild(clone);
    });
}

/* =========================================================
   HOME — RECENT INSTALLS
   DIAGONAL SCROLL ANIMATION
========================================================= */

const recentInstallCards = document.querySelectorAll(
    "#recent-installs .floating-frame"
);

if (recentInstallCards.length) {

    const recentInstallObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const card = entry.target;
                    const index = [...recentInstallCards].indexOf(card);

                    let startTransform;

                    /*
                       01 ↗     02 ↖
                       03 ↗     04 ↖

                            05 ↑
                    */

                    if (index === 0 || index === 2) {

                        // From bottom-left → final position
                        startTransform =
                            "translate(-80px, 80px)";

                    } else if (index === 1 || index === 3) {

                        // From bottom-right → final position
                        startTransform =
                            "translate(80px, 80px)";

                    } else {

                        // 05 from bottom → final position
                        startTransform =
                            "translateY(90px)";
                    }


                    card.animate(
                        [
                            {
                                opacity: 0,
                                transform: startTransform
                            },
                            {
                                opacity: 1,
                                transform: "translate(0, 0)"
                            }
                        ],
                        {
                            duration: 1000,
                            easing: "cubic-bezier(.22,.61,.36,1)",
                            fill: "both",
                            delay: index * 120
                        }
                    );

                    observer.unobserve(card);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    recentInstallCards.forEach(card => {
        recentInstallObserver.observe(card);
    });

}