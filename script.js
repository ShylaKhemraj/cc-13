//U20026580

document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://course-api.com/react-store-products';
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const productElement = document.getElementById('product');
    const productName = document.getElementById('product-name');
    const productImage = document.getElementById('product-image');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let products = [];
    let currentIndex = 0;

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            products = await response.json();
            if (products.length === 0) {
                throw new Error('No products found');
            }
            showProduct(currentIndex);
        } catch (error) {
            showError();
        } finally {
            loadingElement.classList.add('hidden');
        }
    };
    const showProduct = (index) => {
        const product = products[index];
        productName.textContent = product.name;
        productImage.src = product.image;
        productImage.alt = product.name;
        productPrice.textContent = 'Price: $${product.price}';
        productDescription.textContent = product.description;
        productElement.classList.remove('hidden');
    };
    const showError = () => {
        errorElement.classList.remove('hidden');
    };
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex -1 + products.length) % products.length;
        showProduct(currentIndex);
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        showProduct(currentIndex);
    });
    fetchData();
});