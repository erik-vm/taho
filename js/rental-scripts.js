// Car rental functionality
let currentImageIndex = [0, 0, 0, 0]; // Track current image for each car
let currentModalCarIndex = 0; // Track which car is being viewed in modal
let modalCurrentImageIndex = 0; // Track current image in modal

// Car data for modal
const carData = [
  {
    name: "Porche 911",
    price: "145 € / päev",
    images: ["images/cars/prch/prch1.jpg", "images/cars/prch/prch2.jpg", "images/cars/prch/prch3.jpg"]
  },
  {
    name: "Mercedes AMG",
    price: "175 € / päev", 
    images: ["images/cars/mb/mb1.jpg", "images/cars/mb/mb2.jpg", "images/cars/mb/mb3.jpg"]
  },
  {
    name: "Volkswagen Beetle",
    price: "85 € / päev",
    images: ["images/cars/beetle/beetle1.jpg", "images/cars/beetle/beetle2.jpg", "images/cars/beetle/beetle3.jpg"]
  }
];

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
function openModal(carIndex, imageIndex) {
  currentModalCarIndex = carIndex;
  modalCurrentImageIndex = imageIndex;
  
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalInfo = document.getElementById('modalInfo');
  
  // Set image and info
  modalImage.src = carData[carIndex].images[imageIndex];
  modalInfo.innerHTML = `
    <h3>${carData[carIndex].name}</h3>
    <p>${carData[carIndex].price} - Pilt ${imageIndex + 1} / ${carData[carIndex].images.length}</p>
  `;
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restore scrolling
}

function changeModalImage(direction) {
  modalCurrentImageIndex += direction;
  
  if (modalCurrentImageIndex < 0) {
    modalCurrentImageIndex = carData[currentModalCarIndex].images.length - 1;
  } else if (modalCurrentImageIndex >= carData[currentModalCarIndex].images.length) {
    modalCurrentImageIndex = 0;
  }
  
  const modalImage = document.getElementById('modalImage');
  const modalInfo = document.getElementById('modalInfo');
  
  modalImage.src = carData[currentModalCarIndex].images[modalCurrentImageIndex];
  modalInfo.innerHTML = `
    <h3>${carData[currentModalCarIndex].name}</h3>
    <p>${carData[currentModalCarIndex].price} - Pilt ${modalCurrentImageIndex + 1} / ${carData[currentModalCarIndex].images.length}</p>
  `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create modal HTML
  const modalHTML = `
    <div id="imageModal" class="modal">
      <div class="modal-content">
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <button class="modal-nav prev" onclick="changeModalImage(-1)">‹</button>
        <button class="modal-nav next" onclick="changeModalImage(1)">›</button>
        <img id="modalImage" class="modal-image" src="" alt="Car Image">
        <div id="modalInfo" class="modal-info"></div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
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
    });
    
    // Make sure only the first indicator is active
    indicators.forEach((indicator, indIndex) => {
      if (indIndex === 0) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Add click event to the container to open modal with currently active image
    container.addEventListener('click', function(event) {
      // Don't trigger if clicking on navigation buttons or indicators
      if (event.target.classList.contains('image-nav') || 
          event.target.classList.contains('indicator')) {
        return;
      }
      
      // Get the currently active image index for this car
      const currentActiveIndex = currentImageIndex[carIndex];
      openModal(carIndex, currentActiveIndex);
    });
  });
  
  // Close modal when clicking outside the image
  document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  
  // Navigate with arrow keys in modal
  document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('show')) {
      if (event.key === 'ArrowLeft') {
        changeModalImage(-1);
      } else if (event.key === 'ArrowRight') {
        changeModalImage(1);
      }
    }
  });
});