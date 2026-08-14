function toggleMobileMenu(button){
  const menu = document.querySelector('nav ul');
  const open = menu.classList.toggle('open');
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  button.textContent = open ? '✕' : '☰';
}

document.querySelectorAll('nav ul a').forEach(a => {
  a.addEventListener('click', () => {
    const menu = document.querySelector('nav ul');
    const button = document.querySelector('.menu-toggle');
    menu.classList.remove('open');
    if(button){
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-label','Open menu');
      button.textContent='☰';
    }
  });
});

window.addEventListener('resize', () => {
  if(window.innerWidth > 800){
    const menu=document.querySelector('nav ul');
    const button=document.querySelector('.menu-toggle');
    menu.classList.remove('open');
    if(button){button.setAttribute('aria-expanded','false');button.textContent='☰';}
  }
});

let transformationIndex = 0;
const transformationTrack = document.getElementById('transformationTrack');
const transformationDots = document.querySelectorAll('#transformationDots button');
const transformationTotal = document.querySelectorAll('.transformation-slide').length;

function updateTransformationCarousel(){
  transformationTrack.style.transform = `translateX(-${transformationIndex * 100}%)`;
  transformationDots.forEach((dot,i) => dot.classList.toggle('active', i === transformationIndex));
}

function moveTransformation(direction){
  transformationIndex = (transformationIndex + direction + transformationTotal) % transformationTotal;
  updateTransformationCarousel();
}

function goTransformation(index){
  transformationIndex = index;
  updateTransformationCarousel();
}

// Swipe support for mobile.
let transformationTouchStartX = 0;
let transformationTouchEndX = 0;

transformationTrack.addEventListener('touchstart', e => {
  transformationTouchStartX = e.changedTouches[0].screenX;
}, {passive:true});

transformationTrack.addEventListener('touchend', e => {
  transformationTouchEndX = e.changedTouches[0].screenX;
  const distance = transformationTouchEndX - transformationTouchStartX;
  if(Math.abs(distance) > 50){
    moveTransformation(distance < 0 ? 1 : -1);
  }
});

let videoIndex = 0;
const videoTrack = document.getElementById('videoTrack');
const videoDots = document.querySelectorAll('#videoDots button');
const videoSlides = document.querySelectorAll('.video-slide');

function updateVideoCarousel(){
  videoTrack.style.transform = `translateX(-${videoIndex * 100}%)`;
  videoDots.forEach((dot, i) => dot.classList.toggle('active', i === videoIndex));

  // Pause videos when moving to another slide.
  document.querySelectorAll('#videos video').forEach((video, i) => {
    const slide = video.closest('.video-slide');
    if (slide && slide !== videoSlides[videoIndex]) video.pause();
  });
}
function moveVideo(direction){
  videoIndex = (videoIndex + direction + videoSlides.length) % videoSlides.length;
  updateVideoCarousel();
}
function goVideo(index){
  videoIndex = index;
  updateVideoCarousel();
}

// Touch swipe on mobile/tablet.
let videoTouchStartX = 0;
videoTrack.addEventListener('touchstart', e => {
  videoTouchStartX = e.changedTouches[0].screenX;
}, {passive:true});

videoTrack.addEventListener('touchend', e => {
  const distance = e.changedTouches[0].screenX - videoTouchStartX;
  if (Math.abs(distance) > 50) moveVideo(distance < 0 ? 1 : -1);
});

function playVideo(button){
  const player = button.closest('.youtube-player');
  const video = player.querySelector('video');
  video.play();
}
document.querySelectorAll('.youtube-player video').forEach(video => {
  video.addEventListener('play', () => video.closest('.youtube-player').classList.add('playing'));
  video.addEventListener('pause', () => video.closest('.youtube-player').classList.remove('playing'));
  video.addEventListener('ended', () => video.closest('.youtube-player').classList.remove('playing'));
});

let galleryIndex = 0;
const galleryTrack = document.getElementById('galleryTrack');
const galleryDots = document.querySelectorAll('#galleryDots button');
const gallerySlides = document.querySelectorAll('.gallery-slide');

function updateGalleryCarousel(){
  galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
  galleryDots.forEach((dot, i) => dot.classList.toggle('active', i === galleryIndex));
}
function moveGallery(direction){
  galleryIndex = (galleryIndex + direction + gallerySlides.length) % gallerySlides.length;
  updateGalleryCarousel();
}
function goGallery(index){
  galleryIndex = index;
  updateGalleryCarousel();
}

let galleryTouchStartX = 0;
galleryTrack.addEventListener('touchstart', e => {
  galleryTouchStartX = e.changedTouches[0].screenX;
}, {passive:true});
galleryTrack.addEventListener('touchend', e => {
  const distance = e.changedTouches[0].screenX - galleryTouchStartX;
  if(Math.abs(distance) > 50) moveGallery(distance < 0 ? 1 : -1);
});

document.addEventListener("DOMContentLoaded", function () {
  const bgVideo = document.querySelector(".hero-video-bg video");
  if (!bgVideo) return;
  bgVideo.muted = true;
  bgVideo.setAttribute("muted", "");
  bgVideo.setAttribute("playsinline", "");
  bgVideo.setAttribute("autoplay", "");
  bgVideo.play().catch(() => {
    // Some browsers block autoplay until a user interaction.
    const start = () => {
      bgVideo.play().catch(() => {});
      document.removeEventListener("click", start);
      document.removeEventListener("touchstart", start);
    };
    document.addEventListener("click", start, {once:true});
    document.addEventListener("touchstart", start, {once:true});
  });
});
