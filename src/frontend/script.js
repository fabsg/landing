
  window.addEventListener('DOMContentLoaded', function() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    hideElementIfVisible();
    validateForm()
    const header = document.querySelector('header');
    const rowBanner = document.getElementById('sticky-timer');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    main.style.marginTop = headerHeight + 'px';
    main.style.marginBottom = footerHeight + 'px';
    rowBanner.style.top = headerHeight + 'px';
    window.scrollTo(0, 0);

  });

  window.addEventListener("scroll", hideElementIfVisible);

  function onClickSendFormData() {
    console.log('onClickSendFormData')
      const buttonSave = document.getElementById('btn-save');
      buttonSave.setAttribute('disabled', 'disabled');
      const nomeInput = document.getElementById('nome');
      const cognomeInput = document.getElementById('cognome');
      const emailInput = document.getElementById('email');
      const telefonoInput = document.getElementById('telefono');
      const honeypotInput = document.getElementById('honeypot');
      const privacyCheckInput = document.getElementById('privacy-checkbox');
  
      const nomeVal = nomeInput.value;
      const cognomeVal = cognomeInput.value;
      const emailVal = emailInput.value;
      const telefonoVal = telefonoInput.value;
      const honeypotVal = honeypotInput.value;
      const privacyCheckVal = privacyCheckInput.value;

      //regex
      const textRegex = /^[a-zA-Z]{2,}$/;
      const phoneRegex = /^(?:(?:\+|00)39)?\s?(?:3[0-9]{2}|0[0-9]{2}|[89][0-9]{2})\s?[0-9]{6,7}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

      if(nomeVal && textRegex.test(nomeVal) && 
      cognomeVal && textRegex.test(cognomeVal) && 
      emailVal && emailRegex.test(emailVal) &&
      telefonoVal && phoneRegex.test(telefonoVal) &&
      !honeypotVal && privacyCheckVal 
      ) {
        fetch('/landing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nomeVal,
            surname: cognomeVal,
            email: emailVal,
            phone: telefonoVal,
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log('success page')
            // Handle the response data
            console.log("success", data);
          })
          .catch(error => {
            // Handle any errors
            console.error("error", error);
          });
      } else {
        console.log('form non valido error page')
      }

  }

  function hideElementIfVisible() {
    var form = document.getElementById("contact-form");
    var buttonContact = document.getElementById("btn-contact");
    var buttonSave = document.getElementById("btn-save");

    var sectionRect = form.getBoundingClientRect();
    var windowHeight = window.innerHeight;
  
    if (sectionRect.top < windowHeight && sectionRect.bottom >= 0) {
      buttonContact.style.display = "none";
      buttonSave.style.display = "block";
    } else {
      buttonContact.style.display = "block";
      buttonSave.style.display = "none";
    }
  }


  const form = document.getElementById('contact-form');
  const button = document.getElementById('btn-save');

  const formFields = form.querySelectorAll('input, select, textarea');
  formFields.forEach(field => {
    field.addEventListener('input', validateForm);
  });

  function validateForm() {
    let isValid = Array.from(formFields).every(field => field.checkValidity());
    if (isValid) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'disabled');
    }
  }

  function setBaseRem() {
    var windowWidth = window.innerWidth;
  
    if (windowWidth >= 1200) {
      baseRem = 32;
    } else if (windowWidth >= 992) {
      baseRem = 24;
    } else if (windowWidth >= 768) {
      baseRem = 24;
    } else {
      baseRem = 16;
    }
  
    document.documentElement.style.fontSize = baseRem + 'px';
  }
    
  window.addEventListener('resize', setBaseRem);

  function onClickContactButton() {
    const form = document.getElementById("contact-form");
    const header = document.querySelector('header');
    const rowBanner = document.getElementById('sticky-timer');
    const scrollPosition = form.offsetTop - (header.offsetHeight + rowBanner.offsetHeight);
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  }

  function calculateTimeRemaining() {
    var now = new Date();
    var targetDate = new Date("2023-11-23");

    var timeRemaining = targetDate - now;

    var seconds = Math.floor((timeRemaining / 1000) % 60);
    var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return {
      'total': timeRemaining,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function displayTimer() {
    var timerElement = document.getElementById("timer");
    var time = calculateTimeRemaining();

  timerElement.innerHTML = time.days + " giorni, " +
    time.hours + " ore, " +
    time.minutes + " minuti, " +
    time.seconds + " secondi";

        if (time.total > 0) {
          setTimeout(displayTimer, 1000);
        }
      }