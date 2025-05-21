const extensao = 'png';
const gallery = document.querySelector('.gallery');
gallery.innerHTML = '<img src="images/image.png" alt="">';

let i = 1;
function tryLoadNext() {
  const img = new Image();
  img.src = `images/image${i}.${extensao}`;
  img.onload = function() {
    gallery.appendChild(img);
    i++;
    tryLoadNext();
  };
  img.onerror = function() {
   
  };
}
tryLoadNext();


const overlay = document.getElementById('imgOverlay');
const overlayImg = document.getElementById('overlayImg');
const darkmodeBtn = document.getElementById('darkmode-toggle');

gallery.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    overlay.classList.add('active');
    overlayImg.src = e.target.src;
  }
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  overlayImg.src = '';
});

darkmodeBtn.addEventListener('click', () => {
  document.body.classList.toggle('darkmode');
});