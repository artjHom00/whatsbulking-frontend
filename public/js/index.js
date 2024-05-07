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
    if(e.type == "enter") {
      targetEl.style.maxWidth = "initial"
      console.log("🚀 ~ targetEl.style.maxWidth:", targetEl.style.maxWidth)
    }
  })
  .on("start end", function (e) {
  })
  .on("progress", function (e) {
    let progressToFour = 4-(e.progress*4).toFixed(3)
    let progressToEighty = 80 - (e.progress*80).toFixed(1)
    
    targetEl.style.padding = `0 ${progressToFour}%`
    videoInner.style.borderRadius = `${progressToEighty}px`

  });

  MicroModal.init();

  const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

  const executeCodes = () => {
    //if cookie contains codinglab it will be returned and below of this code will not run
    if (document.cookie.includes("true")) return;
    cookieBox.classList.add("show");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        cookieBox.classList.remove("show");

        //if button has acceptBtn id
        if (button.id == "acceptBtn") {
          //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
          document.cookie = "cookieBy= true; max-age=" + 60 * 60 * 24 * 30;
        }
      });
    });
  };

  //executeCodes function will be called on webpage load
  window.addEventListener("load", () => {
    setTimeout(executeCodes, 6500)
  });

  $('#modal-submit').on('click', (e) => {
    e.preventDefault()

    $.post('/send', {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      comment: $('#comment').val(),
  }).then((res) => {
      console.log(res)
      $('#result-message').html('<div class="resp-received">We received your request! <br> Await response in 5 minutes via WhatsApp / Email</div>')
      setTimeout(() => {
        $('#result-message').html(' ')
      }, 10000)
  }).catch((err) => {
      console.log(err.responseJSON.error)
      $('#result-message').html('<div class="resp-failed">Error occured while sending a request</div>')
      setTimeout(() => {
        $('#result-message').html(' ')
      }, 10000)
  })
  })

})

