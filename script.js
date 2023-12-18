document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('my-form');
    const list = document.getElementById('list');
    const totalValueElement = document.getElementById('totalValue');

    async function fetchData() {
        try {
            const response = await axios.get('https://crudcrud.com/api/11d25020abc048ad926a8977a8a1125d/unicorns');
            const productData = response.data;
            displayData(productData);
        } catch (err) {
            console.log(err);
        }
    }

    function displayData(productData) {
        let totalValue = 0;
        list.innerHTML = '';

        productData.forEach((element, index) => {
            let listItem = document.createElement('li');
            listItem.className = 'list-ele';
            listItem.textContent = element.price + '-' + element.name;

            totalValue += parseFloat(element.price);

            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.className = 'delete-btn';
            delBtn.type = 'button';
            delBtn.addEventListener('click', () => {
                deleteProduct(element._id);
            });

            listItem.appendChild(delBtn);
            list.appendChild(listItem);
        });

        totalValueElement.textContent = totalValue.toFixed(2);
    }

    async function deleteProduct(userId) {
        try {
            await axios.delete(`https://crudcrud.com/api/11d25020abc048ad926a8977a8a1125d/unicorns/${userId}`);
            fetchData(); 
        } catch (err) {
            console.log(err);
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const price = document.getElementById('price').value;
        const name = document.getElementById('product').value;

        if (!price && !name) {
            alert("Price and name should not be empty");
            return;
        } else if (!price) {
            alert("Price should not be empty");
            return;
        } else if (!name) {
            alert("Name should not be empty");
            return;
        }

        const formData = {
            price: price,
            name: name
        };

        try {
            await axios.post("https://crudcrud.com/api/11d25020abc048ad926a8977a8a1125d/unicorns", formData);
            fetchData(); 
        } catch (err) {
            console.log(err);
        }

        document.getElementById('price').value = '';
        document.getElementById('product').value = '';
    });

    fetchData(); 
});