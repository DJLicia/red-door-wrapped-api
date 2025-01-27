/**
 * CS 132
 * Alicia Zhang
 * Attempt at loading in product data from .json file, unable to connect to 
 * server and connect with front-end. 
 */


(function() {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const ordersGrid = document.getElementById("orders-grid");

        // Fetch and display popular orders
        fetch("/products?sort=popularity")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch popular orders");
                }
                return response.json();
            })
            .then((data) => {
                // Display the popular orders
                data.products.forEach((product) => {
                    const orderCard = document.createElement("div");
                    orderCard.classList.add("order-card");

                    const productName = document.createElement("h3");
                    productName.textContent = product.name;

                    const productImage = document.createElement("img");
                    productImage.src = product.image;
                    productImage.alt = product.name;

                    const productPrice = document.createElement("p");
                    productPrice.textContent = `Price: $${product.price}`;

                    const productPopularity = document.createElement("p");
                    productPopularity.textContent = `Popularity: ${product.popularity}`;

                    orderCard.appendChild(productName);
                    orderCard.appendChild(productImage);
                    orderCard.appendChild(productPrice);
                    orderCard.appendChild(productPopularity);
                    ordersGrid.appendChild(orderCard);
                });
            })
            .catch((error) => {
                console.error("Error fetching popular orders:", error);
                ordersGrid.innerHTML = "<p>Failed to load popular orders. Please try again later.</p>";
            });
    });
});