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
  },
  'mobile-games': {
    id: 'mobile-games',
    title: 'Mobile Games',
    verticalCapsule: 'assets/images/games/mobile-game-puff.png',
    horizontalCapsule: 'assets/images/games/mobile-showcase-horizontal.png',
    trailer: 'assets/videos/all-games-showcase.mp4',
    trailerTabLabel: '🎬 Showcase Video',
    steamUrl: '#contact',
    ctaText: 'Contact Team Spyra',
    clips: []
  },
  'key-bound': {
    id: 'key-bound',
    title: 'Key Bound',
    verticalCapsule: 'assets/images/games/key-bound.png',
    horizontalCapsule: 'assets/images/games/key-bound.png',
    trailer: '',
    steamUrl: 'https://siddharth53.itch.io/key-bound',
    ctaText: 'Play on itch.io ↗',
    clips: [
      {
        tabLabel: '🎮 Gameplay 1',
        src: 'assets/images/games/key-bound-gameplay-1.png'
      },
      {
        tabLabel: '🧩 Gameplay 2',
        src: 'assets/images/games/key-bound-gameplay-2.png'
      }
    ]
  },
  'serum-xiii': {
    id: 'serum-xiii',
    title: 'Serum XIII',
    verticalCapsule: 'assets/images/games/serum-xiii.png',
    horizontalCapsule: 'assets/images/games/serum-xiii.png',
    trailer: '',
    steamUrl: 'https://siddharth53.itch.io/serum-8',
    ctaText: 'Play on itch.io ↗',
    clips: [
      {
        tabLabel: '🎮 Gameplay',
        src: 'assets/images/games/serum-xiii-gameplay.png'
      },
      {
        tabLabel: '🪪 Access Pass',
        src: 'assets/images/games/serum-xiii-pass.png'
      },
      {
        tabLabel: '💊 Medkit Item',
        src: 'assets/images/games/serum-xiii.png'
      }
    ]
  },
  'oon-wala': {
    id: 'oon-wala',
    title: 'OON WALA',
    verticalCapsule: 'assets/images/games/oon-wala.png',
    horizontalCapsule: 'assets/images/games/oon-wala.png',
    trailer: '',
    steamUrl: 'https://siddharth53.itch.io/oon-wala',
    ctaText: 'Play on itch.io ↗',
    clips: [
      {
        tabLabel: '⚡ Gameplay GIF',
        src: 'assets/images/games/oon-wala-gameplay.gif'
      },
      {
        tabLabel: '🎮 Title Screen',
        src: 'assets/images/games/oon-wala-title.png'
      },
      {
        tabLabel: '🐑 Pasture View',
        src: 'assets/images/games/oon-wala.png'
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
  initGamesCarousel();
  initMobileRotator();
  initGameShowcaseModal();
  initAssetVideoModal();
  initAssetInquiryLinks();
  initScrollSpy();
  preloadGameMedia();
});

// Preload media into browser memory immediately
function preloadGameMedia() {
  // Preload clips from registry
  Object.values(SPYRA_GAMES).forEach(game => {
    if (game.clips) {
      game.clips.forEach(clip => {
        const img = new Image();
        img.src = clip.src;
      });
    }
  });

  // Preload mobile preview images
  const mobileImgs = [
    'assets/images/games/mobile-game-puff.png',
    'assets/images/games/mobile-game-bartender.png',
    'assets/images/games/mobile-game-chub.png',
    'assets/images/games/mobile-game-resort.png',
    'assets/images/games/mobile-showcase-horizontal.png'
  ];
  mobileImgs.forEach(src => {
    const img = new Image();
    img.src = src;
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

  // Open modal via event delegation on #gamesGrid (works seamlessly for original & cloned cards)
  const gamesGrid = document.getElementById('gamesGrid');
  gamesGrid?.addEventListener('click', (e) => {
    // If clicked a link, CTA, or button, let it navigate normally
    if (e.target.closest('a') || e.target.closest('.platform-link') || e.target.closest('button')) {
      return;
    }
    const card = e.target.closest('.game-showcase-card');
    if (!card) return;
    const gameId = card.getAttribute('data-game');
    if (gameId && SPYRA_GAMES[gameId]) {
      openGameShowcase(gameId);
    }
  });

  gamesGrid?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.game-showcase-card');
      if (!card) return;
      e.preventDefault();
      const gameId = card.getAttribute('data-game');
      if (gameId && SPYRA_GAMES[gameId]) {
        openGameShowcase(gameId);
      }
    }
  });

  // Explicit button to watch mobile showcase
  const watchMobileBtn = document.getElementById('btnWatchMobileShowcase');
  watchMobileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openGameShowcase('mobile-games');
  });

  // Close modal when clicking a hash link CTA (e.g. #contact)
  const steamBtn = document.getElementById('modalSteamActionBtn');
  steamBtn?.addEventListener('click', () => {
    if (steamBtn.getAttribute('href')?.startsWith('#')) {
      closeGameShowcase();
    }
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

  // Configure Dynamic CTA Button
  const steamBtn = document.getElementById('modalSteamActionBtn');
  const steamText = document.getElementById('modalSteamActionText');
  if (steamBtn && steamText) {
    steamBtn.href = game.steamUrl;
    steamText.textContent = game.ctaText;
    if (game.steamUrl && game.steamUrl.startsWith('#')) {
      steamBtn.target = '_self';
    } else {
      steamBtn.target = '_blank';
    }
  }

  // Media items: Video Trailer/Showcase followed by clips/screenshots
  modalMediaItems = [];
  if (game.trailer && game.trailer.trim() !== '') {
    modalMediaItems.push({
      type: 'video',
      tabLabel: game.trailerTabLabel || '🎬 Trailer',
      src: game.trailer
    });
  }

  if (game.clips && game.clips.length) {
    game.clips.forEach((clip) => {
      modalMediaItems.push({
        type: clip.type || 'image',
        tabLabel: clip.tabLabel,
        src: clip.src,
        fallbackSrc: clip.fallbackSrc
      });
    });
  }

  if (modalMediaItems.length === 0 && game.verticalCapsule) {
    modalMediaItems.push({
      type: 'image',
      tabLabel: '🎮 Artwork',
      src: game.verticalCapsule
    });
  }

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

  // If there's only 1 item (e.g. mobile games has only the showcase video), hide media tabs
  if (modalMediaItems.length <= 1) {
    navContainer.style.display = 'none';
    return;
  }

  navContainer.style.display = 'flex';
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

// ============================================================================
// MOBILE GAMES CARD - CONTINUOUS VERTICAL ROTATOR
// ============================================================================
let mobileRotatorInterval = null;
let currentMobileSlide = 0;
const MOBILE_SLIDE_DURATION = 3200; // Change slide every 3.2 seconds

function initMobileRotator() {
  const rotators = document.querySelectorAll('.mobile-vertical-rotator');
  if (!rotators.length) return;

  startMobileRotator();

  rotators.forEach(rotator => {
    const card = rotator.closest('.game-showcase-card');
    card?.addEventListener('mouseenter', stopMobileRotator);
    card?.addEventListener('mouseleave', startMobileRotator);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopMobileRotator();
    } else {
      startMobileRotator();
    }
  });
}

function goToMobileSlide(index) {
  const rotators = document.querySelectorAll('.mobile-vertical-rotator');
  if (!rotators.length) return;

  const firstRotatorSlides = rotators[0].querySelectorAll('.rotator-slide');
  if (!firstRotatorSlides.length) return;

  currentMobileSlide = (index + firstRotatorSlides.length) % firstRotatorSlides.length;

  rotators.forEach(rotator => {
    const slides = rotator.querySelectorAll('.rotator-slide');
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentMobileSlide);
    });
  });
}

