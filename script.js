

/* ---------- Portfolio gallery filter (home + projects) ----------
   Only runs if the gallery actually exists on the page.
   The guard (if filterContainer && galleryItems.length) stops
   the code from running — and erroring — on pages with no gallery. */
const filterContainer = document.querySelector(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterContainer && galleryItems.length) {
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
      // remove "active" from the previously-selected filter
      filterContainer.querySelector(".active").classList.remove("active");
      // mark the clicked filter as active
      event.target.classList.add("active");
      const filterValue = event.target.getAttribute("data-filter");
      galleryItems.forEach((item) => {
        if (item.classList.contains(filterValue) || filterValue === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });
}

/* ---------- Mobile menu: open / close + accessibility ----------
   The hamburger and close icons in the HTML have role="button"
   and tabindex="0" so they can be reached with the Tab key.
   We attach behaviour here with addEventListener instead of
   inline onclick="..." — keeping all menu logic in one place. */
const navLinks = document.getElementById("navLinks");
const menuOpenBtn = document.getElementById("menuOpen");
const menuCloseBtn = document.getElementById("menuClose");

function openMenu() {
  navLinks.style.right = "0";
  menuOpenBtn.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  navLinks.style.right = "-200px";
  menuOpenBtn.setAttribute("aria-expanded", "false");
}

if (navLinks && menuOpenBtn) {
  // open with the hamburger, close with the X
  menuOpenBtn.addEventListener("click", openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener("click", closeMenu);

  // close the menu the moment a link is chosen
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // close on Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // close when clicking anywhere outside the menu
  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuOpenBtn.contains(event.target)) {
      closeMenu();
    }
  });

  // open with Enter / Space when the hamburger is focused
  menuOpenBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu();
    }
  });
}


/* ---------- Decorative images: empty alt for screen readers ----------
   Images that sit beside a heading (service icons, client photos) and the
   case-study showcase sheets are decorative — the heading or page title
   already says what they are. An empty alt tells assistive tech to skip
   them instead of reading out the filename. We skip any image that
   already has alt text (e.g. the gallery covers and the hero portrait). */
document.querySelectorAll('.service-content img, .services-pageb img, .client-details img, .a-images img').forEach((img) => {
  if (!img.alt) img.alt = '';
});


/*------Work Process-------*/


let workProcessCards = document.querySelector('.workProcessCards');
let timeLineBar = document.querySelector('.timeline-bar');
let timeLineItem = document.querySelectorAll('.timeline-item');

if (workProcessCards && timeLineBar) {

    let observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Animate the timeline bar
                timeLineBar.classList.add('move-line');

                // Animate all timeline items
                timeLineItem.forEach((item) => {
                    item.classList.add('move-down');
                });

                // Stop observing after animation starts
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    observer.observe(workProcessCards);
}


/*--------Skills section animation-------*/
// SKILLS SECTION ANIMATION

const skillsSection = document.getElementById("skillsSection");

if (skillsSection) {

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                skillsSection.classList.add("animate");

                observer.unobserve(skillsSection);

            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(skillsSection);

}



/* ---------- Contact form: in-page submit feedback ----------
   Instead of letting the browser leave the page on submit, we send the
   form with fetch() so we can read Web3Forms' JSON response and show a
   success or error message inline. try/catch handles network failures. */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const button = contactForm.querySelector('.sub-button');
  const originalLabel = button.textContent;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });
      const result = await response.json();
      if (result.success) {
        status.textContent = "Thanks! I'll reply within 24 hours.";
        status.style.color = '#E09F3E';
        contactForm.reset();
      } else {
        status.textContent = result.message || 'Something went wrong. Please try again.';
        status.style.color = '#ff6b6b';
      }
    } catch (error) {
      status.textContent = 'Network error — please try again or email me directly.';
      status.style.color = '#ff6b6b';
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}

/* ---------- Sticky mobile CTA bar (Call + WhatsApp) ----------
   Built with JS so it appears on every page that loads this script,
   without pasting markup into each HTML file. CSS shows it only on
   mobile (max-width: 768px), so it stays out of the way on desktop. */
const mobileCta = document.createElement('div');
mobileCta.className = 'mobile-cta';
let call =  document.createElement('div');
call.innerHTML = '<a href="tel:+254705822326"><i class="fa-solid fa-phone"></i></a>';
call.classList.add('callBtn')
let whatsapp =  document.createElement('div');
whatsapp.innerHTML = '<a href="https://wa.me/254705822326" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>';
whatsapp.classList.add('whatsappBtn')

mobileCta.appendChild(call);
mobileCta.appendChild(whatsapp);
document.body.appendChild(mobileCta);

/* ---------- Link testimonials to their case studies ----------
   Each testimonial card gets a "View project →" link based on the
   client's photo, turning praise into evidence. On pages with no
   testimonials, querySelectorAll returns an empty list — no-op. */
const testimonialProjectLinks = {
  'CEO-AMARA.png': './amara.html',
  'CEO-verdura.png': './verdura.html',
  'CEO-Titans.png': './titans.html'
};
document.querySelectorAll('.testimony-part').forEach((card) => {
  const img = card.querySelector('.client-details img');
  if (!img) return;
  const key = Object.keys(testimonialProjectLinks).find((k) => img.src.includes(k));
  if (!key) return;
  const link = document.createElement('a');
  link.href = testimonialProjectLinks[key];
  link.className = 'testimony-link';
  link.textContent = 'View project \u2192';
  card.appendChild(link);
});

// WEBSITE PRELOADER

/* ==========================
   WEBSITE PRELOADER
   ========================== */

const preloader = document.getElementById("preloader");
const loaderVideo = document.getElementById("loaderVideo");

if (preloader && loaderVideo) {

    let pageLoaded = false;
    let minimumTimePassed = false;

    function hidePreloader() {

        if (pageLoaded && minimumTimePassed) {

            loaderVideo.pause();
            preloader.classList.add("hide");

        }

    }

    // Check when the website has finished loading
    window.addEventListener("load", function() {

        pageLoaded = true;
        hidePreloader();

    });

    // Allow at least 3 seconds for the animation
    setTimeout(function() {

        minimumTimePassed = true;
        hidePreloader();

    }, 3000);

    // Handle video playback errors
    loaderVideo.addEventListener("error", function() {

        minimumTimePassed = true;
        hidePreloader();

    });

    // Handle autoplay restrictions
    const playPromise = loaderVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(function() {

            minimumTimePassed = true;
            hidePreloader();

        });

    }

}