/**
 * SPYRA PORTFOLIO - MAIN INTERACTION SCRIPT
 * Lightweight, fast, asset-driven logic with zero unnecessary features.
 */

// ============================================================================
// SPYRA GAMES REGISTRY
// Pure assets: Vertical capsule (poster/icon), trailer video, and gameplay GIFs.
// ============================================================================
const SPYRA_GAMES = {
  'room-to-breathe': {
    id: 'room-to-breathe',
    title: 'Room to Breathe',
    verticalCapsule: 'assets/images/games/room-to-breathe-vertical.png',
    horizontalCapsule: 'assets/images/games/room-to-breathe-horizontal.png',
    trailer: 'assets/videos/room-to-breathe-trailer.mp4',
    steamUrl: 'https://store.steampowered.com/app/4380870/Room_to_Breathe/',
    ctaText: 'Check Out the Game',
    clips: [
      {
        tabLabel: '🎮 Gameplay GIF 1',
        src: 'assets/images/games/room-to-breathe-gameplay-1.gif'
      },
      {
        tabLabel: '⚡ Gameplay GIF 2',
        src: 'assets/images/games/room-to-breathe-gameplay-2.gif'
      }
    ]
  },
  'moon-swarm': {
    id: 'moon-swarm',
    title: 'Moon Swarm',
    verticalCapsule: 'assets/images/games/moon-swarm-vertical.png',
    horizontalCapsule: 'assets/images/games/moon-swarm-horizontal.png',
    trailer: 'assets/videos/moon-swarm-trailer.mp4',
    steamUrl: 'https://store.steampowered.com/app/5040610/Moon_Swarm/',
    ctaText: 'Play Demo',
    clips: [
      {
        tabLabel: '🎮 Gameplay GIF 1',
        src: 'assets/images/games/moon-swarm-gameplay-1.gif'
      },
      {
        tabLabel: '⚡ Gameplay GIF 2',
        src: 'assets/images/games/moon-swarm-gameplay-2.gif'
      }
    ]
  }
};

let currentModalGame = null;
let currentMediaIndex = 0;
let modalMediaItems = [];

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initContactForm();
  initGameShowcaseModal();
  initAssetVideoModal();
  initAssetInquiryLinks();
  initScrollSpy();
  preloadGameMedia();
});

// Preload all GIF clips into browser memory immediately
function preloadGameMedia() {
  Object.values(SPYRA_GAMES).forEach(game => {
    if (game.clips) {
      game.clips.forEach(clip => {
        const img = new Image();
        img.src = clip.src;
      });
    }
  });
}

// Sticky Header on Scroll
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('sticky');
    } else {
      header?.classList.remove('sticky');
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileBtn');
  const navMenu = document.getElementById('navMenu');

  if (!mobileBtn || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('open');
    mobileBtn.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
  };

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    mobileBtn.classList.toggle('open', isOpen);
    mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formSuccessMsg');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.textContent = 'Thank you! Your message has been sent to Spyra.';
      }
      form.reset();
    }, 700);
  });
}

// ============================================================================
// GAME SHOWCASE MODAL (Trailer & Gameplay GIFs)
// ============================================================================
function initGameShowcaseModal() {
  const modal = document.getElementById('gameModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  // Open modal when clicking on a game card
  document.querySelectorAll('.game-showcase-card').forEach(card => {
    card.addEventListener('click', () => {
      const gameId = card.getAttribute('data-game');
      if (gameId && SPYRA_GAMES[gameId]) {
        openGameShowcase(gameId);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const gameId = card.getAttribute('data-game');
        if (gameId && SPYRA_GAMES[gameId]) {
          openGameShowcase(gameId);
        }
      }
    });
  });

  // Close button
  closeBtn?.addEventListener('click', () => closeGameShowcase());

  // Click outside dialog to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeGameShowcase();
    }
  });

  // Keyboard navigation: Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeGameShowcase();
    }
  });
}

function openGameShowcase(gameId) {
  const game = SPYRA_GAMES[gameId];
  if (!game) return;

  currentModalGame = game;
  const modal = document.getElementById('gameModal');

  // Set Title & Thumbnail Icon
  const titleEl = document.getElementById('modalGameTitle');
  const iconEl = document.getElementById('modalGameIcon');

  if (titleEl) titleEl.textContent = game.title;
  if (iconEl) {
    iconEl.src = game.verticalCapsule;
    iconEl.alt = `${game.title} Capsule`;
  }

  // Configure Dynamic Steam CTA Button
  const steamBtn = document.getElementById('modalSteamActionBtn');
  const steamText = document.getElementById('modalSteamActionText');
  if (steamBtn && steamText) {
    steamBtn.href = game.steamUrl;
    steamText.textContent = game.ctaText;
  }

  // Exactly 3 clean media items: Trailer Video, Gameplay GIF 1, Gameplay GIF 2
  modalMediaItems = [
    {
      type: 'video',
      tabLabel: '🎬 Trailer',
      src: game.trailer
    },
    ...game.clips.map((clip) => ({
      type: 'gif',
      tabLabel: clip.tabLabel,
      src: clip.src,
      fallbackSrc: clip.fallbackSrc
    }))
  ];

  renderModalTabs();
  activateMedia(0);

  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
  document.body.style.overflow = 'hidden';
}

