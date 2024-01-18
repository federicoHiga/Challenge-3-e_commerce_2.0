import { productService } from "../service/productos-services.js";

const form = document.querySelector("[data-form]")

/**
 * 1)listener del formulario para crear producto
 * 2)captura los .values del form/CRUD q ingresa el usuario 
 * 3)hace la llamada del productPost() con dichos valores y los guarda en el db.json
 */

form.addEventListener("submit", (event)=>{
    
    event.preventDefault();

    const name = document.getElementById("nombre").value
    const imgURL = document.getElementById("imgURL").value
    const price = document.getElementById("price").value
    const categoria = document.getElementById("categoria").value

    productService.productPost(name, imgURL, price, categoria)
    .then (() =>{
        window.location.href= "/Challenge-3-e_commerce_2.0/index.html"
        alert("Producto agregado con exito");
    }).catch (error=>{
        console.log(error);
    })
})


