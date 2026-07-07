/* =========================================================
   JALLA SEA FOODS — main.js
   Vanilla JS + Swiper + GSAP + AOS integration
   ========================================================= */

(function () {
    "use strict";

    const WHATSAPP_NUMBER = "919701744317";
    const PHONE_NUMBER = "+919701744317";

    /* ---------- Preloader ---------- */
    window.addEventListener("load", () => {
        const pre = document.getElementById("preloader");
        if (pre) {
            setTimeout(() => pre.classList.add("hidden"), 400);
        }
    });

    /* ---------- Custom Cursor ---------- */
    (function customCursor() {
        if (window.matchMedia("(hover: none)").matches || window.innerWidth < 992) return;
        const dot = document.querySelector(".cursor-dot");
        const outline = document.querySelector(".cursor-outline");
        if (!dot || !outline) return;

        let mx = 0, my = 0, ox = 0, oy = 0;
        window.addEventListener("mousemove", (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        });

        function raf() {
            ox += (mx - ox) * 0.18;
            oy += (my - oy) * 0.18;
            outline.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
            requestAnimationFrame(raf);
        }
        raf();

        document.querySelectorAll("a, button, .fish-card, .highlight-card, .masonry-item").forEach((el) => {
            el.addEventListener("mouseenter", () => outline.classList.add("hover"));
            el.addEventListener("mouseleave", () => outline.classList.remove("hover"));
        });
    })();

    /* ---------- Navbar scroll + mobile toggle ---------- */
    (function navbar() {
        const nav = document.querySelector(".navbar-custom");
        const menu = document.querySelector(".nav-menu");
        const burger = document.querySelector(".hamburger");
        if (!nav) return;

        function onScroll() {
            if (window.scrollY > 60) nav.classList.add("scrolled");
            else nav.classList.remove("scrolled");
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        if (burger && menu) {
            burger.addEventListener("click", () => {
                burger.classList.toggle("open");
                menu.classList.toggle("open");
            });
            menu.querySelectorAll("a").forEach((a) =>
                a.addEventListener("click", () => {
                    burger.classList.remove("open");
                    menu.classList.remove("open");
                })
            );
        }
    })();

    /* ---------- Bubbles background ---------- */
    (function bubbles() {
        const container = document.querySelector(".bubbles");
        if (!container) return;
        const count = 22;
        for (let i = 0; i < count; i++) {
            const b = document.createElement("span");
            b.className = "bubble";
            const size = 6 + Math.random() * 34;
            b.style.width = size + "px";
            b.style.height = size + "px";
            b.style.left = Math.random() * 100 + "%";
            b.style.animationDuration = 8 + Math.random() * 12 + "s";
            b.style.animationDelay = -Math.random() * 15 + "s";
            b.style.opacity = 0.4 + Math.random() * 0.5;
            container.appendChild(b);
        }
    })();

    /* ---------- Hero Swiper ---------- */
    (function heroSwiper() {
        const el = document.querySelector(".hero-swiper");
        if (!el || typeof Swiper === "undefined") return;
        new Swiper(el, {
            loop: true,
            speed: 1400,
            effect: "fade",
            fadeEffect: { crossFade: true },
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: ".hero-swiper .swiper-pagination", clickable: true }
        });
    })();

    /* ---------- Testimonial Swiper ---------- */
    (function testiSwiper() {
        const el = document.querySelector(".testi-swiper");
        if (!el || typeof Swiper === "undefined") return;
        new Swiper(el, {
            loop: true,
            speed: 900,
            autoplay: { delay: 4200, disableOnInteraction: false },
            spaceBetween: 24,
            slidesPerView: 1,
            pagination: { el: ".testi-swiper .swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    })();

    /* ---------- Counters (IntersectionObserver + easing) ---------- */
    (function counters() {
        const nums = document.querySelectorAll("[data-counter]");
        if (!nums.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseFloat(el.dataset.counter);
                    const dur = 1800;
                    const start = performance.now();
                    function tick(now) {
                        const p = Math.min(1, (now - start) / dur);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(eased * target).toLocaleString();
                        if (p < 1) requestAnimationFrame(tick);
                        else el.textContent = target.toLocaleString();
                    }
                    requestAnimationFrame(tick);
                    io.unobserve(el);
                });
            },
            { threshold: 0.4 }
        );
        nums.forEach((n) => io.observe(n));
    })();

    /* ---------- FAQ Accordion ---------- */
    (function faq() {
        document.querySelectorAll(".faq-item").forEach((item) => {
            const q = item.querySelector(".faq-q");
            if (!q) return;
            q.addEventListener("click", () => {
                const openItem = document.querySelector(".faq-item.open");
                if (openItem && openItem !== item) openItem.classList.remove("open");
                item.classList.toggle("open");
            });
        });
    })();

    /* ---------- Reveal on scroll ---------- */
    (function reveal() {
        const els = document.querySelectorAll(".reveal");
        if (!els.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14 }
        );
        els.forEach((el) => io.observe(el));
    })();

    /* ---------- AOS init ---------- */
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 900, once: true, offset: 60, easing: "ease-out-cubic" });
    }

    /* ---------- Button ripple + magnetic ---------- */
    (function buttons() {
        document.querySelectorAll(".btn-magnetic").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const r = document.createElement("span");
                r.className = "ripple";
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                r.style.width = r.style.height = size + "px";
                r.style.left = e.clientX - rect.left - size / 2 + "px";
                r.style.top = e.clientY - rect.top - size / 2 + "px";
                btn.appendChild(r);
                setTimeout(() => r.remove(), 700);
            });

            if (window.innerWidth > 992) {
                btn.addEventListener("mousemove", (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
                });
                btn.addEventListener("mouseleave", () => {
                    btn.style.transform = "";
                });
            }
        });
    })();

    /* ---------- Floating Back-to-Top visibility ---------- */
    (function backToTop() {
        const btn = document.querySelector(".float-btn.top");
        if (!btn) return;
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) btn.classList.add("show");
            else btn.classList.remove("show");
        }, { passive: true });
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    })();

    /* ---------- Contact form → WhatsApp ---------- */
    window.submitWhatsApp = function (form) {
        const data = new FormData(form);
        const name = (data.get("name") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const location = (data.get("location") || "").toString().trim();
        const requirement = (data.get("requirement") || "").toString().trim();

        if (!name || !phone || !requirement) {
            alert("Please enter your Name, Phone and Requirement.");
            return false;
        }

        const message =
`Hello JALLA SEA FOODS,

I would like to place an inquiry.

Name: ${name}
Phone: ${phone}
Location: ${location || "-"}
Requirement: ${requirement}

Please get in touch. Thank you!`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        return false;
    };

    /* ---------- Gallery Lightbox ---------- */
    (function lightbox() {
        const items = document.querySelectorAll(".masonry-item img");
        if (!items.length) return;
        const box = document.createElement("div");
        box.className = "lightbox";
        box.innerHTML = `<button class="lightbox-close" aria-label="Close" data-testid="lightbox-close-btn"><i class="fa-solid fa-xmark"></i></button><img alt="Gallery" />`;
        document.body.appendChild(box);
        const img = box.querySelector("img");
        const closeBtn = box.querySelector(".lightbox-close");

        items.forEach((i) =>
            i.addEventListener("click", () => {
                img.src = i.src.replace(/w=\d+/, "w=1600");
                box.classList.add("open");
            })
        );
        function close() { box.classList.remove("open"); }
        closeBtn.addEventListener("click", close);
        box.addEventListener("click", (e) => { if (e.target === box) close(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    })();

})();
