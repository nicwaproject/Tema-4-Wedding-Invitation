document.getElementById('openInvitation').addEventListener('click', function() {
  document.getElementById('cover').style.display = 'none'; // Hide the cover
  document.getElementById('invitation').classList.add('active'); // Show the invitation sections
});

// Function untuk mengambil parameter dari URL
function getGuestNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('guest'); // Ambil nilai parameter 'guest'
  return guestName ? guestName : 'Guest'; // Jika tidak ada nama, gunakan 'Guest' default
}

// Menampilkan nama tamu pada elemen <p id="guestName">
document.getElementById('guestName').textContent = getGuestNameFromURL();

// Menangani tombol Open Invitation
document.getElementById('openInvitation').addEventListener('click', function() {
  // Setelah undangan dibuka, mulai memainkan musik
  const audio = document.getElementById('weddingMusic');
  audio.play();
  
  // Menampilkan kontrol Play/Pause
  document.getElementById('music-controls').style.display = 'block';
});

// Menangani Play/Pause
document.getElementById('playPauseButton').addEventListener('click', function() {
  const audio = document.getElementById('weddingMusic');
  const icon = document.getElementById('playPauseIcon');
  
  if (audio.paused) {
    audio.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  }
});

// Countdown Timer
const countdown = () => {
    const weddingDate = new Date("2024-12-31T00:00:00").getTime(); // Set the wedding date here
    const now = new Date().getTime();
    const timeDiff = weddingDate - now;
  
    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    // Update the countdown timer elements
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  
    // If the countdown is over, display a message
    if (timeDiff < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerHTML = "<h2>The Event Has Started!</h2>";
    }
  };
  
  // Update countdown every second
  const timer = setInterval(countdown, 1000);

// Initialize Lottie for animation
lottie.loadAnimation({
    container: document.getElementById('lottie-profile'), // ID dari container animasi
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'profile1.json' // Pastikan path ke file JSON benar
  });

// Initialize Lottie for Akad animation
lottie.loadAnimation({
  container: document.getElementById('lottie-ceremony'), // ID dari container animasi Akad
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'ring.json' // Path ke file JSON animasi Akad
});

// Initialize Lottie for Resepsi animation
lottie.loadAnimation({
  container: document.getElementById('lottie-reception'), // ID dari container animasi Resepsi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'wine.json' // Path ke file JSON animasi Resepsi
});

// Initialize Lottie for Quran animation
lottie.loadAnimation({
  container: document.getElementById('lottie-quran'), // ID dari container animasi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'book.json' // Path ke file JSON animasi Lottie
});

// Gallery
let currentSlide = 1;

function openModal(slideIndex) {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImage');
  const images = document.querySelectorAll('.gallery-item');
  
  currentSlide = slideIndex;
  modal.style.display = "block";
  modalImg.src = images[slideIndex - 1].src;
}

function closeModal() {
  document.getElementById('galleryModal').style.display = "none";
}

function changeSlide(n) {
  const images = document.querySelectorAll('.gallery-item');
  currentSlide += n;
  
  if (currentSlide > images.length) {
    currentSlide = 1;
  } else if (currentSlide < 1) {
    currentSlide = images.length;
  }
  
  document.getElementById('modalImage').src = images[currentSlide - 1].src;
}

// Initialize Lottie for Gallery animation
lottie.loadAnimation({
  container: document.getElementById('lottie-gallery'), // ID dari container animasi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'gallery.json' // Path ke file JSON animasi Lottie
});

// Initialize Lottie for RSVP animation
lottie.loadAnimation({
  container: document.getElementById('lottie-rsvp'), // ID dari container animasi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'message.json' // Path ke file JSON animasi Lottie
});

document.getElementById('rsvpForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  const guestName = document.getElementById('guestName').value;
  const guestMessage = document.getElementById('guestMessage').value;
  const attendance = document.getElementById('attendance').value;

  // Create an object with form data
  const formData = {
    name: guestName,
    message: guestMessage,
    attendance: attendance
  };

  // Send data to backend using fetch
  fetch('https://tema-4-rsvp-handle.glitch.me/rsvp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    // Handle response from server (add message to list or show feedback)
    if (data.success) {
      const messageItem = document.createElement('div');
      messageItem.classList.add('message-item');
      messageItem.innerHTML = `
        <h4>${guestName} (${attendance})</h4>
        <p>${guestMessage}</p>
      `;
      document.getElementById('messageList').appendChild(messageItem);

      // Reset form
      document.getElementById('rsvpForm').reset();
    } else {
      alert('Error submitting RSVP. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error submitting RSVP. Please try again.');
  });
});

// Initialize Lottie for Gift animation
lottie.loadAnimation({
  container: document.getElementById('lottie-gift'), // ID dari container animasi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'gift-box1.json' // Path ke file JSON animasi Lottie
});

// Function to show the bank account number
document.getElementById('showAccountButton').addEventListener('click', function() {
  document.getElementById('bankAccountContainer').style.display = 'block';
});

// Function to copy the bank account number to clipboard
document.getElementById('copyButton').addEventListener('click', function() {
  const accountNumber = document.getElementById('bankAccountNumber').innerText;

  // Create a temporary input to copy the account number
  const tempInput = document.createElement('input');
  tempInput.value = accountNumber;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Show a message that the account number has been copied
  alert('Bank account number copied!');
});

// Initialize Lottie for Thank You animation
lottie.loadAnimation({
  container: document.getElementById('lottie-thankyou'), // ID dari container animasi
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'love.json' // Path ke file JSON animasi Lottie
});
