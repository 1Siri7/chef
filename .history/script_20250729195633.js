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
