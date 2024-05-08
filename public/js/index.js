document.addEventListener('DOMContentLoaded', () => {
  // Navigation Responsive
  const burger = document.getElementById('burger')
  const navigation = document.getElementById('navigation')
  let timeout = null;
  let metaInfo = null;

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

  const input = document.querySelector("#phone");
  const iti = window.intlTelInput(input, {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@22.0.2/build/js/utils.js",
    autoPlaceholder: "aggressive",
    initialCountry: "auto",
    separateDialCode: true,
    strictMode: true,
    geoIpLookup: function(success, failure) {
    fetch("https://ipapi.co/json")
      .then(function(res) { return res.json(); })
      .then(function(data) { if(data.city) { metaInfo = `${data.country_name} ${data.city}`; } success(data.country_code); })
      .catch(function() { failure(); });

  }
  });

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
    function ValidateEmail(input) {

      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
      if (input.value.match(validRegex)) {
    
        return true;
    
      } else {

        return false;
    
      }
    
    }
    e.preventDefault()

    if(!$('#name').val()) {
      $('#result-message').html('<div class="resp-failed">Name is not filled</div>')
      if(timeout) {
        clearTimeout(timeout); //cancel the previous timer.
        timeout = null;
      }
      timeout = setTimeout(() => {
        $('#result-message').html(' ')
      }, 10000)
      return
    }


    if(!ValidateEmail(email)) {
      $('#result-message').html('<div class="resp-failed">The Email is not correct</div>')
      if(timeout) {
        clearTimeout(timeout); //cancel the previous timer.
        timeout = null;
      }
      timeout = setTimeout(() => {
        $('#result-message').html(' ')
      }, 10000)
      return
    }
    
    if(!$('#phone').val()) {
      $('#result-message').html('<div class="resp-failed">Phone is not filled</div>')
      if(timeout) {
        clearTimeout(timeout); //cancel the previous timer.
        timeout = null;
      }
      timeout = setTimeout(() => {
        $('#result-message').html(' ')
      }, 10000)
      return
    }

      $.post('/send', {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: iti.getNumber(intlTelInput.utils.numberFormat.E164),
        metaInfo,
        comment: $('#comment').val(),
      }).then((res) => {
          console.log(res)
          $('#result-message').html('<div class="resp-received">We received your request! <br> Await response in 5 minutes via WhatsApp / Email</div>')
          if(timeout) {
            clearTimeout(timeout); //cancel the previous timer.
            timeout = null;
          }

          $('#name').val('')
          $('#email').val('')
          $('#phone').val('')
          $('#comment').val('')
          $('#modal-submit').attr('disabled', true)
          timeout = setTimeout(() => {
            $('#result-message').html(' ')

            $('#modal-submit').removeAttr('disabled')
          }, 10000)


      }).catch((err) => {
          console.log(err.responseJSON.error)
          $('#result-message').html('<div class="resp-failed">Error occured while sending a request</div>')
          if(timeout) {
            clearTimeout(timeout); //cancel the previous timer.
        timeout = null;
          }
          timeout = setTimeout(() => {
            $('#result-message').html(' ')
          }, 10000)
      })

  })

})

