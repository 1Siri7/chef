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

function editDish(button) {
  const li = button.parentElement;
  const img = li.querySelector("img");

  const textNode = Array.from(li.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.includes("₹")
  );

  if (!textNode) {
    alert("Could not find dish text.");
    return;
  }

  const dishText = textNode.textContent.trim(); // "Dish Name - ₹Price"
  const parts = dishText.split(" - ₹");

  const currentName = parts[0];
  const currentPrice = parts[1];

  const newName = prompt("Edit dish name:", currentName);
  const newPrice = prompt("Edit dish price:", currentPrice);

  if (newName && newPrice) {
    li.innerHTML = "";

    if (img) {
      const newImg = document.createElement("img");
      newImg.src = img.src;
      newImg.alt = newName;
      newImg.style.maxWidth = "100px";
      newImg.style.display = "block";
      newImg.style.marginBottom = "5px";
      li.appendChild(newImg);
    }

    li.appendChild(document.createTextNode(`${newName} - ₹${newPrice} `));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editDish(editBtn);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteDish(deleteBtn);
    li.appendChild(deleteBtn);
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
