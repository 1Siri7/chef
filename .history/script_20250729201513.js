<script>
  function logout() {
    window.location.href = "index.html";
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
      alert("Please enter all fields and select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = name;
      img.style.maxWidth = "100px";
      img.style.display = "block";
      img.style.marginBottom = "5px";

      const infoSpan = document.createElement("span");
      infoSpan.className = "dish-info";
      infoSpan.textContent = `${name} - ₹${price}`;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = function () {
        editDish(this);
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = function () {
        li.remove();
      };

      li.appendChild(img);
      li.appendChild(infoSpan);
      li.appendChild(document.createElement("br"));
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      document.getElementById(`${category}List`).appendChild(li);
    };

    reader.readAsDataURL(imageFile);

    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
  }

  function editDish(button) {
    const li = button.parentElement;
    const infoSpan = li.querySelector(".dish-info");
    const img = li.querySelector("img");

    const [oldName, oldPrice] = infoSpan.textContent.split(" - ₹");

    const newName = prompt("Edit dish name:", oldName);
    const newPrice = prompt("Edit dish price:", oldPrice);

    if (!newName || !newPrice) {
      alert("Both fields are required.");
      return;
    }

    infoSpan.textContent = `${newName} - ₹${newPrice}`;
    img.alt = newName;

    if (confirm("Do you want to change the image?")) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";

      input.onchange = function () {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
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
</script>
