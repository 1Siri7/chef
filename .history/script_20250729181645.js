const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
});

// Redirect on submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "dashboard.html";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "dashboard.html";
});
<script>
  function logout() {
    window.location.href = "index.html";
  }

  function addDish() {
    const nameInput = document.getElementById("newDish");
    const priceInput = document.getElementById("dishPrice");
    const imageInput = document.getElementById("dishImage");
    const category = document.getElementById("dishCategory").value;

    const dish = nameInput.value.trim();
    const price = priceInput.value.trim();
    const imageFile = imageInput.files[0];

    if (!imageFile) {
      alert("Please select an image before adding a dish.");
      return;
    }

    if (dish && price) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${e.target.result}" alt="${dish}" style="max-width: 100px; display:block; margin-bottom:5px;">
          ${dish} - ₹${price}
          <button onclick='editDish(this)'>Edit</button>
          <button onclick='deleteDish(this)'>Delete</button>`;
        document.getElementById(`${category}List`).appendChild(li);
      };
      reader.readAsDataURL(imageFile);

      nameInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
    }
  }

  function deleteDish(btn) {
    btn.parentElement.remove();
  }

  function editDish(btn) {
    const li = btn.parentElement;
    const text = li.innerText.split("\n")[1]; // After image
    const textParts = text.split(" - ₹");
    const currentName = textParts[0].trim();
    const currentPrice = textParts[1]?.trim() || "";
    const newName = prompt("Edit dish name:", currentName);
    const newPrice = prompt("Edit dish price:", currentPrice);
    if (newName && newPrice) {
      const imgSrc = li.querySelector("img").src;
      li.innerHTML = `
        <img src="${imgSrc}" style="max-width: 100px; display:block; margin-bottom:5px;">
        ${newName} - ₹${newPrice}
        <button onclick='editDish(this)'>Edit</button>
        <button onclick='deleteDish(this)'>Delete</button>`;
    }
  }

  function updateOrderStatus(button) {
    const statusSpan = button.previousElementSibling;
    const currentStatus = statusSpan.textContent.toLowerCase();
    if (currentStatus === "pending") {
      statusSpan.textContent = "Preparing";
      statusSpan.className = "status preparing";
    } else if (currentStatus === "preparing") {
      statusSpan.textContent = "Completed";
      statusSpan.className = "status completed";
      button.remove();
    }
  }

  function previewImage(input) {
    const file = input.files[0];
    if (file) alert("Selected file: " + file.name);
  }
