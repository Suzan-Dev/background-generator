const inputColor1 = document.getElementById('color1');
const inputColor2 = document.getElementById('color2');
const bodyEl = document.querySelector('body');
const selectEl = document.getElementById('select-gradient');
const gradientInfoEl = document.getElementById('gradientInfo');

let gradientType = 'linear-gradient';
let shapeOrDirection = 'to right';

const changeProperties = (type, shapeorDirection) => {
  gradientType = type;
  shapeOrDirection = shapeorDirection;
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

const addToLS = () => {
  localStorage.setItem(
    'gradientLS',
    JSON.stringify({
      gradientType,
      shapeOrDirection,
      inputColor1: inputColor1.value,
      inputColor2: inputColor2.value,
    })
  );
};

const getFromLS = () => {
  const gradientObj = JSON.parse(localStorage.getItem('gradientLS'));
  if (!!gradientObj) {
    const {
      gradientType,
      shapeOrDirection,
      inputColor1: color1,
      inputColor2: color2,
    } = gradientObj;
    const gradient = `${gradientType}(${shapeOrDirection},${color1}, ${color2})`;
    // bg & copy to clipboard
    bodyEl.style.background = gradient;
    gradientInfoEl.value = gradient;
    // gradientType & shapeOrDirection
    changeProperties(gradientType, shapeOrDirection);
    // color1 and color2
    inputColor1.value = color1;
    inputColor2.value = color2;
    // rehydrating select
    selectEl.value = gradientType === 'linear-gradient' ? 1 : 2;
  }
};

const setBackgroundGradient = () => {
  const gradient = `${gradientType}(${shapeOrDirection},${inputColor1.value}, ${inputColor2.value})`;
  bodyEl.style.background = gradient;
  gradientInfoEl.value = gradient;
  addToLS();
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

// copy to clipboard
gradientInfoEl.addEventListener('click', () => {
  gradientInfoEl.select();
  document.execCommand('copy');
  copiedAlert();
});

getFromLS();
