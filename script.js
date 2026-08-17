// script.js — mobile nav, smooth scroll, form handling (simulated) 
document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(mainNav){
      mainNav.classList.toggle('open');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el){
          el.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile nav when navigating
          if(mainNav && mainNav.classList.contains('open')){
            mainNav.classList.remove('open');
            navToggle && navToggle.setAttribute('aria-expanded','false');
          }
        }
      }
    });
  });

  // Inquiry form behavior — if Formspree placeholder is used the browser will submit normally.
  const form = document.getElementById('inquiryForm');
  const formMessage = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', function(e){
      // If the form action still has the placeholder string, intercept and simulate to avoid broken submission.
      if(form.action && form.action.includes('FORM_ID_PLACEHOLDER')){
        e.preventDefault();
        formMessage.textContent = '';
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        if(!name){
          formMessage.style.color = '#dc2626';
          formMessage.textContent = 'Please enter your full name.';
          form.name.focus();
          return;
        }
        if(!phone || phone.length < 7){
          formMessage.style.color = '#dc2626';
          formMessage.textContent = 'Please enter a valid phone number.';
          form.phone.focus();
          return;
        }
        formMessage.style.color = 'var(--accent-purple)';
        formMessage.textContent = 'Sending...';
        setTimeout(()=>{
          formMessage.style.color = 'var(--accent-blue)';
          formMessage.textContent = 'Thank you! Your inquiry has been received. We will contact you shortly.';
          form.reset();
        }, 900);
      }
    });
  }

  // Optional: animate whatsapp float on load
  const wa = document.querySelector('.whatsapp-float');
  if(wa){
    wa.style.transform = 'translateY(0)';
  }
});
