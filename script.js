// Enhanced JavaScript with Professional Animations
document.addEventListener('DOMContentLoaded', function () {
  
  // Initialize all animations
  initializeAnimations();
  setupSmoothScrolling();
  setupIntersectionObserver();
  setupCarousels();
  setupInteractiveElements();
  setupParallaxEffects();
  
  // Smooth scrolling for navigation links with easing
  function setupSmoothScrolling() {
    const links = document.querySelectorAll('nav ul li a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Add smooth scroll with custom easing
          const startPosition = window.pageYOffset;
          const targetPosition = targetSection.offsetTop - 70;
          const distance = targetPosition - startPosition;
          const duration = 1000;
          let startTime = null;
          
          function smoothScrollStep(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(smoothScrollStep);
          }
          
          function easeInOutQuart(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
          }
          
          requestAnimationFrame(smoothScrollStep);
          
          // Update active navigation
          updateActiveNavigation(this);
        }
      });
    });
  }
  
  // Update active navigation with smooth transition
  function updateActiveNavigation(activeLink) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.style.transform = 'translateY(0)';
    });
    activeLink.classList.add('active');
    activeLink.style.transform = 'translateY(-2px)';
  }
  
  // Advanced Intersection Observer for scroll-triggered animations
  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    // Create multiple observers for different animation types
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Stagger child animations
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.animationDelay = `${index * 0.1}s`;
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
      'section, .education-column, .experience-column, .skill-category, .certificate-item, .project-article, .contact-item'
    );
    
    animatedElements.forEach((el, index) => {
      el.style.setProperty('--section-index', index);
      el.classList.add('fade-in-up');
      fadeInObserver.observe(el);
    });
    
    // Special observer for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      category.style.setProperty('--skill-index', index);
      
      // Animate skill items when category is visible
      const skillItems = category.querySelectorAll('.skill-item');
      skillItems.forEach((item, itemIndex) => {
        item.style.setProperty('--skill-item-index', itemIndex);
      });
    });
    
    // Certificate items animation
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach((item, index) => {
      item.style.setProperty('--cert-index', index);
    });
    
    // Project articles animation
    const projectArticles = document.querySelectorAll('.project-article');
    projectArticles.forEach((article, index) => {
      article.style.setProperty('--project-index', index);
    });
    
    // Contact items animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.style.setProperty('--contact-index', index);
    });
  }
  
  // Enhanced carousel functionality
  function setupCarousels() {
    // Gallery Carousel with auto-play and touch support
    setupGalleryCarousel();
    
    // Soft Skills Carousel with smooth transitions
    setupSoftSkillsCarousel();
    
    // Technical Skills horizontal scroll with momentum
    setupTechnicalSkillsScroll();
  }
  
  function setupGalleryCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const leftBtn = document.getElementById('carousel-left');
    const rightBtn = document.getElementById('carousel-right');
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    
    function updateCarousel(animate = true) {
      if (isTransitioning) return;
      isTransitioning = true;
      
      const translateX = -currentIndex * 100;
      
      if (animate) {
        track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
      
      track.style.transform = `translateX(${translateX}%)`;
      
      // Update button states with animation
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex === slides.length - 1;
      
      // Add ripple effect to buttons
      addRippleEffect(currentIndex > 0 ? leftBtn : rightBtn);
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    }
    
    function nextSlide() {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      } else {
        currentIndex = 0;
        updateCarousel();
      }
    }
    
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      } else {
        currentIndex = slides.length - 1;
        updateCarousel();
      }
    }
    
    // Auto-play functionality
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    rightBtn?.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
    
    leftBtn?.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
    
    // Pause auto-play on hover
    track?.addEventListener('mouseenter', stopAutoPlay);
    track?.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    track?.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoPlay();
    });
    
    track?.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });
    
    track?.addEventListener('touchend', () => {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoPlay();
    });
    
    // Initialize
    updateCarousel(false);
    startAutoPlay();
  }
  
  function setupSoftSkillsCarousel() {
    const track = document.getElementById('soft-skills-track');
    const slides = document.querySelectorAll('#soft-skills-track .carousel-slide');
    const leftBtn = document.getElementById('soft-skills-left');
    const rightBtn = document.getElementById('soft-skills-right');
    const dotsContainer = document.getElementById('soft-skills-dots');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const slidesToShow = window.innerWidth <= 768 ? 1 : 2;
    const maxIndex = Math.max(0, slides.length - slidesToShow);
    
    // Create enhanced dots
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateSoftSkillsCarousel();
          addRippleEffect(dot);
        });
        
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateSoftSkillsCarousel() {
      const slideWidth = 100 / slidesToShow;
      const translateX = -currentIndex * slideWidth;
      
      track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      track.style.transform = `translateX(${translateX}%)`;
      
      // Update button states
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex >= maxIndex;
      
      // Update dots
      const dots = document.querySelectorAll('#soft-skills-dots .dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // Add entrance animations to visible slides
      slides.forEach((slide, index) => {
        if (index >= currentIndex && index < currentIndex + slidesToShow) {
          slide.style.animation = `fadeInUp 0.6s ease-out ${(index - currentIndex) * 0.1}s both`;
        }
      });
    }
    
    // Event listeners with enhanced feedback
    rightBtn?.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSoftSkillsCarousel();
        addButtonPressEffect(rightBtn);
      }
    });
    
    leftBtn?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSoftSkillsCarousel();
        addButtonPressEffect(leftBtn);
      }
    });
    
    // Initialize
    createDots();
    updateSoftSkillsCarousel();
    
    // Responsive update
    window.addEventListener('resize', debounce(() => {
      createDots();
      currentIndex = Math.min(currentIndex, maxIndex);
      updateSoftSkillsCarousel();
    }, 250));
  }
  
  function setupTechnicalSkillsScroll() {
    const container = document.querySelector('.technical-skills-container');
    if (!container) return;
    
    let isScrolling = false;
    let scrollTimeout;
    
    // Smooth scroll momentum
    container.addEventListener('scroll', () => {
      if (!isScrolling) {
        container.classList.add('scrolling');
        isScrolling = true;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        container.classList.remove('scrolling');
        isScrolling = false;
      }, 150);
    });
    
    // Add scroll indicators
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '← Scroll to see more →';
    container.parentElement.appendChild(scrollIndicator);
    
    // Hide indicator when fully scrolled
    container.addEventListener('scroll', () => {
      const isScrolledToEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 10);
      scrollIndicator.style.opacity = isScrolledToEnd ? '0' : '1';
    });
  }
  
  // Interactive element enhancements
  function setupInteractiveElements() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.skill-card, .certificate-item, .project-article, .contact-item, .education-entry, .experience-entry');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        addMouseTrackingEffect(e.target);
      });
      
      card.addEventListener('mouseleave', (e) => {
        removeMouseTrackingEffect(e.target);
      });
    });
    
    // Icon animations on hover
    const icons = document.querySelectorAll('.medal-icon, .project-icon, .contact-icon, .certificate-icon, .category-icon');
    
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'pulse 1s ease-in-out infinite';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.animation = '';
      });
    });
    
    // Button ripple effects
    const buttons = document.querySelectorAll('button, .btn, .contact-link');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        addRippleEffect(e.target, e);
      });
    });
  }
  
  // Parallax effects for enhanced visual depth
  function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.intro-image, .hero');
    
    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        if (isElementInViewport(element)) {
          element.style.transform = `translateY(${rate}px)`;
        }
      });
    }, 10));
  }
  
  // Initialize stagger animations
  function initializeAnimations() {
    // Add CSS custom properties for animation delays
    document.documentElement.style.setProperty('--animation-delay', '0s');
    
    // Stagger navigation items
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1 + 0.5}s`;
    });
    
    // Add entrance animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.style.setProperty('--section-index', index);
    });
    
    // Initialize typing effect for hero text
    const heroText = document.querySelector('.hero p');
    if (heroText) {
      const text = heroText.textContent;
      heroText.textContent = '';
      heroText.classList.add('typing-effect');
      
      setTimeout(() => {
        typeWriter(heroText, text, 50);
      }, 1500);
    }
  }
  
  // Utility Functions
  
  function addRippleEffect(element, event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    // Add ripple styles if not already added
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  function addButtonPressEffect(button) {
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
      button.style.transform = '';
    }, 100);
  }
  
  function addMouseTrackingEffect(element) {
    let isTracking = true;
    
    function handleMouseMove(e) {
      if (!isTracking) return;
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', () => {
      isTracking = false;
      element.removeEventListener('mousemove', handleMouseMove);
    });
  }
  
  function removeMouseTrackingEffect(element) {
    element.style.transform = '';
    element.style.transition = 'transform 0.3s ease';
  }
  
  function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Loading animation
  function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loading-spinner"></div>
        <div class="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    `;
    
    const loaderStyles = `
      #page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4a4458 0%, #5d5470 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
      }
      .loader-content {
        text-align: center;
        color: white;
      }
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid #e7e4ec;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    if (!document.querySelector('#loader-styles')) {
      const style = document.createElement('style');
      style.id = 'loader-styles';
      style.textContent = loaderStyles;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 1000);
    });
  }
  
  // Enhanced scroll-based animations
  function setupScrollAnimations() {
    const animationElements = document.querySelectorAll('[data-animation]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animationType = entry.target.dataset.animation;
          entry.target.classList.add(`animate-${animationType}`);
          
          // Add stagger delay for child elements
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animationElements.forEach(el => scrollObserver.observe(el));
  }
  
  // Enhanced navigation with active state management
  function setupEnhancedNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', throttle(() => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 100));
  }
  
  // Dynamic background effects
  function setupDynamicBackgrounds() {
    // Floating particles effect
    createFloatingParticles();
    
    // Mouse trail effect
    setupMouseTrail();
  }
  
  function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'floating-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createParticle(particleContainer);
      }, i * 100);
    }
  }
  
  function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(231, 228, 236, 0.1);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      animation: float ${duration}s infinite ease-in-out;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
      createParticle(container); // Create new particle
    }, duration * 1000);
  }
  
  function setupMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      
      if (trail.length > maxTrailLength) {
        trail.shift();
      }
      
      // Update existing trail elements or create new ones
      trail.forEach((point, index) => {
        let trailElement = document.getElementById(`trail-${index}`);
        
        if (!trailElement) {
          trailElement = document.createElement('div');
          trailElement.id = `trail-${index}`;
          trailElement.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(231, 228, 236, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
          `;
          document.body.appendChild(trailElement);
        }
        
        const opacity = (index + 1) / trail.length * 0.5;
        const scale = (index + 1) / trail.length;
        
        trailElement.style.left = point.x - 3 + 'px';
        trailElement.style.top = point.y - 3 + 'px';
        trailElement.style.opacity = opacity;
        trailElement.style.transform = `scale(${scale})`;
      });
    });
  }
  
  // Performance optimization
  function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-speed', '0.1s');
      document.documentElement.style.setProperty('--hover-transition', '0.1s');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      const animatedElements = document.querySelectorAll('*');
      animatedElements.forEach(el => {
        if (document.hidden) {
          el.style.animationPlayState = 'paused';
        } else {
          el.style.animationPlayState = 'running';
        }
      });
    });
  }
  
  // Initialize all enhanced features
  showLoadingAnimation();
  setupScrollAnimations();
  setupEnhancedNavigation();
  setupDynamicBackgrounds();
  optimizePerformance();
  
  // Add enhanced styles for new features
  const enhancedStyles = `
    .animate-fade-in-up {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .animate-fade-in-left {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }
    
    .animate-fade-in-right {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }
    
    .animate-scale-in {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
    
    .scrolling {
      scroll-behavior: smooth;
    }
    
    .scroll-indicator {
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: 10px;
      opacity: 1;
      transition: opacity 0.3s ease;
      animation: pulse 2s infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(-5px) rotate(-1deg); }
    }
    
    /* Enhanced responsive animations */
    @media (max-width: 768px) {
      .fade-in-up, .fade-in-left, .fade-in-right, .scale-in {
        animation-duration: 0.6s !important;
      }
      
      #floating-particles {
        display: none; /* Reduce mobile performance impact */
      }
    }
    
    /* Accessibility improvements */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  
  if (!document.querySelector('#enhanced-styles')) {
    const style = document.createElement('style');
    style.id = 'enhanced-styles';
    style.textContent = enhancedStyles;
    document.head.appendChild(style);
  }
  
  // Console welcome message
  console.log('%cDivya Sharma Portfolio', 'color: #e7e4ec; font-size: 24px; font-weight: bold;');
  console.log('%cEnhanced with professional animations ✨', 'color: #4a4458; font-size: 14px;');
  
});
