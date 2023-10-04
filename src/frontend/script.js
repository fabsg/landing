document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    console.log('Dati del form:');
    console.log('Name:', name);
    console.log('Email:', email);
  
    // Puoi aggiungere qui la logica per inviare i dati del form al server o fare altre operazioni
  });