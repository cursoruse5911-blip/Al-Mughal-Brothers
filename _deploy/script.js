(function(){
  "use strict";
  function $(id){ return document.getElementById(id); }

  try {
    var burger = $("burger");
    var navlinks = $("navlinks");
    if (burger && navlinks) {
      burger.addEventListener("click", function(){
        var open = navlinks.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
      navlinks.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){ navlinks.classList.remove("open"); });
      });
    }
  } catch (e) {}

  try {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
    }
  } catch (e) {
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
  }

  try {
    var form = $("contactForm");
    if (form) {
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var msg = $("formMsg");
        var btn = $("formSubmitBtn");
        if (msg) msg.classList.remove("show");
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        var data = new FormData(form);
        fetch("https://formsubmit.co/ajax/kamalmughal2341@gmail.com", {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        }).then(function(res){
          if (!res.ok) throw new Error("fail");
          if (msg) {
            msg.textContent = "Thank you — your request was sent. We will contact you soon.";
            msg.style.color = "#276B41";
            msg.classList.add("show");
          }
          form.reset();
        }).catch(function(){
          if (msg) {
            msg.textContent = "Could not send right now. Please call +92 333 5836994 or WhatsApp us.";
            msg.style.color = "#A34419";
            msg.classList.add("show");
          }
        }).finally(function(){
          if (btn) { btn.disabled = false; btn.textContent = "Send Request"; }
        });
      });
    }
  } catch (e) {}

  try {
    var year = $("year");
    if (year) year.textContent = String(new Date().getFullYear());
  } catch (e) {}

  try {
    var logoImg = document.querySelector(".logo img");
    var sceneLogo = $("sceneLogo");
    if (logoImg && sceneLogo && !sceneLogo.getAttribute("src")) {
      sceneLogo.src = logoImg.getAttribute("src");
    }
  } catch (e) {}

  try {
    document.querySelectorAll(".gallery").forEach(function(g){
      var paused = false, resumeTimer;
      function pause(){
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function(){ paused = false; }, 4000);
      }
      g.addEventListener("pointerdown", pause, { passive: true });
      g.addEventListener("wheel", pause, { passive: true });
      g.addEventListener("touchstart", pause, { passive: true });
      setInterval(function(){
        if (paused) return;
        var imgs = g.querySelectorAll("img");
        if (imgs.length < 2) return;
        var step = imgs[0].getBoundingClientRect().width;
        if (!step) return;
        var max = g.scrollWidth - g.clientWidth;
        if (max <= 1) return;
        var next = g.scrollLeft >= max - 2 ? 0 : g.scrollLeft + step;
        g.scrollTo({ left: next, behavior: "smooth" });
      }, 3000);
    });

    document.querySelectorAll(".gallery-arrow").forEach(function(btn){
      btn.addEventListener("click", function(){
        var g = document.getElementById(btn.getAttribute("data-target"));
        if (!g) return;
        var img = g.querySelector("img");
        var step = img ? img.getBoundingClientRect().width : 280;
        g.scrollBy({ left: btn.classList.contains("next") ? step : -step, behavior: "smooth" });
      });
    });
  } catch (e) {}
})();
