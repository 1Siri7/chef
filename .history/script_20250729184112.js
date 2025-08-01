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

// ---------- Chef Dashboard Logic ----------
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
      <img src="${imgSrc}" alt="${newName}" style="max-width: 100px; display:block; margin-bottom:5px;">
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
function editDish(button) {
  const li = button.parentElement;
  const textNodes = Array.from(li.childNodes).filter(
    node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().includes("₹")
  );

  if (textNodes.length === 0) {
    alert("Dish info not found.");
    return;
  }

  const oldText = textNodes[0].textContent.trim(); // "Dish - ₹100"
  const [oldName, oldPrice] = oldText.split(" - ₹");

  const newName = prompt("Edit Dish Name:", oldName);
  const newPrice = prompt("Edit Dish Price:", oldPrice);

  if (newName && newPrice) {
    const img = li.querySelector("img");
    const imgSrc = img ? img.src : "";

    // Clear li
    li.innerHTML = "";

    // Add image again
    if (imgSrc) {
      const newImg = document.createElement("img");
      newImg.src = imgSrc;
      newImg.style.maxWidth = "100px";
      newImg.style.display = "block";
      newImg.style.marginBottom = "5px";
      li.appendChild(newImg);
    }

    // Add updated text
    li.appendChild(document.createTextNode(`${newName} - ₹${newPrice}`));

    // Add buttons again
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editDish(editBtn);
    };
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteDish(deleteBtn);
    };
    li.appendChild(deleteBtn);
  }
}
