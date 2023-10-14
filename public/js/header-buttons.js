// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Busca el elemento con la clase "homePage"
    const homeLink = document.querySelector(".homePage");
  
    // Detecta si estás en la vista principal (ajusta esto a tu lógica)
    const isHomePage = window.location.pathname === '/'; // Comprueba la ruta actual
  
    // Oculta el enlace "Homepage" en la vista principal
    if (isHomePage) {
      homeLink.style.display = 'none';
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
  
    const cartLink = document.querySelector(".cartPage");
  
    // Detecta si estás en la vista principal (ajusta esto a tu lógica)
    const isCartPage = window.location.pathname === '/products/carrito'; // Comprueba la ruta actual
  
    // Oculta el enlace "Homepage" en la vista principal
    if (isCartPage) {
      cartLink.style.display = 'none';
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
  
    const profileLink = document.querySelector(".profilePage");
  
    // Detecta si estás en la vista principal (ajusta esto a tu lógica)
    const isProfilePage = window.location.pathname === '/user/profile'; // Comprueba la ruta actual
  
    // Oculta el enlace "Homepage" en la vista principal
    if (isProfilePage) {
      profileLink.style.display = 'none';
    }
  });