$(document).ready(() => {
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
        clearTimeout(timeout); // cancel the previous timer.
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
          const expiryTime = Date.now() + (15 * 60 * 1000);
          // Construct the object to store
          const dataToStore = {
            countdown: expiryTime,
            data: {
              name: $('#name').val(),
              email: $('#email').val(),
              phone: iti.getNumber(intlTelInput.utils.numberFormat.E164),
              metaInfo: metaInfo,
              comment: $('#comment').val(),
            }
          };
          // Convert the object to a string to store in local storage
          const dataString = JSON.stringify(dataToStore);

          // Store the string in local storage
          localStorage.setItem('data', dataString);

          console.log(res)
          $('#result-message').html('<div class="resp-received">We received your request! <br> Await response in 5 minutes via WhatsApp / Email</div>')
          if(timeout) {
            clearTimeout(timeout); // cancel the previous timer.
            timeout = null;
          }

          setTimeout(function() {
            window.location.href = '/confirm'
          }, 3000)

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

  
    let data = localStorage.getItem('data')

    if(data) {
        let parsedData = JSON.parse(data)
        
        setInterval(() => {

            let leftTime = countdown(new Date(parsedData.countdown))
            
            $('#hours').html(leftTime.hours)
            $('#minutes').html(leftTime.minutes)
            $('#seconds').html(leftTime.seconds)

            if(leftTime.value >= 0) {
              window.location.href = "/success"
            }

        }, 500)

        $('#no-website').on('change', function() {
          let website = $('#website')
          if(this.checked) { 
            website.val('')
            website.attr('disabled', 'true')
          } else {
            website.removeAttr('disabled')
          }
        })

        $('#submit').on('click', function(e) {
          e.preventDefault()
          function isValidWebsite(url) {
            const regex = new RegExp('^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$');
            return regex.test(url);
          }      

          let hasWebsite = !($('#no-website').prop('checked'))
          let companyName = $('#company-name').val()
          let amount = $('#amount').val()
          
          if(hasWebsite) {
            var websiteVal = $('#website').val()
          }
          
          console.log("🚀 ~ $ ~ continuedData:", parsedData)
          $.post('/send', {
            email: parsedData.data.email,
            isContinued: true,
            companyName,
            hasWebsite,
            websiteVal,
            amount
          }).then((res) => {
              
              localStorage.removeItem('data')
              window.location.href = '/success'

          }).catch((err) => {

              console.log(err.responseJSON.error)

              $('#result-message').html('<div class="resp-failed">Error occured while sending a request</div>')

              if(timeout) {

                clearTimeout(timeout)
                timeout = null
              
              }

              timeout = setTimeout(() => {
                $('#result-message').html(' ')
              }, 10000)

          })


        })

    } else {
        console.log('No data to load')
        window.location.href = '/'
    }

})