document.addEventListener('DOMContentLoaded', function() {
  // Menangani tombol Open Invitation
  document.getElementById('openInvitation').addEventListener('click', function() {
    document.getElementById('cover').style.display = 'none'; // Sembunyikan cover
    document.getElementById('invitation').classList.add('active'); // Tampilkan undangan
  });

  // Menampilkan nama tamu pada elemen <p id="guestName">
  document.getElementById('guestName').textContent = getGuestNameFromURL();

  // Menangani tombol Open Invitation dan memulai musik
  document.getElementById('openInvitation').addEventListener('click', function() {
    const audio = document.getElementById('weddingMusic');
    audio.play(); // Mainkan musik
  });

  // Menangani tombol Play/Pause
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
    const weddingDate = new Date("2024-12-31T00:00:00").getTime(); // Set tanggal pernikahan
    const now = new Date().getTime();
    const timeDiff = weddingDate - now;
    
    // Perhitungan waktu (hari, jam, menit, detik)
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Update elemen countdown
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Jika countdown selesai, tampilkan pesan
    if (timeDiff < 0) {
      clearInterval(timer);
      document.getElementById("countdown").innerHTML = "<h2>The Event Has Started!</h2>";
    }
  };
  
  // Perbarui countdown setiap detik
  const timer = setInterval(countdown, 1000);

  // Menginisialisasi animasi Lottie
  const lottieAnimations = [
    { id: 'lottie-profile', path: 'profile1.json' },
    { id: 'lottie-ceremony', path: 'ring.json' },
    { id: 'lottie-reception', path: 'wine.json' },
    { id: 'lottie-quran', path: 'book.json' },
    { id: 'lottie-gallery', path: 'gallery.json' },
    { id: 'lottie-rsvp', path: 'message.json' },
    { id: 'lottie-gift', path: 'gift-box1.json' },
    { id: 'lottie-thankyou', path: 'love.json' }
  ];

  lottieAnimations.forEach(animation => {
    lottie.loadAnimation({
      container: document.getElementById(animation.id),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animation.path
    });
  });

 // Mengambil data RSVP ketika halaman dimuat
fetch('https://tema-4-rsvp-handle.glitch.me/rsvps')
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    const messageItem = document.createElement('div');
    messageItem.classList.add('message-item');
    messageItem.innerHTML = `
      <h4>${item.name} (${item.attendance})</h4>
      <p>${item.message}</p>
    `;
    document.getElementById('messageList').appendChild(messageItem);
  });
})
.catch(error => console.error('Error fetching RSVP data:', error));

// Menangani form RSVP
document.getElementById('rsvpForm').addEventListener('submit', function (event) {
event.preventDefault(); // Prevent default form submission

// Get form data
const guestNameRSVP = document.getElementById('guestNameRSVP').value.trim(); // Ganti ID
const guestMessage = document.getElementById('guestMessage').value.trim();
const attendance = document.getElementById('attendance').value;

// Check if all required fields are filled
if (!guestNameRSVP || !guestMessage || !attendance) {
  alert('Please fill out all fields.');
  return;
}

// Create an object with form data
const formData = {
  name: guestNameRSVP,
  message: guestMessage,
  attendance: attendance
};

// Submit form data
fetch('https://tema-4-rsvp-handle.glitch.me/rsvp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    alert('RSVP submitted successfully!');
    location.reload(); // Optionally, reload the page after submission
  } else {
    alert('Error: ' + data.error);
  }
})
.catch(error => {
  console.error('Error submitting RSVP:', error);
});
});


  // Function untuk menampilkan nomor rekening
  document.getElementById('showAccountButton').addEventListener('click', function() {
    document.getElementById('bankAccountContainer').style.display = 'block';
  });

  // Function untuk menyalin nomor rekening ke clipboard
  document.getElementById('copyButton').addEventListener('click', function() {
    const accountNumber = document.getElementById('bankAccountNumber').innerText;

    const tempInput = document.createElement('input');
    tempInput.value = accountNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Bank account number copied!');
  });
});

// Function untuk mengambil nama tamu dari URL
function getGuestNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('guest'); // Ambil nilai parameter 'guest'
  return guestName ? guestName : 'Guest'; // Jika tidak ada nama, gunakan 'Guest' default
}

// Gallery modal functionality
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
