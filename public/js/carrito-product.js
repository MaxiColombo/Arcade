document.addEventListener('DOMContentLoaded', function() {
    // Encuentra la imagen por su atributo 'alt' y asigna un evento 'click'.
    const arcadeImage = document.querySelector('img[alt="Arcade"]');
  
    arcadeImage.addEventListener('click', function(e) {
      console.log('Se hizo clic en un producto:', e);
    });
  });