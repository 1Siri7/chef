// ---------- Login/Register Toggle ----------
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginBtn && registerBtn && loginForm && registerForm) {
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

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
}

// ---------- Logout ----------
function logout() {
  window.location.href = "index.html";
}

// ---------- Add Dish ----------
function addDish() {
  const nameInput = document.getElementById("newDish");
  const priceInput = document.getElementById("dishPrice");
  const imageInput = document.getElementById("dishImage");
  const category = document.getElementById("dishCategory").value;

  const dish = nameInput.value.trim();
  const price = priceInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!dish || !price || !imageFile) {
    alert("Please enter all fields including an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = dish;
    img.style.maxWidth = "100px";
    img.style.display = "block";
    img.style.marginBottom = "5px";

    const infoSpan = document.createElement("span");
    infoSpan.className = "dish-info";
    infoSpan.textContent = `${dish} - ₹${price}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editDish(this);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteDish(this);
    };

    li.appendChild(img);
    li.appendChild(infoSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById(`${category}List`).appendChild(li);
  };

  reader.readAsDataURL(imageFile);

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
}

// ---------- Delete Dish ----------
function deleteDish(button) {
  button.parentElement.remove();
}

// ---------- Edit Dish ----------
function editDish(button) {
  const li = button.parentElement;
  const infoSpan = li.querySelector(".dish-info");
  const img = li.querySelector("img");

  if (!infoSpan) {
    alert("Error: Dish info not found.");
    return;
  }

  const text = infoSpan.textContent; // like "Pizza - ₹100"
  const [currentName, currentPrice] = text.split(" - ₹");

  const newName = prompt("Edit dish name:", currentName.trim());
  const newPrice = prompt("Edit dish price:", currentPrice.trim());

  if (newName && newPrice) {
    infoSpan.textContent = `${newName} - ₹${newPrice}`;
    if (img) img.alt = newName;
  }
}

// ---------- Order Status Update ----------
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
