document.addEventListener('DOMContentLoaded', function() {
  // Aside Menu
  const aside = document.getElementById('aside')
  const burger = document.getElementById('burger')
  window.lastActiveTemplate = null

  burger.addEventListener('click', (event) => {
    event.preventDefault()
    aside.classList.toggle('active')
  })

  window.addEventListener('click', e => {
    const target = e.target 
    if (!target.closest('#aside') && !target.closest('#burger')) { 
      aside.classList.remove('active') 
    }
  })

  // Accordeon
  const accordeons = document.querySelectorAll('.accordeon')
  accordeons?.forEach(accordeon => {
    const accordeonToggle = accordeon.querySelector('.accordeon__title')
    
    accordeonToggle.addEventListener('click', () => {
      accordeon.classList.toggle('active')
    })
  })

  const dynamicDataButtons = document.querySelectorAll('.add-dynamic-data')
  dynamicDataButtons?.forEach(dynamicData => {
    dynamicData.addEventListener('click', (event) => {
      event.preventDefault()
      const static = {
        "User Name": "%user_name%",
        "Phone Number": "%phone_number%",
        "Today Date": "%today%"
      }
      
      if(lastActiveTemplate) {
        const dynamicDataValue = static[dynamicData.innerHTML]
        console.log("🚀 ~ dynamicData.addEventListener ~ dynamicData.innerHTML:", dynamicData.innerHTML)
        console.log("🚀 ~ dynamicData.addEventListener ~ dynamicData.innerHTML:", static[dynamicData.innerHTML])

        lastActiveTemplate.value += dynamicDataValue
      }

    })
  })

  // Add template
  const addTemplate = document.getElementById('add-template')
  addTemplate?.addEventListener('click', (event) => {
    event.preventDefault()
    const templates = document.getElementById('templates')
    const template = document.getElementById('template').cloneNode(true)

    
    template.tabIndex = templates.lastChild.tabIndex + 1
    if(templates.childElementCount < 10) {
      templates.appendChild(template)
    }
    if(templates.childElementCount === 10) {
      addTemplate.style.display = 'none';
    }
  })

  // Copy referal link
  const copyBtn = document.getElementById('copy-btn')
  copyBtn?.addEventListener('click', (event) => {
    event.preventDefault()
    const referalLink = document.getElementById('referal-link')
    referalLink.select()
    document.execCommand('copy')
    copyBtn.classList.add('copied')
    setTimeout(() => {
      copyBtn.classList.remove('copied')
    }, 1000)
  })
})

