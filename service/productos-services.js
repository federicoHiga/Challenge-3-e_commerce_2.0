//llamadas del CRUD

//GET

const productList = ()=>{
   return fetch ("https://federicohiga.github.io/Challenge-3-e_commerce_2.0/db.json")
    .then ((response)=> response.json());
}


//POST

const productPost = (name, imgURL, price, categoria)=>{
    return fetch ("https://federicohiga.github.io/Challenge-3-e_commerce_2.0/db.json", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({name, imgURL, price, categoria, id: uuid.v4()},)
    }).then(response =>{
        console.log(response.body)
        if(response.ok){
            return response.body
        }
        throw new Error("No se pudo crear el producto");
    });
}

export const productService = {
    productList,
    productPost,
}