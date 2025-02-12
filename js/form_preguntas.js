document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación del nombre
    if (name === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Validación del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Validación del asunto
    if (subject === '') {
        alert('Por favor, ingresa un asunto.');
        return;
    }

    // Validación del mensaje
    if (message === '') {
        alert('Por favor, ingresa un mensaje.');
        return;
    }

    // Si todas las validaciones pasan, enviar el formulario
    alert('Formulario enviado correctamente.');

this.submit(); 
});