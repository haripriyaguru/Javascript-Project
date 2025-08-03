$(document).ready(function() {
    // Tab switching
    $('.auth-tab').on('click', function() {
      const tab = $(this).data('tab');
      
      // Update active tab
      $('.auth-tab').removeClass('active');
      $(this).addClass('active');
      
      // Show corresponding panel
      $('.auth-panel').removeClass('active');
      $(`#${tab}-panel`).addClass('active');
    });
    
    // Sign In form submission
    $('#signin-form').on('submit', function(e) {
      e.preventDefault();
      
      const email = $('#signin-email').val();
      const password = $('#signin-password').val();
      
      // Validate form
      if (!email || !password) {
        showToast('Error', 'Please fill in all fields.', 'error');
        return;
      }
      
      // Simulate API call with loading state
      $(this).find('button[type="submit"]').text('Signing in...').prop('disabled', true);
      
      setTimeout(() => {
        // Store user info in localStorage (in a real app, you'd store a token)
        localStorage.setItem('user', JSON.stringify({
          email: email,
          name: email.split('@')[0]
        }));
        
        showToast('Success', 'You have been signed in successfully.');
        
        // Redirect to home page
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }, 1500);
    });
    
    // Sign Up form submission
    $('#signup-form').on('submit', function(e) {
      e.preventDefault();
      
      const firstName = $('#first-name').val();
      const lastName = $('#last-name').val();
      const email = $('#signup-email').val();
      const password = $('#signup-password').val();
      const confirmPassword = $('#confirm-password').val();
      
      // Validate form
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showToast('Error', 'Please fill in all fields.', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showToast('Error', 'Passwords do not match.', 'error');
        return;
      }
      
      // Simulate API call with loading state
      $(this).find('button[type="submit"]').text('Creating account...').prop('disabled', true);
      
      setTimeout(() => {
        // Store user info in localStorage (in a real app, you'd store a token)
        localStorage.setItem('user', JSON.stringify({
          email: email,
          name: `${firstName} ${lastName}`
        }));
        
        showToast('Success', 'Your account has been created successfully.');
        
        // Redirect to home page
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }, 1500);
    });
    
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // If already logged in, redirect to home page
      window.location.href = 'index.html';
    }
  });