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

  // Scroll-triggered animations - Faster and more responsive
  const observerOptions = {
    threshold: 0.05, // Lower threshold - start animation when only 5% visible
    rootMargin: '0px 0px -100px 0px' // Trigger 100px earlier
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('section, .project-article, .certificate-item, .skill-category');
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

  // Gallery Carousel functionality - Faster transitions
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

  // Soft Skills Carousel functionality
  const softSkillsTrack = document.getElementById('soft-skills-track');
  const softSkillsSlides = document.querySelectorAll('#soft-skills-track .carousel-slide');
  const softSkillsLeftBtn = document.getElementById('soft-skills-left');
  const softSkillsRightBtn = document.getElementById('soft-skills-right');
  const softSkillsDotsContainer = document.getElementById('soft-skills-dots');

  let softSkillsCurrentIndex = 0;
  const softSkillsTotalSlides = softSkillsSlides.length;
  const softSkillsSlidesToShow = 3; // Default for desktop
  const softSkillsMaxIndex = Math.ceil(softSkillsTotalSlides / softSkillsSlidesToShow) - 1;

  // Create dots
  for (let i = 0; i <= softSkillsMaxIndex; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      softSkillsCurrentIndex = i;
      updateSoftSkillsCarousel();
    });
    softSkillsDotsContainer.appendChild(dot);
  }

  const softSkillsDots = document.querySelectorAll('#soft-skills-dots .dot');

  function updateSoftSkillsCarousel() {
    const translateX = -softSkillsCurrentIndex * 100;
    softSkillsTrack.style.transform = `translateX(${translateX}%)`;
    softSkillsLeftBtn.disabled = softSkillsCurrentIndex === 0;
    softSkillsRightBtn.disabled = softSkillsCurrentIndex === softSkillsMaxIndex;

    // Update dots
    softSkillsDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === softSkillsCurrentIndex);
    });
  }

  softSkillsRightBtn.addEventListener('click', function () {
    if (softSkillsCurrentIndex < softSkillsMaxIndex) {
      softSkillsCurrentIndex++;
      updateSoftSkillsCarousel();
    }
  });

  softSkillsLeftBtn.addEventListener('click', function () {
    if (softSkillsCurrentIndex > 0) {
      softSkillsCurrentIndex--;
      updateSoftSkillsCarousel();
    }
  });

  // Initial setup
  updateSoftSkillsCarousel();

  // Update on resize for responsiveness
  window.addEventListener('resize', function () {
    updateSoftSkillsCarousel();
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


// Technical Skills Carousel functionality
const technicalSkillsTrack = document.getElementById('technical-skills-track');
  const technicalSkillsSlides = document.querySelectorAll('#technical-skills-track .carousel-slide');
  const technicalSkillsLeftBtn = document.getElementById('technical-skills-left');
  const technicalSkillsRightBtn = document.getElementById('technical-skills-right');
  const technicalSkillsDotsContainer = document.getElementById('technical-skills-dots');

  let technicalSkillsCurrentIndex = 0;
  const technicalSkillsTotalSlides = technicalSkillsSlides.length;
  const technicalSkillsSlidesToShow = 1; // Show one category at a time
  const technicalSkillsMaxIndex = Math.ceil(technicalSkillsTotalSlides / technicalSkillsSlidesToShow) - 1;

  // Create dots
  for (let i = 0; i <= technicalSkillsMaxIndex; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      technicalSkillsCurrentIndex = i;
      updateTechnicalSkillsCarousel();
    });
    technicalSkillsDotsContainer.appendChild(dot);
  }

  const technicalSkillsDots = document.querySelectorAll('#technical-skills-dots .dot');

  function updateTechnicalSkillsCarousel() {
    const translateX = -technicalSkillsCurrentIndex * 100;
    technicalSkillsTrack.style.transform = `translateX(${translateX}%)`;
    technicalSkillsLeftBtn.disabled = technicalSkillsCurrentIndex === 0;
    technicalSkillsRightBtn.disabled = technicalSkillsCurrentIndex === technicalSkillsMaxIndex;

    // Update dots
    technicalSkillsDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === technicalSkillsCurrentIndex);
    });
  }

  technicalSkillsRightBtn.addEventListener('click', function () {
    if (technicalSkillsCurrentIndex < technicalSkillsMaxIndex) {
      technicalSkillsCurrentIndex++;
      updateTechnicalSkillsCarousel();
    }
  });

  technicalSkillsLeftBtn.addEventListener('click', function () {
    if (technicalSkillsCurrentIndex > 0) {
      technicalSkillsCurrentIndex--;
      updateTechnicalSkillsCarousel();
    }
  });

  // Initial setup
  updateTechnicalSkillsCarousel();





// Generic carousel function
function setupCarousel(trackSelector, leftBtnSelector, rightBtnSelector) {
  const track = document.querySelector(trackSelector);
  const slides = track ? Array.from(track.children) : [];
  const leftBtn = document.querySelector(leftBtnSelector);
  const rightBtn = document.querySelector(rightBtnSelector);
  let currentIndex = 0;

  function updateCarousel() {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === currentIndex ? 'block' : 'none';
    });
  }

  if (leftBtn && rightBtn && slides.length > 0) {
    leftBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
    rightBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
    updateCarousel();
  }
}

// Technical Skills Carousel
setupCarousel(
  '#technical-skills-track',
  '#technical-skills-left',
  '#technical-skills-right'
);

// Soft Skills Carousel
setupCarousel(
  '#soft-skills-track',
  '#soft-skills-left',
  '#soft-skills-right'
);
// Soft Skills Multi-Item Carousel (shows 3 at a time)
document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('soft-skills-track');
  const slides = Array.from(track.children);
  const leftBtn = document.getElementById('soft-skills-left');
  const rightBtn = document.getElementById('soft-skills-right');
  const visibleCount = 3; // Change to 2 if you want 2 at a time
  let currentIndex = 0;

  function updateCarousel() {
    slides.forEach((slide, idx) => {
      if (idx >= currentIndex && idx < currentIndex + visibleCount) {
        slide.style.display = '';
      } else {
        slide.style.display = 'none';
      }
    });
    // Disable buttons at ends
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex + visibleCount >= slides.length;
  }

  leftBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  rightBtn.addEventListener('click', function () {
    if (currentIndex + visibleCount < slides.length) {
      currentIndex++;
      updateCarousel();
    }
  });

  updateCarousel();
});
// Gallery Carousel
setupCarousel(
  '.carousel-track',
  '#carousel-left',
  '#carousel-right'
);


function setupCarousel(trackId, leftBtnId, rightBtnId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = Array.from(track.children);
  const leftBtn = document.getElementById(leftBtnId);
  const rightBtn = document.getElementById(rightBtnId);
  let currentIndex = 0;

  function updateCarousel() {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === currentIndex ? 'block' : 'none';
    });
  }

  if (leftBtn && rightBtn && slides.length > 0) {
    leftBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
    rightBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
    updateCarousel();
  }
}

// Technical Skills
setupCarousel('technical-skills-track', 'technical-skills-left', 'technical-skills-right');

// Soft Skills
setupCarousel('soft-skills-track', 'soft-skills-left', 'soft-skills-right');

// Gallery
setupCarousel('gallery-track', 'carousel-left', 'carousel-right');

// ...existing code...
});
