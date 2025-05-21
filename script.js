const extensao = 'png';
const gallery = document.querySelector('.gallery');
gallery.innerHTML = '<img src="images/image.png" alt="">';

let i = 1;
let imagens = [];
function tryLoadNext() {
  const img = new Image();
  img.src = `images/image${i}.${extensao}`;
  img.onload = function() {
    gallery.appendChild(img);
    imagens.push(img.src);
    i++;
    tryLoadNext();
  };
  img.onerror = function() {};
}
tryLoadNext();

const overlay = document.getElementById('imgOverlay');
const overlayImg = document.getElementById('overlayImg');
const darkmodeBtn = document.getElementById('darkmode-toggle');
const prevBtn = document.getElementById('prevImg');
const nextBtn = document.getElementById('nextImg');

let currentImgIndex = 0;

gallery.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    overlay.classList.add('active');
    overlayImg.src = e.target.src;
    currentImgIndex = imagens.indexOf(e.target.src);
  }
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
    overlayImg.src = '';
  }
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (imagens.length === 0) return;
  currentImgIndex = (currentImgIndex - 1 + imagens.length) % imagens.length;
  overlayImg.src = imagens[currentImgIndex];
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (imagens.length === 0) return;
  currentImgIndex = (currentImgIndex + 1) % imagens.length;
  overlayImg.src = imagens[currentImgIndex];
});

darkmodeBtn.addEventListener('click', () => {
  document.body.classList.toggle('darkmode');
});

document.addEventListener('keydown', function(e) {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') {
    prevBtn.click();
  } else if (e.key === 'ArrowRight') {
    nextBtn.click();
  } else if (e.key === 'Escape') {
    overlay.classList.remove('active');
    overlayImg.src = '';
  }
});