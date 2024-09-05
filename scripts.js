document.addEventListener("DOMContentLoaded", function () {
  // Handle login form submission
  const loginForm = document.querySelector("#login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      const username = document.querySelector('input[name="username"]').value;
      const password = document.querySelector('input[name="password"]').value;

      if (username === "" || password === "") {
        event.preventDefault(); // Prevent form submission
        alert("Please enter both username and password.");
      }
    });
  }

  // Handle new product registration form
  const productForm = document.querySelector("#product-form");

  if (productForm) {
    productForm.addEventListener("submit", function (event) {
      const productName = document.querySelector(
        'input[name="product-name"]'
      ).value;
      const productPrice = document.querySelector(
        'input[name="product-price"]'
      ).value;
      const productQuantity = document.querySelector(
        'input[name="product-quantity"]'
      ).value;

      if (productName === "" || productPrice === "" || productQuantity === "") {
        event.preventDefault(); // Prevent form submission
        alert("Please fill in all product details.");
      } else if (isNaN(productPrice) || isNaN(productQuantity)) {
        event.preventDefault(); // Prevent form submission
        alert("Please enter valid numbers for price and quantity.");
      }
    });
  }

  // Example AJAX call to fetch inventory data without reloading the page
  const inventoryTable = document.querySelector("#inventory-table");

  if (inventoryTable) {
    // Fetch inventory data when the page loads
    fetchInventoryData();
  }

  function fetchInventoryData() {
    fetch("php/manage_inventory.php")
      .then((response) => response.json())
      .then((data) => {
        displayInventoryData(data);
      })
      .catch((error) => console.error("Error fetching inventory data:", error));
  }

  function displayInventoryData(data) {
    const inventoryTableBody = document.querySelector("#inventory-table tbody");
    inventoryTableBody.innerHTML = ""; // Clear existing table data

    data.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);

      const categoryCell = document.createElement("td");
      categoryCell.textContent = item.category;
      row.appendChild(categoryCell);

      const priceCell = document.createElement("td");
      priceCell.textContent = item.price;
      row.appendChild(priceCell);

      const quantityCell = document.createElement("td");
      quantityCell.textContent = item.quantity;
      row.appendChild(quantityCell);

      inventoryTableBody.appendChild(row);
    });
  }
});
