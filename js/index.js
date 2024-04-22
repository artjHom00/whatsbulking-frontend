document.addEventListener('DOMContentLoaded', () => {
  // Navigation Responsive
  const burger = document.getElementById('burger')
  const navigation = document.getElementById('navigation')

  burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    navigation.classList.toggle('active')
  })

  document.addEventListener( 'click', (e) => {
    const withinBoundariesNavigation = e.composedPath().includes(navigation);
    const withinBoundariesBurger = e.composedPath().includes(burger)

    if (!withinBoundariesNavigation && !withinBoundariesBurger) {
      burger.classList.remove('active')
      navigation.classList.remove('active')  
    }
  })

  ScrollReveal().reveal('*[data-scroll-reveal]');
})