function startMobileRotator() {
  stopMobileRotator();
  mobileRotatorInterval = setInterval(() => {
    goToMobileSlide(currentMobileSlide + 1);
  }, MOBILE_SLIDE_DURATION);
}

function stopMobileRotator() {
  if (mobileRotatorInterval) {
    clearInterval(mobileRotatorInterval);
    mobileRotatorInterval = null;
  }
}

// ============================================================================
// FEATURED GAMES CAROUSEL - INFINITE LOOP & SMOOTH SCROLL SYSTEM
// ============================================================================
let isCarouselDragging = false;
let carouselHasDragged = false;

function initGamesCarousel() {
  const viewport = document.getElementById('gamesCarouselViewport');
  const grid = document.getElementById('gamesGrid');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (!viewport || !grid) return;

  const originalCards = Array.from(grid.querySelectorAll('.game-showcase-card'));
  const totalCards = originalCards.length;
  if (totalCards === 0) return;

  // 1. Create seamless infinite clone sets: [Clone Set Before] [Original Set] [Clone Set After]
  // This allows infinite scrolling both left and right without ever reaching a hard wall.
  const beforeClones = originalCards.map(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('carousel-clone', 'clone-before');
    clone.setAttribute('aria-hidden', 'true');
    // Strip duplicate IDs to keep HTML valid
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    return clone;
  });

  const afterClones = originalCards.map(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('carousel-clone', 'clone-after');
    clone.setAttribute('aria-hidden', 'true');
    // Strip duplicate IDs to keep HTML valid
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    return clone;
  });

  // Prepend before-clones in reverse order so they match the original order
  for (let i = beforeClones.length - 1; i >= 0; i--) {
    grid.insertBefore(beforeClones[i], grid.firstChild);
  }
  // Append after-clones
  afterClones.forEach(clone => grid.appendChild(clone));

  // Helper to measure accurate card full stride (width + gap)
  function getCardStride() {
    const card = grid.querySelector('.game-showcase-card');
    if (!card) return 586;
    const style = window.getComputedStyle(grid);
    const gap = parseFloat(style.columnGap || style.gap) || 28;
    return card.offsetWidth + gap;
  }

  function getSetWidth() {
    return totalCards * getCardStride();
  }

  // Set initial scroll position to the start of the middle (original) set
  function setInitialPosition() {
    const setWidth = getSetWidth();
    viewport.scrollLeft = setWidth;
  }

  // Position immediately
  setInitialPosition();

  // 2. Active Dot Indicators
  const indicatorDots = indicatorsContainer ? Array.from(indicatorsContainer.querySelectorAll('.indicator-dot')) : [];

  function updateActiveDot(index) {
    const normalized = ((index % totalCards) + totalCards) % totalCards;
    indicatorDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === normalized);
    });
  }

  // 3. Silent boundary wrap normalizer
  let isNormalizing = false;

  function checkBoundaryWrap() {
    if (isNormalizing || isCarouselDragging) return;
    const setWidth = getSetWidth();
    if (setWidth <= 0) return;

    const scrollLeft = viewport.scrollLeft;
    const stride = getCardStride();

    // If scrolled deeply into the "after" clone set
    if (scrollLeft >= setWidth * 2 - (stride * 0.2)) {
      isNormalizing = true;
      viewport.scrollLeft = scrollLeft - setWidth;
      isNormalizing = false;
    }
    // If scrolled deeply into the "before" clone set
    else if (scrollLeft <= setWidth * 0.3) {
      isNormalizing = true;
      viewport.scrollLeft = scrollLeft + setWidth;
      isNormalizing = false;
    }

    const currentIndex = Math.round((viewport.scrollLeft - setWidth) / stride);
    updateActiveDot(currentIndex);
  }

  let scrollTimeout = null;
  viewport.addEventListener('scroll', () => {
    const stride = getCardStride();
    const setWidth = getSetWidth();
    const rawIndex = Math.round((viewport.scrollLeft - setWidth) / stride);
    const currentIndex = ((rawIndex % totalCards) + totalCards) % totalCards;
    updateActiveDot(currentIndex);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      checkBoundaryWrap();
    }, 90);
  }, { passive: true });

  // 4. Smooth Navigation Buttons (Next / Prev)
  function scrollByCards(count) {
    const stride = getCardStride();
    const setWidth = getSetWidth();

    // If near the boundaries, instantly normalize first before smooth scroll
    if (viewport.scrollLeft >= setWidth * 2 - 10) {
      viewport.scrollLeft -= setWidth;
    } else if (viewport.scrollLeft <= setWidth * 0.2) {
      viewport.scrollLeft += setWidth;
    }

    const currentCard = Math.round(viewport.scrollLeft / stride);
    const targetScroll = (currentCard + count) * stride;

    viewport.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }

  nextBtn?.addEventListener('click', () => {
    scrollByCards(1);
  });

  prevBtn?.addEventListener('click', () => {
    scrollByCards(-1);
  });

  // 5. Indicator Dots Click
  indicatorDots.forEach((dot, dotIdx) => {
    dot.addEventListener('click', () => {
      const setWidth = getSetWidth();
      const stride = getCardStride();
      const targetScroll = setWidth + (dotIdx * stride);

      viewport.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      updateActiveDot(dotIdx);
    });
  });

  // 6. Mouse Drag-To-Scroll (with smooth snapping & click protection)
  let startX = 0;
  let scrollLeftStart = 0;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('a') || e.target.closest('.platform-link') || e.target.closest('button')) {
      return;
    }
    isCarouselDragging = true;
    carouselHasDragged = false;
    startX = e.pageX - viewport.offsetLeft;
    scrollLeftStart = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isCarouselDragging) return;
    const x = e.pageX - viewport.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      carouselHasDragged = true;
    }
    viewport.scrollLeft = scrollLeftStart - walk;

    // Real-time boundary wrap while dragging
    const setWidth = getSetWidth();
    if (setWidth > 0) {
      if (viewport.scrollLeft >= setWidth * 2) {
        viewport.scrollLeft -= setWidth;
        scrollLeftStart -= setWidth;
      } else if (viewport.scrollLeft < setWidth) {
        viewport.scrollLeft += setWidth;
        scrollLeftStart += setWidth;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (!isCarouselDragging) return;
    isCarouselDragging = false;
    viewport.classList.remove('is-dragging');

    // Snap to nearest card smoothly upon drag release
    const stride = getCardStride();
    const nearestIndex = Math.round(viewport.scrollLeft / stride);
    viewport.scrollTo({
      left: nearestIndex * stride,
      behavior: 'smooth'
    });

    // Reset drag flag after small delay to protect click events
    setTimeout(() => {
      carouselHasDragged = false;
    }, 60);
  });

  // 7. Mouse Wheel on Carousel translates to horizontal scrolling
  viewport.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      viewport.scrollLeft += e.deltaY * 0.9;
    }
  }, { passive: false });

  // 8. Keyboard Arrow Navigation
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCards(-1);
    }
  });

  // 9. Window Resize
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const stride = getCardStride();
      const setWidth = getSetWidth();
      const currentDot = indicatorDots.findIndex(d => d.classList.contains('active'));
      const activeIdx = currentDot >= 0 ? currentDot : 0;
      viewport.scrollLeft = setWidth + (activeIdx * stride);
    }, 120);
  });
}
