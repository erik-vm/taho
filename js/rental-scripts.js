// Car rental functionality
let currentImageIndex = [0, 0, 0, 0]; // Track current image for each car
let modalImageIndex = 0; // Track current image in modal
let modalCarIndex = 0; // Track which car's images are in modal

// Popup Ad functionality
function showPopupAd() {
  const popup = document.getElementById('popupAdModal');
  if (popup) {
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closePopupAd() {
  const popup = document.getElementById('popupAdModal');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
    
    // Set timestamp when ad was closed
    const now = new Date().getTime();
    localStorage.setItem('tahoAdLastShown', now.toString());
  }
}

function checkAndShowAd() {
  const lastShown = localStorage.getItem('tahoAdLastShown');
  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  // Show ad if never shown before OR if more than 24 hours have passed
  if (!lastShown || (now - parseInt(lastShown)) > twentyFourHours) {
    // Small delay to ensure page is loaded
    setTimeout(showPopupAd, 1500);
  }
}

function onAdImageClick() {
  // Open the aramora.html page in new tab when ad image is clicked
  window.open('aramora.html', '_blank');
  closePopupAd();
}

// Tab switching functionality
function switchTab(tabName) {
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName + '-tab').classList.add('active');
  
  // Activate corresponding button
  event.target.classList.add('active');
}

// Image navigation functions
function changeImage(carIndex, direction) {
  const container = document.querySelectorAll('.car-image-container')[carIndex];
  const images = container.querySelectorAll('.car-image');
  const indicators = container.querySelectorAll('.indicator');
  
  // Remove active class from current image and indicator
  images[currentImageIndex[carIndex]].classList.remove('active');
  indicators[currentImageIndex[carIndex]].classList.remove('active');
  
  // Calculate new index
  currentImageIndex[carIndex] += direction;
  if (currentImageIndex[carIndex] < 0) {
    currentImageIndex[carIndex] = images.length - 1;
  } else if (currentImageIndex[carIndex] >= images.length) {
    currentImageIndex[carIndex] = 0;
  }
  
  // Add active class to new image and indicator
  images[currentImageIndex[carIndex]].classList.add('active');
  indicators[currentImageIndex[carIndex]].classList.add('active');
}

function showImage(carIndex, imageIndex) {
  const container = document.querySelectorAll('.car-image-container')[carIndex];
  const images = container.querySelectorAll('.car-image');
  const indicators = container.querySelectorAll('.indicator');
  
  // Remove active class from current image and indicator
  images[currentImageIndex[carIndex]].classList.remove('active');
  indicators[currentImageIndex[carIndex]].classList.remove('active');
  
  // Set new index and add active class
  currentImageIndex[carIndex] = imageIndex;
  images[currentImageIndex[carIndex]].classList.add('active');
  indicators[currentImageIndex[carIndex]].classList.add('active');
}

// Toggle car details
function toggleDetails(carIndex) {
  const details = document.getElementById('details-' + carIndex);
  const button = details.previousElementSibling;
  
  if (details.classList.contains('expanded')) {
    details.classList.remove('expanded');
    button.textContent = 'Rohkem';
  } else {
    details.classList.add('expanded');
    button.textContent = 'Vähem';
  }
}

// Modal functionality
function openImageModal(carIndex, imageIndex) {
  modalCarIndex = carIndex;
  modalImageIndex = imageIndex || currentImageIndex[carIndex];
  
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const container = document.querySelectorAll('.car-image-container')[carIndex];
  const images = container.querySelectorAll('.car-image');
  
  // Set modal image source
  modalImg.src = images[modalImageIndex].src;
  modalImg.alt = images[modalImageIndex].alt;
  
  // Update modal indicators
  updateModalIndicators();
  
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore background scrolling
}

function changeModalImage(direction) {
  const container = document.querySelectorAll('.car-image-container')[modalCarIndex];
  const images = container.querySelectorAll('.car-image');
  const modalImg = document.getElementById('modalImage');
  
  // Calculate new index
  modalImageIndex += direction;
  if (modalImageIndex < 0) {
    modalImageIndex = images.length - 1;
  } else if (modalImageIndex >= images.length) {
    modalImageIndex = 0;
  }
  
  // Update modal image
  modalImg.src = images[modalImageIndex].src;
  modalImg.alt = images[modalImageIndex].alt;
  
  // Update indicators
  updateModalIndicators();
}

function showModalImage(imageIndex) {
  const container = document.querySelectorAll('.car-image-container')[modalCarIndex];
  const images = container.querySelectorAll('.car-image');
  const modalImg = document.getElementById('modalImage');
  
  modalImageIndex = imageIndex;
  modalImg.src = images[modalImageIndex].src;
  modalImg.alt = images[modalImageIndex].alt;
  
  // Update indicators
  updateModalIndicators();
}

function updateModalIndicators() {
  const indicators = document.querySelectorAll('.modal-indicator');
  indicators.forEach((indicator, index) => {
    if (index === modalImageIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check and show popup ad
  checkAndShowAd();
  
  // Initialize car images - ensure first image is visible for each car
  const containers = document.querySelectorAll('.car-image-container');
  containers.forEach((container, carIndex) => {
    const images = container.querySelectorAll('.car-image');
    const indicators = container.querySelectorAll('.indicator');
    
    // Make sure only the first image is active
    images.forEach((img, imgIndex) => {
      if (imgIndex === 0) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
      
      // Add click event listener for modal
      img.addEventListener('click', function() {
        openImageModal(carIndex, imgIndex);
      });
    });
    
    // Make sure only the first indicator is active
    indicators.forEach((indicator, indIndex) => {
      if (indIndex === 0) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  });
  
  // Add keyboard navigation for modal
  document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    const popupAd = document.getElementById('popupAdModal');
    
    if (modal && modal.style.display === 'block') {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        changeModalImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeModalImage(1);
      }
    }
    
    // ESC key closes popup ad
    if (popupAd && popupAd.style.display === 'block' && e.key === 'Escape') {
      closePopupAd();
    }
  });
  
  // Close modal when clicking outside the image
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }
  
  // Close popup ad when clicking outside the content
  const popupAd = document.getElementById('popupAdModal');
  if (popupAd) {
    popupAd.addEventListener('click', function(e) {
      if (e.target === popupAd) {
        closePopupAd();
      }
    });
  }
});