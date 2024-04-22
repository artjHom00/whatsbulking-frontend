document.addEventListener('DOMContentLoaded', function() {
  // Aside Menu
  const aside = document.getElementById('aside')
  const burger = document.getElementById('burger')

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

  // Add template
  const addTemplate = document.getElementById('add-template')
  addTemplate?.addEventListener('click', (event) => {
    event.preventDefault()
    const templates = document.getElementById('templates')
    const template = document.getElementById('template').cloneNode()
    template.tabIndex = templates.childElementCount + 2
    if(templates.childElementCount < 10) {
      templates.appendChild(template)
    }
    if(templates.childElementCount === 10) {
      addTemplate.remove()
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

