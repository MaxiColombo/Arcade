// Obtener todos los elementos con la clase .productName
const productLinks = document.querySelectorAll('.productName');

// Agregar un controlador de eventos de clic a cada enlace de producto
productLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Prevenir el comportamiento predeterminado del enlace (navegar a una nueva página)
        e.preventDefault();
        
        // Mostrar los detalles del evento en la consola
        console.log('Se hizo clic en un producto:', e);

        // Puedes acceder a propiedades específicas del evento, como e.target, e.currentTarget, etc.
        // Por ejemplo, si deseas obtener la URL a la que se dirige el enlace:
        console.log('URL del enlace:', e.currentTarget.href);
    });
});