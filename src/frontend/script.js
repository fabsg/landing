
  window.addEventListener('DOMContentLoaded', function() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    hideElementIfVisible();
    validateForm()
    displayTimer();
    accordionManaging()
    setBaseRem();
    window.scrollTo(0, 0);
  });

  window.addEventListener("scroll", hideElementIfVisible);

  document.addEventListener("visibilitychange", ()=> {
    if(document.visibilityState === 'visible') {
      hideElementIfVisible();
      validateForm()
      displayTimer();
      accordionManaging()
      setBaseRem();
    }
  })

  function hideElementIfVisible() {
    const form = document.getElementById("contact-form");
    const contactBtnWrapper = document.getElementById('contact-button-wrapper');

    var sectionRect = form.getBoundingClientRect();
    var windowHeight = window.innerHeight;
  
    if (sectionRect.top < windowHeight && sectionRect.bottom >= 0) {
      contactBtnWrapper.style.display = "none";
    } else {
      contactBtnWrapper.style.display = "flex";
    }
  }

  function hideForm() {
    const formWrapper = document.getElementById('form-wrapper');
    const contactBtnWrapper = document.getElementById('contact-button-wrapper');
    contactBtnWrapper.style.display = 'none';
    formWrapper.style.display = 'none';
  }

  function showForm() {
    const formWrapper = document.getElementById('form-wrapper');
    const contactBtnWrapper = document.getElementById('contact-button-wrapper');
    contactBtnWrapper.style.display = 'flex';
    formWrapper.style.display = 'flex';
  }

  function onClickRetry() {
    showForm();
    const errorPage = document.getElementById('error');
    errorPage.style.display = 'none';
  }

  function onClickSendFormData() {
      const buttonSave = document.getElementById('btn-save');
      buttonSave.setAttribute('disabled', 'disabled');
      const formLoader = document.getElementById('form-loader');
      formLoader.style.visibility = 'visible';
      const nomeInput = document.getElementById('nome');
      const cognomeInput = document.getElementById('cognome');
      const emailInput = document.getElementById('email');
      const telefonoInput = document.getElementById('telefono');
      const honeypotInput = document.getElementById('honeypot');

      const nomeVal = nomeInput.value;
      const cognomeVal = cognomeInput.value;
      const emailVal = emailInput.value;
      const telefonoVal = telefonoInput.value;
      const honeypotVal = honeypotInput.value;

      //regex
      const textRegex = /^[a-zA-Z]{2,}$/;
      const phoneRegex = /^\+?[0-9]{5,}$/;
      const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/i;

      if(nomeVal && textRegex.test(nomeVal) && 
      cognomeVal && textRegex.test(cognomeVal) && 
      emailVal && emailRegex.test(emailVal) &&
      telefonoVal && phoneRegex.test(telefonoVal) &&
      !honeypotVal
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
          .then(() => {
            formLoader.style.visibility = 'hidden';
            hideForm();
            const successPage = document.getElementById('success');
            successPage.style.display = 'flex';
          })
          .catch(() => {
            hideForm();
            const errorPage = document.getElementById('error');
            errorPage.style.display = 'flex';
            formLoader.style.visibility = 'hidden';
          });
      } else {
        console.log('form non valido error page')
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

  function pxToRem(px) {
    return (px/getCurrentBaseRem()) + 'rem';
  }

  function getCurrentBaseRem() {
    const windowWidth = window.innerWidth;
    let baseRem = 16;
  
    if (windowWidth >= 1200) {
      baseRem = 32;
    } else if (windowWidth >= 992) {
      baseRem = 24;
    } else if (windowWidth >= 768) {
      baseRem = 24;
    } else {
      baseRem = 16;
    }
    return baseRem
  }

  function setBaseRem() {
    document.documentElement.style.fontSize = getCurrentBaseRem() + 'px';
  }
    
  window.addEventListener('resize', setBaseRem);

  function onClickContactButton() {
    const form = document.getElementById("form-wrapper");
    const rowBanner = document.getElementById('sticky-timer');
    const contactBtnWrapper = document.getElementById('contact-button-wrapper');
    const scrollPosition = form.offsetTop - (rowBanner.offsetHeight +contactBtnWrapper.offsetHeight);
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  }

function calculateTimeRemaining() {
  var now = new Date();
  var nextThursday = (2+7- now.getDay())%7;
  var targetDate = new Date(now.getTime() + nextThursday *24*60*60*1000);
  targetDate.setHours(23,59,59,999)
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

function accordionManaging() {  
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = pxToRem(panel.scrollHeight);
      }
    });
  }
}