class Product{
    constructor (name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del producto</strong>: ${product.name}
                    <strong>Precio del producto</strong>: ${product.price}
                    <strong>Año del producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Borrar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById("product-form").reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente!', 'danger');
        }

    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Mostrarlo en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout (function () {
            document.querySelector('.alert').remove();
        }, 3000);

    }
}

//Eventos del DOM

//Capturar evento submit
document.getElementById('product-form')
    .addEventListener('submit', function(e) {
       const name = document.getElementById('name').value;
       const price = document.getElementById('price').value;
       const year = document.getElementById('year').value;

       //Creación de objeto producto
       const product = new Product(name, price, year);

       //Creación de objeto UI, le paso el producto
       const ui = new UI();

        if (name === '' || price === '' || year === ''){
            return ui.showMessage('Completa los campos, por favor', 'danger');
        }

       ui.addProduct(product);
       ui.resetForm();
       ui.showMessage('Producto agregado correctamente', 'success');

        //Cancelar el comportamiento por defecto del formulario
        //No se refresca
       e.preventDefault();
    });

//Capturar evento de eliminar
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});
