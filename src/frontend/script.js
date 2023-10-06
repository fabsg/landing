
  window.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var main = document.querySelector('main');
    var footer = document.querySelector('footer');

    var headerHeight = header.offsetHeight;
    var footerHeight = footer.offsetHeight;
    main.style.marginTop = headerHeight + 'px';
    main.style.marginBottom = footerHeight + 'px';

  });

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