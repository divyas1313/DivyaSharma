// Smooth scrolling, animations, theme toggle, and carousel
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('nav ul li a');

  for (const link of links) {
    link.addEventListener('click', smoothScroll);
  }

  function smoothScroll(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  }

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('section');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Skill bars animation on scroll
  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          fill.style.width = fill.style.width || '0%';
        });
      }
    });
  }, observerOptions);

  const skillsSection = document.getElementById('technical-skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');

  let currentIndex = 0;
  const totalSlides = carouselSlides.length;
  const slidesToShow = 3; // Default for desktop
  const maxIndex = Math.ceil(totalSlides / slidesToShow) - 1;

  function updateCarousel() {
    const translateX = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === maxIndex;
  }

  rightBtn.addEventListener('click', function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  leftBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Initial setup
  updateCarousel();

  // Update on resize for responsiveness
  window.addEventListener('resize', function () {
    // Recalculate maxIndex if needed, but for simplicity, keep as is
    updateCarousel();
  });

  // Quote animation: show one quote at a time, moving left to right
  const quotes = document.querySelectorAll('.quote-container .quote');
  let currentQuoteIndex = 0;

  function showQuote(index) {
    quotes.forEach((quote, i) => {
      if (i === index) {
        quote.classList.add('active');
      } else {
        quote.classList.remove('active');
      }
    });
  }

  function cycleQuotes() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(currentQuoteIndex);
  }

  // Initialize first quote
  showQuote(0);

  // Cycle quotes every 5 seconds
  setInterval(cycleQuotes, 5000);

  // Horizontal Bar Chart for Technical Skills
  const ctx = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Canva (Graphic Design)', 'Video Editing (Graphic Design)', 'Website Design (Graphic Design)', 'SPSS (Data Analytics)', 'Tableau (Data Analytics)', 'Power BI (Data Analytics)', 'Odoo (Data Analytics)', 'Project Libre (Data Analytics)', 'MS Excel (Productivity Tools)', 'MS PowerPoint (Productivity Tools)', 'MS Word (Productivity Tools)'],
      datasets: [{
        data: [9, 8, 8, 7, 8, 8, 6, 6, 10, 9, 9],
        backgroundColor: '#11CEEB',
        borderColor: '#11CEEB',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 10,
          ticks: {
            stepSize: 1,
            font: {
              family: 'Poppins'
            }
          }
        },
        y: {
          ticks: {
            font: {
              family: 'Poppins'
            }
          }
        }
      }
    }
  });
});
