// Empty file with export to satisfy linter
export {};

// Add global interface for window
declare global {
  interface Window {
    openWarningModal: () => void;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.querySelector('.splash-screen') as HTMLDivElement;
  const container = document.querySelector('.container') as HTMLDivElement;
  const confirmButton = document.getElementById('confirmButton') as HTMLImageElement;
  const videoContainer = document.querySelector('.video-container') as HTMLDivElement;
  const bgVideo = document.getElementById('bgVideo') as HTMLVideoElement;
  const bgVideoMobile = document.getElementById('bgVideoMobile') as HTMLVideoElement;
  const audioToggle = document.getElementById('audioToggle') as HTMLButtonElement;
  const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement;
  const soundChaching = document.getElementById('soundChaching') as HTMLAudioElement;
  const scrollContainers = document.querySelectorAll('.scroll-container') as NodeListOf<HTMLDivElement>;
  const copyNotifications = document.querySelectorAll('.copy-notification') as NodeListOf<HTMLDivElement>;
  const videoModal = document.getElementById('videoModal') as HTMLDivElement;
  const modalCloseBtn = document.getElementById('modalCloseBtn') as HTMLButtonElement;
  const warningModal = document.getElementById('warningModal') as HTMLDivElement;
  const warningModalCloseBtn = document.getElementById('warningModalCloseBtn') as HTMLButtonElement;

  let isMuted = true;

  // Initialize background videos
  if (bgVideo) {
    bgVideo.muted = false; // Keep audio on
    bgVideo.loop = true;
    bgVideo.pause();
  }

  if (bgVideoMobile) {
    bgVideoMobile.muted = false; // Keep audio on
    bgVideoMobile.loop = true;
    bgVideoMobile.pause();
  }

  // Handle splash screen confirm button click
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      splashScreen.style.opacity = '0';
      splashScreen.style.visibility = 'hidden';
      container.style.display = 'block';

      // Start videos after splash screen is hidden
      if (bgVideo) {
        bgVideo.play().catch(error => {
          console.error('Error playing background video:', error);
        });
      }

      if (bgVideoMobile) {
        bgVideoMobile.play().catch(error => {
          console.error('Error playing mobile background video:', error);
        });
      }
    });
  }

  // Handle 3D hover effect on video container
  if (videoContainer) {
    const handleMouseMove = (e: MouseEvent) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      videoContainer.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0) rotateX(${-yAxis / 10}deg) rotateY(${xAxis / 10}deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
  }

  // Handle audio toggle
  if (audioToggle && backgroundMusic) {
    audioToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        backgroundMusic.pause();
        audioToggle.querySelector('img')?.classList.remove('active');
      } else {
        backgroundMusic.play().catch(error => {
          console.error('Error playing background music:', error);
        });
        audioToggle.querySelector('img')?.classList.add('active');
      }
    });
  }

  // Handle ticker copy functionality
  scrollContainers.forEach((container, index) => {
    container.addEventListener('click', () => {
      const textToCopy = 'Launching on May 16th at 4PM EST';
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const notification = copyNotifications[index];
          if (notification) {
            notification.style.opacity = '1';

            // Play sound
            if (soundChaching) {
              soundChaching.currentTime = 0;
              soundChaching.play().catch(error => {
                console.error('Error playing sound:', error);
              });
            }

            setTimeout(() => {
              notification.style.opacity = '0';
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Could not copy text:', err);
        });
    });
  });

  // Handle video modal
  if (modalCloseBtn && videoModal) {
    modalCloseBtn.addEventListener('click', () => {
      videoModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside of it
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.style.display = 'none';
      }
    });
  }

  // Handle escape key press to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
      videoModal.style.display = 'none';
    }
    if (e.key === 'Escape' && warningModal.style.display === 'flex') {
      warningModal.style.display = 'none';
    }
  });

  // Setup warning links for Dex and Pump buttons
  const warningLinks = document.querySelectorAll('[data-warning="true"]');
  warningLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (warningModal) {
        warningModal.style.display = 'flex';
      }
    });
  });

  // Define global function for opening warning modal
  window.openWarningModal = function() {
    if (warningModal) {
      warningModal.style.display = 'flex';
    }
  };

  // Close warning modal when close button is clicked
  if (warningModalCloseBtn && warningModal) {
    warningModalCloseBtn.addEventListener('click', () => {
      warningModal.style.display = 'none';
    });
  }

  // Close warning modal when clicking outside of it
  if (warningModal) {
    warningModal.addEventListener('click', (e) => {
      if (e.target === warningModal) {
        warningModal.style.display = 'none';
      }
    });
  }
});
