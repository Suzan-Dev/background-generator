const inputColor1 = document.getElementById('color1');
const inputColor2 = document.getElementById('color2');
const bodyEl = document.querySelector('body');
const selectEl = document.getElementById('select-gradient');
const gradientInfoEl = document.getElementById('gradientInfo');

let gradientType = 'linear-gradient';
let shapeOrDirection = 'to right';

const changeProperties = (type, shapOrDire) => {
  gradientType = type;
  shapeOrDirection = shapOrDire;
};

const copiedAlert = () => {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success copied-alert';
  alert.appendChild(document.createTextNode('Copied to clipboard!'));

  bodyEl.appendChild(alert);

  setTimeout(() => {
    bodyEl.removeChild(alert);
  }, 2000);
};

const setBackgroundGradient = () => {
  bodyEl.style.background = `${gradientType}(${shapeOrDirection},${inputColor1.value}, ${inputColor2.value})`;
  gradientInfoEl.value = `${gradientType}(${shapeOrDirection},${inputColor1.value}, ${inputColor2.value})`;
};

inputColor1.addEventListener('input', setBackgroundGradient);

inputColor2.addEventListener('input', setBackgroundGradient);

selectEl.addEventListener('change', (e) => {
  if (e.target.value === '1') {
    changeProperties('linear-gradient', 'to right');
    setBackgroundGradient();
  } else if (e.target.value === '2') {
    changeProperties('radial-gradient', 'circle');
    setBackgroundGradient();
  }
});

gradientInfoEl.addEventListener('click', () => {
  gradientInfoEl.select();
  document.execCommand('copy');
  copiedAlert();
});