function renderModalTabs() {
  const navContainer = document.getElementById('modalMediaNav');
  if (!navContainer) return;

  navContainer.innerHTML = '';
  modalMediaItems.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = `media-nav-tab ${index === 0 ? 'active' : ''}`;
    btn.type = 'button';
    btn.textContent = item.tabLabel;
    btn.addEventListener('click', () => {
      activateMedia(index);
    });
    navContainer.appendChild(btn);
  });
}

function activateMedia(index) {
  if (index < 0 || index >= modalMediaItems.length) return;
  currentMediaIndex = index;
  const item = modalMediaItems[index];

  const videoWrapper = document.getElementById('modalVideoWrapper');
  const videoPlayer = document.getElementById('modalVideoPlayer');
  const videoSource = document.getElementById('modalVideoSource');
  const imageWrapper = document.getElementById('modalImageWrapper');
  const displayImage = document.getElementById('modalDisplayImage');

  // Toggle active tab style cleanly
  document.querySelectorAll('.media-nav-tab').forEach((tab, idx) => {
    tab.classList.toggle('active', idx === index);
  });

  if (item.type === 'video') {
    if (imageWrapper) imageWrapper.style.display = 'none';
    if (videoWrapper) videoWrapper.style.display = 'flex';

    if (videoPlayer && videoSource) {
      if (videoSource.src !== item.src && !videoSource.src.endsWith(item.src)) {
        videoSource.src = item.src;
        videoPlayer.load();
      }
      videoPlayer.play().catch(() => {});
    }
  } else {
    if (videoPlayer) {
      videoPlayer.pause();
    }
    if (videoWrapper) videoWrapper.style.display = 'none';
    if (imageWrapper) imageWrapper.style.display = 'flex';

    if (displayImage) {
      const loader = document.getElementById('modalImageLoader');
      const currentLoaded = displayImage.getAttribute('data-loaded-src');

      if (currentLoaded !== item.src) {
        if (loader) loader.style.display = 'flex';
        displayImage.style.opacity = '0';

        displayImage.onload = () => {
          if (loader) loader.style.display = 'none';
          displayImage.style.opacity = '1';
          displayImage.setAttribute('data-loaded-src', item.src);
        };

        displayImage.onerror = () => {
          if (loader) {
            loader.innerHTML = '<span style="color:#fcd561;">Preview unavailable</span>';
          }
        };

        displayImage.src = item.src;
        displayImage.alt = item.tabLabel;

        if (displayImage.complete && displayImage.naturalWidth > 0) {
          if (loader) loader.style.display = 'none';
          displayImage.style.opacity = '1';
          displayImage.setAttribute('data-loaded-src', item.src);
        }
      } else {
        if (loader) loader.style.display = 'none';
        displayImage.style.opacity = '1';
      }
    }
  }
}

function closeGameShowcase() {
  const modal = document.getElementById('gameModal');
  const videoPlayer = document.getElementById('modalVideoPlayer');

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }

  document.body.style.overflow = '';
  currentModalGame = null;
}

// ============================================================================
// ASSET VIDEO MODAL (Simple Flags & Tool Demonstration)
// ============================================================================
function initAssetVideoModal() {
  const assetModal = document.getElementById('assetVideoModal');
  const closeBtn = document.getElementById('assetModalCloseBtn');
  const videoPlayer = document.getElementById('assetModalVideoPlayer');
  const openVisualBtn = document.getElementById('openSimpleFlagsVisual');
  const openButtonBtn = document.getElementById('btnWatchSimpleFlags');

  if (!assetModal) return;

  const openModal = () => {
    assetModal.style.display = 'flex';
    requestAnimationFrame(() => {
      assetModal.classList.add('open');
      assetModal.setAttribute('aria-hidden', 'false');
    });
    document.body.style.overflow = 'hidden';

    if (videoPlayer) {
      videoPlayer.play().catch(() => {});
    }
  };

  const closeModal = () => {
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
    assetModal.classList.remove('open');
    assetModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      assetModal.style.display = 'none';
    }, 250);
    document.body.style.overflow = '';
  };

  openVisualBtn?.addEventListener('click', openModal);
  openVisualBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  openButtonBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  assetModal.addEventListener('click', (e) => {
    if (e.target === assetModal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!assetModal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Pre-fill contact form when clicking asset inquiry links
function initAssetInquiryLinks() {
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const assetModal = document.getElementById('assetVideoModal');
  const videoPlayer = document.getElementById('assetModalVideoPlayer');

  document.querySelectorAll('.asset-inquire-link, #assetModalCtaBtn').forEach(link => {
    link.addEventListener('click', () => {
      // If modal is open, close it
      if (assetModal?.classList.contains('open')) {
        if (videoPlayer) {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
        }
        assetModal.classList.remove('open');
        assetModal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
          assetModal.style.display = 'none';
        }, 250);
        document.body.style.overflow = '';
      }

      const toolName = link.getAttribute('data-tool') || 'Simple Flags';
      if (subjectInput) {
        subjectInput.value = `${toolName} Asset Inquiry`;
      }
      setTimeout(() => {
        messageInput?.focus();
      }, 500);
    });
  });
}

// Active navigation highlight based on scroll position
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-item');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

