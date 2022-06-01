(function() {
  const $burger = document.querySelector('.navbar-burger');
  if (!$burger) return;
  $burger.addEventListener('click', (e) => {
    let $dropMenu = document.querySelector('.navbar-menu');
    $burger.classList.toggle('is-active');
    $dropMenu.classList.toggle('is-active');
  });
})();