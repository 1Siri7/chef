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

  if (!infoSpan || !img) {
    alert("Dish info or image not found.");
    return;
  }

  const text = infoSpan.textContent;
  const splitIndex = text.lastIndexOf(" - ₹");
  const currentName = text.substring(0, splitIndex);
  const currentPrice = text.substring(splitIndex + 4);

  const newName = prompt("Edit Dish Name:", currentName);
  const newPrice = prompt("Edit Dish Price:", currentPrice);

  if (!newName || !newPrice) {
    alert("Name and Price are required.");
    return;
  }

  // Ask if user wants to change the image
  const confirmChangeImage = confirm("Do you want to change the dish image?");
  if (confirmChangeImage) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = function () {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
          img.alt = newName;
          infoSpan.textContent = `${newName} - ₹${newPrice}`;
        };
        reader.readAsDataURL(file);
      } else {
        alert("No image selected.");
      }
    };

    fileInput.click();
  } else {
    // Only update name and price
    img.alt = newName;
    infoSpan.textContent = `${newName} - ₹${newPrice}`;
  }
}

function addDish() {
  const nameInput = document.getElementById("newDish");
  const priceInput = document.getElementById("dishPrice");
  const imageInput = document.getElementById("dishImage");
  const category = document.getElementById("dishCategory").value;

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!name || !price || !imageFile) {
    alert("Please fill all fields and choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = name;
    img.width = 100;

    const info = document.createElement("span");
    info.className = "dish-info";
    info.textContent = `${name} - ₹${price}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editDish(li, img, info);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      li.remove();
    };

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById(`${category}List`).appendChild(li);
  };

  reader.readAsDataURL(imageFile);

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
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
