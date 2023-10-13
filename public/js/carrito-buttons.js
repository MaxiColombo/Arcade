$(document).ready(function () {
    // Captura el clic en el botón "Agregar 1 (Cantidad)"
    $(".addOneProduct").on("click", function () {
        const productId = $(this).data("product-id");
        let data; // Declarar data fuera de las funciones para que esté disponible en todo el ámbito de esta función
    
        // Realiza una solicitud AJAX para agregar 1 al producto con productId
        $.post("/products/compras/agregar/" + productId)
            .done(function (responseData) {
                data = responseData; // Asigna los datos a data
                if (data.success) {
                    // La solicitud fue exitosa, actualiza la vista del carrito
                    actualizarVistaDelCarrito(data.carrito);
                    console.log(data.carrito + "a");
                } else {
                    // Manejo de errores, muestra un mensaje de error o realiza otra acción
                    console.error("Error al agregar el producto.");
                    console.log(data.carrito + "b");
                }
            })
            .fail(function (xhr, status, error) {
                // Manejo de errores de red, muestra un mensaje de error o realiza otra acción
                console.error("Error de red: " + error);
                console.log(data.carrito + "c"); // Ahora puedes acceder a data aquí
            });
    });

    // Captura el clic en el botón "Eliminar 1"
    $(".deleteOneProduct").on("click", function () {
        const productId = $(this).data("product-id");
    
        // Realiza una solicitud AJAX de tipo DELETE para eliminar 1 del producto con productId
        $.ajax({
            type: "DELETE",
            url: "/products/compras/eliminar/" + productId, // Actualiza la URL para incluir el prefijo "/products"
            success: function (data) {
                if (data.success) {
                    // La solicitud fue exitosa, actualiza la vista del carrito
                    actualizarVistaDelCarrito(data.carrito);
                } else {
                    // Manejo de errores, muestra un mensaje de error o realiza otra acción
                    console.error("Error al eliminar el producto.");
                }
            },
            error: function (xhr, status, error) {
                // Manejo de errores de red, muestra un mensaje de error o realiza otra acción
                console.error("Error de red: " + error);
            }
        });
    });
});


/* NO ME SIRVE LA VERDAD NO ACTUALIZA NADA  */