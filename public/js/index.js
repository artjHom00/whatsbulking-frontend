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

  var controller = new ScrollMagic.Controller();
  var targetEl = document.querySelector('#target');
  var videoInner = document.querySelector('.video__inner')

  var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 600, triggerHook: 1})

  // .setPin("#target")
  // .addIndicators() // add indicators (requires plugin)
  .addTo(controller)
  .on("update", function (e) {
    // console.log('🚀 ~ e.target.controller().info("scrollDirection"):', e.target.controller().info("scrollDirection"))
  })
  .on("enter leave", function (e) {
    console.log(e.type == "enter" ? "inside" : "outside");
    if(e.type == "enter") {
      targetEl.style.maxWidth = "initial"
      console.log("🚀 ~ targetEl.style.maxWidth:", targetEl.style.maxWidth)
    }
  })
  .on("start end", function (e) {
    console.log(e.type == "start" ? "top" : "bottom");
  })
  .on("progress", function (e) {
    let progressToFour = 4-(e.progress*4).toFixed(3)
    let progressToEighty = 80 - (e.progress*80).toFixed(1)
    
    targetEl.style.padding = `0 ${progressToFour}%`
    videoInner.style.borderRadius = `${progressToEighty}px`

  });

  MicroModal.init();

})

