// Function to add products dynamically
function addProduct(imageSrc, brand, name, price) {
      // Create product element
      var product = document.createElement("div");
      product.classList.add("pro");
      product.onclick = function () {
            window.location.href = 'sproduct.html';
      };

      // Add image
      var image = document.createElement("img");
      image.src = imageSrc;
      image.alt = "";
      product.appendChild(image);

      // Add description
      var description = document.createElement("div");
      description.classList.add("description");

      var brandSpan = document.createElement("span");
      brandSpan.innerText = brand;
      description.appendChild(brandSpan);

      var nameH5 = document.createElement("h5");
      nameH5.innerText = name;
      description.appendChild(nameH5);

      var starDiv = document.createElement("div");
      starDiv.classList.add("star");
      for (var i = 0; i < 5; i++) {
            var starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            starDiv.appendChild(starIcon);
      }
      description.appendChild(starDiv);

      var moneyDiv = document.createElement("div");
      moneyDiv.classList.add("money", "flex");

      var priceH4 = document.createElement("h4");
      priceH4.innerText = price;
      moneyDiv.appendChild(priceH4);

      var cartLink = document.createElement("a");
      cartLink.href = "#";
      var cartIcon = document.createElement("i");
      cartIcon.classList.add("fa-solid", "fa-cart-shopping");
      cartLink.appendChild(cartIcon);
      moneyDiv.appendChild(cartLink);

      description.appendChild(moneyDiv);
      product.appendChild(description);

      // Add product to container
      var container = document.getElementById("product-container");
      container.appendChild(product);
}

