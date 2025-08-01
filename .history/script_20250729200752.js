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

    // Dish image
    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = name;
    img.style.maxWidth = "100px";
    img.style.display = "block";
    img.style.marginBottom = "5px";

    // Dish info text
    const info = document.createElement("span");
    info.className = "dish-info";
    info.textContent = `${name} - ₹${price}`;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editDish(li, img, info);
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      li.remove();
    };

    // Append all to list item
    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(document.createElement("br"));
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add to category list
    document.getElementById(`${category}List`).appendChild(li);
  };

  reader.readAsDataURL(imageFile);

  // Clear inputs
  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
}
