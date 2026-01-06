// Simple interactions for portfolio
document.addEventListener('DOMContentLoaded',()=>{
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  if(toggle){
    toggle.addEventListener('click',()=>{
      if(nav.style.display === 'flex') nav.style.display = '';
      else nav.style.display = 'flex';
    });
  }
  // Basic contact form handling (prevents real submit in demo)
  const form = document.querySelector('#contactForm');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      alert('Thanks! This is a demo contact form — configure your backend or mailto.');
      form.reset();
    });
  }
});