const header = document.querySelector('header');
const dcb = document.getElementById('dcb')

function moveShadow(e) {
  const { offsetWidth: width, offsetHeight: height } = header;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x += e.target.offsetLeft;
    y += e.target.offsetTop;
  };

  const xWalk = Math.round((x / width * 100) - 50);
  const yWalk = Math.round((y / height * 100) - 50);

  dcb.style.filter = `drop-shadow( ${xWalk}px ${yWalk}px 0 rgba(65,57,119, .8)) drop-shadow( ${-xWalk}px ${-yWalk}px 0 rgba(65,57,119, .8))`;
}


header.addEventListener('mousemove', moveShadow);

