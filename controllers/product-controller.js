// templates del html

import { productService } from "../service/productos-services.js";

/**
 * newProduct recibe los parametros del fetch productList() q le devuelve el db.json
 * @param {*} name 
 * @param {*} imgURL 
 * @param {*} price 
 * @param {*} id 
 * @returns template
 */

const newProduct = (name, imgURL, price, categoria, id)=>{

    const box = document.createElement("div")
    const content =
    `
    <div class="bluRay__box">
                    <ul>
                        <li><img class="bluRay__img" src="${imgURL}" alt=""></li>
                        <li class="bluRay__names">${name}</li>
                        <h3 class="bluRay__price">$${price}</h3>
                        <a class="ver_producto" href="../screens/ver-producto.html">Ver producto</a>
                    </ul>  
                </div>
    `
    box.innerHTML=content
    box.dataset.id=id // hace referencia al id del data atribute, no al del db.json

    return box
};

/**
 * 1)llamada del fetch productList() con el objeto del db.json
 * 2)el .then guarda la promise en "data" y luego se itera con un forEach para cada parametro ejecutando el newProduct() en el appendChild del data atribute linkeado 
 */

//Homepage
const movie = document.querySelector("[data-movie]");
const serie = document.querySelector("[data-series]");
const producto = document.querySelector("[data-products]");

//Todos los pdocutos
const verMas = document.querySelector("[data-allProductos]");

//Ver mas
const verProducto = document.querySelector("[data-verProducto]");

const mostrarProducto = async ()=>{

    try{
        const allProducts = await productService.productList();
        console.log('',allProducts)
        const allProductsToArray = Object.entries(allProducts);
        console.log(allProductsToArray)

        if(verMas){// aca postea si o si
            // verMas.innerHTML = ''; / reinicia el conteiner mostrando solo los prodcutos agregados de manera dinamica por el CRUD, los estaticos del index.html los peina
           allProductsToArray.forEach(elemento =>{
                verMas.appendChild(newProduct(elemento.name, elemento.imgURL, elemento.price, elemento.id));
            });
        }
        if(movie){//aca postea solos si pasa el filtro
            // movie.innerHTML = "";
            allProductsToArray.filter(producto => producto.categoria === "Movie").forEach(elemento => {
                movie.appendChild(newProduct(elemento.name, elemento.imgURL, elemento.price, elemento.id))
            });
        }
        if(serie){//aca postea solos si pasa el filtro
            // serie.innerHTML = "";
            allProductsToArray.filter(producto => producto.categoria === "Serie").forEach(elemento => {
                serie.appendChild(newProduct(elemento.name, elemento.imgURL, elemento.price, elemento.id))
            });
        }
        if(producto){//aca postea solos si pasa el filtro
            // producto.innerHTML = "";
            allProductsToArray.filter(producto => producto.categoria === "Producto").forEach(elemento => {
                producto.appendChild(newProduct(elemento.name, elemento.imgURL, elemento.price, elemento.id))
            });
        }
        if (verProducto) {//aca tambn postea si o si
            const url = new URL(window.location);//aca crea una nueva url
            const idProducto = url.searchParams.get("id");//y aca la asocia con el id para el ?=id
            verProducto.innerHTML = '';
            allProductsToArray.filter(producto => producto.id === idProducto).forEach(elemento => {
                verProducto.appendChild(productView.verProducto(elemento.name, elemento.imgURL, elemento.price, elemento.id, elemento.categoria,));
            });
        }
    }catch (err) {
        console.error("Ocurrió un error mensaje del console", err);
    }
};

mostrarProducto();














// productService.productList()
//     .then(data => {
//     data.forEach(({ name, imgURL, price }) => {
//         const nuevaLinea = newProduct(name, imgURL, price);
//         movie.appendChild(nuevaLinea);
//     });
// })
//     .catch((error) => alert("Ocurrio un problema"));

    