
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // ===== TAB FUNCTIONALITY =====
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        // Remove active class from all triggers and panels
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked trigger
        trigger.classList.add('active');
        
        // Show corresponding panel
        const tabId = trigger.getAttribute('data-tab');
        document.getElementById(`${tabId}-panel`).classList.add('active');
      });
    });
    
    // ===== TOAST NOTIFICATION SYSTEM =====
    const toastContainer = document.getElementById('toast-container');
    
    function showToast(title, message, duration = 3000, type = 'default') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const toastContent = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
        <div class="toast-progress"></div>
      `;
      
      toast.innerHTML = toastContent;
      toastContainer.appendChild(toast);
      
      // Remove toast after duration
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          toastContainer.removeChild(toast);
        }, 300);
      }, duration);
    }
    
    // ===== EVENT HANDLING TAB =====
    // Mouse move tracking
    const mouseCard = document.getElementById('mouse-events-card');
    const mousePositionDisplay = document.querySelector('.mouse-position');
    const hoverElement = document.querySelector('.hover-element');
    
    mouseCard.addEventListener('mousemove', (e) => {
      const rect = mouseCard.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      mousePositionDisplay.textContent = `Mouse Position: X: ${x}, Y: ${y}`;
    });
    
    hoverElement.addEventListener('mouseenter', () => {
      hoverElement.classList.add('bg-blue-primary', 'text-white', 'scale-110');
    });
    
    hoverElement.addEventListener('mouseleave', () => {
      hoverElement.classList.remove('bg-blue-primary', 'text-white', 'scale-110');
    });
    
    // Click counter
    const clickBtn = document.querySelector('.click-btn');
    const clickCountDisplay = document.querySelector('.click-count');
    let clickCount = 0;
    
    clickBtn.addEventListener('click', () => {
      clickCount++;
      clickCountDisplay.textContent = clickCount;
      
      showToast('Button Clicked!', `You've clicked the button ${clickCount} times`);
    });
    
    // Keyboard events
    const lastKeyDisplay = document.querySelector('.last-key');
    
    document.addEventListener('keydown', (e) => {
      lastKeyDisplay.textContent = e.key;
    });
    
    // ===== INTERACTIVE ELEMENTS TAB =====
    // Color changing button
    const colorChangeBtn = document.querySelector('.color-change-btn');
    const colors = ['bg-blue', 'bg-purple', 'bg-green', 'bg-red', 'bg-yellow'];
    const colorTexts = ['Click to Change', 'Awesome!', 'Cool!', 'Nice!', 'Great!', 'Wow!'];
    
    colorChangeBtn.addEventListener('click', () => {
      // Remove all color classes
      colors.forEach(color => colorChangeBtn.classList.remove(color));
      
      // Add random color class
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomText = colorTexts[Math.floor(Math.random() * colorTexts.length)];
      
      colorChangeBtn.classList.add(randomColor);
      colorChangeBtn.textContent = randomText;
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    let currentImageIndex = 0;
    
    function updateGallery() {
      // Hide all images
      galleryImages.forEach(img => img.classList.remove('active'));
      galleryDots.forEach(dot => dot.classList.remove('active'));
      
      // Show current image
      galleryImages[currentImageIndex].classList.add('active');
      galleryDots[currentImageIndex].classList.add('active');
    }
    
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateGallery();
    });
    
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery();
    });
    
    galleryDots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentImageIndex = parseInt(dot.getAttribute('data-index'));
        updateGallery();
      });
    });
    
    // Accordion
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        // Close all accordions
        accordionTriggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = '0';
        });
        
        // Open current accordion if it was closed
        if (!isExpanded) {
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
      
      // Initialize accordion state
      trigger.setAttribute('aria-expanded', 'false');
    });
    
    // ===== FORM VALIDATION TAB =====
    const form = document.getElementById('registration-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Track which fields have been touched
    const touched = { username: false, email: false, password: false };
    
    function validateUsername() {
      if (!usernameInput.value) {
        usernameError.textContent = 'Username is required';
        usernameInput.classList.add('error');
        return false;
      } else if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameInput.classList.add('error');
        return false;
      } else {
        usernameError.textContent = '';
        usernameInput.classList.remove('error');
        return true;
      }
    }
    
    function validateEmail() {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      
      if (!emailInput.value) {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('error');
        return false;
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        return false;
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
      }
    }
    
    function validatePassword() {
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        passwordInput.classList.add('error');
        return false;
      } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordInput.classList.add('error');
        return false;
      } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordError.textContent = 'Password must contain at least one uppercase letter';
        passwordInput.classList.add('error');
        return false;
      } else if (!/[0-9]/.test(passwordInput.value)) {
        passwordError.textContent = 'Password must contain at least one number';
        passwordInput.classList.add('error');
        return false;
      } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        return true;
      }
    }
    
    function getPasswordStrength() {
      if (!passwordInput.value) return 0;
      
      let strength = 0;
      if (passwordInput.value.length >= 8) strength += 1;
      if (/[A-Z]/.test(passwordInput.value)) strength += 1;
      if (/[0-9]/.test(passwordInput.value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 1;
      
      return (strength / 4) * 100;
    }
    
    function updatePasswordStrength() {
      const strength = getPasswordStrength();
      strengthBar.style.width = strength + '%';
      
      if (strength <= 25) {
        strengthBar.style.backgroundColor = '#EF4444'; // Red
        strengthText.textContent = 'Password strength: Weak';
      } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#F59E0B'; // Orange
        strengthText.textContent = 'Password strength: Fair';
      } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#FCD34D'; // Yellow
        strengthText.textContent = 'Password strength: Good';
      } else {
        strengthBar.style.backgroundColor = '#10B981'; // Green
        strengthText.textContent = 'Password strength: Strong';
      }
    }
    
    // Add event listeners for real-time validation
    usernameInput.addEventListener('blur', () => {
      touched.username = true;
      validateUsername();
    });
    
    emailInput.addEventListener('blur', () => {
      touched.email = true;
      validateEmail();
    });
    
    passwordInput.addEventListener('blur', () => {
      touched.password = true;
      validatePassword();
    });
    
    // Update validation as user types if field has been touched
    usernameInput.addEventListener('input', () => {
      if (touched.username) validateUsername();
    });
    
    emailInput.addEventListener('input', () => {
      if (touched.email) validateEmail();
    });
    
    passwordInput.addEventListener('input', () => {
      if (touched.password) validatePassword();
      updatePasswordStrength();
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Mark all fields as touched
      touched.username = true;
      touched.email = true;
      touched.password = true;
      
      // Validate all fields
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      
      if (isUsernameValid && isEmailValid && isPasswordValid) {
        showToast('Form Submitted Successfully!', 'All validations passed. Your data would be processed now.', 3000, 'success');
        
        // Reset form
        form.reset();
        touched.username = false;
        touched.email = false;
        touched.password = false;
        strengthBar.style.width = '0';
        strengthText.textContent = '';
      } else {
        showToast('Form Submission Failed', 'Please fix the errors and try again.', 3000, 'error');
      }
    });
    
    // ===== SECRET FEATURES TAB =====
    const canvas = document.getElementById('effects-canvas');
    const ctx = canvas.getContext('2d');
    const longPressButton = document.querySelector('.long-press-button');
    const doubleClickBtn = document.querySelector('.double-click-btn');
    const secretButtons = document.querySelectorAll('.secret-btn');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    // Canvas setup
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse trail effect
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
      mouseTrail.push({ x: e.clientX, y: e.clientY });
      
      if (mouseTrail.length > 10) {
        mouseTrail = mouseTrail.slice(mouseTrail.length - 10);
      }
    });
    
    // Confetti state
    let confettiActive = false;
    let confettiTimeout = null;
    
    // Long press handling
    let longPressTimer = null;
    let longPressActive = false;
    
    longPressButton.addEventListener('mousedown', startLongPress);
    longPressButton.addEventListener('touchstart', startLongPress);
    
    longPressButton.addEventListener('mouseup', endLongPress);
    longPressButton.addEventListener('mouseleave', endLongPress);
    longPressButton.addEventListener('touchend', endLongPress);
    
    function startLongPress() {
      longPressTimer = setTimeout(() => {
        longPressActive = true;
        longPressButton.classList.add('active');
        longPressButton.textContent = 'Active!';
        
        showToast('Long Press Activated!', 'You\'ve discovered the long press feature!');
      }, 1500);
    }
    
    function endLongPress() {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    }
    
    // Double click handling
    doubleClickBtn.addEventListener('dblclick', () => {
      confettiActive = true;
      
      showToast('Double Click Detected!', 'Enjoy the confetti celebration!');
      
      // Clear any existing timeout
      if (confettiTimeout) {
        clearTimeout(confettiTimeout);
      }
      
      // Set a new timeout
      confettiTimeout = setTimeout(() => {
        confettiActive = false;
      }, 5000);
    });
    
    // Secret code sequence
    const secretCode = [1, 2, 3, 4];
    let secretCodeProgress = 0;
    
    secretButtons.forEach(button => {
      button.addEventListener('click', () => {
        const num = parseInt(button.getAttribute('data-num'));
        
        if (secretCode[secretCodeProgress] === num) {
          secretCodeProgress++;
          
          // Update progress dots
          for (let i = 0; i < progressDots.length; i++) {
            progressDots[i].classList.toggle('active', i < secretCodeProgress);
          }
          
          if (secretCodeProgress === secretCode.length) {
            showToast('Secret Code Unlocked! 🔓', 'You\'ve solved the secret sequence!', 5000);
            secretCodeProgress = 0;
            
            // Visual effect
            document.body.classList.add('secret-unlocked');
            setTimeout(() => {
              document.body.classList.remove('secret-unlocked');
              // Reset progress dots
              progressDots.forEach(dot => dot.classList.remove('active'));
            }, 3000);
          }
        } else {
          secretCodeProgress = 0;
          // Reset progress dots
          progressDots.forEach(dot => dot.classList.remove('active'));
        }
      });
    });
    
    // Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiProgress = [];
    
    document.addEventListener('keydown', (e) => {
      konamiProgress.push(e.key);
      
      if (konamiProgress.length > konamiCode.length) {
        konamiProgress.shift();
      }
      
      if (konamiProgress.length === konamiCode.length && 
          konamiProgress.every((val, idx) => val === konamiCode[idx])) {
        showToast('🎉 Konami Code Activated!', 'You\'ve discovered a secret! Awesome job!', 5000);
        
        document.body.classList.add('konami-activated');
        setTimeout(() => {
          document.body.classList.remove('konami-activated');
        }, 5000);
      }
    });
    
    // Animation loop for canvas effects
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse trail
      mouseTrail.forEach((point, index) => {
        const size = 20 - index * 2;
        if (size <= 0) return;
        
        ctx.fillStyle = `rgba(139, 92, 246, ${(10 - index) / 10})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw confetti if active
      if (confettiActive) {
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 10 + 5;
          const colors = ['#F97316', '#8B5CF6', '#0EA5E9', '#10B981', '#EF4444'];
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(x, y, size, size);
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  });
  