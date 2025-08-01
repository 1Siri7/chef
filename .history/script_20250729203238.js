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
    li.style.display = "flex"; // Added for better alignment
    li.style.alignItems = "center"; // Added for better alignment
    li.style.gap = "10px"; // Added for spacing between elements

    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = name;
    img.style.maxWidth = "70px"; // Adjusted size
    img.style.maxHeight = "70px"; // Adjusted size
    img.style.objectFit = "cover"; // Ensures image fills container without distortion
    img.style.borderRadius = "5px"; // Slightly rounded corners

    const infoSpan = document.createElement("span");
    infoSpan.className = "dish-info";
    infoSpan.textContent = `${name} - ₹${price}`;
    infoSpan.style.flexGrow = "1"; // Allows infoSpan to take available space

    const actionsDiv = document.createElement("div"); // Container for buttons
    actionsDiv.className = "dish-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.backgroundColor = "#3498db"; // Style for edit button
    editBtn.style.color = "white";
    editBtn.style.border = "none";
    editBtn.style.padding = "6px 12px";
    editBtn.style.borderRadius = "4px";
    editBtn.style.cursor = "pointer";
    editBtn.style.fontSize = "0.85em";
    editBtn.style.marginRight = "5px"; // Space between buttons
    editBtn.onclick = function () {
      editDish(this);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "#e74c3c"; // Style for delete button
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "6px 12px";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.fontSize = "0.85em";
    deleteBtn.onclick = function () {
      if (confirm(`Are you sure you want to delete "${name}"?`)) {
        li.remove();
      }
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(img);
    li.appendChild(infoSpan);
    li.appendChild(actionsDiv); // Append the button container

    document.getElementById(`${category}List`).appendChild(li);
  };

  reader.readAsDataURL(imageFile);

  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
}

function editDish(button) {
  const li = button.parentElement.parentElement; // Go up two levels to get the <li>
  const infoSpan = li.querySelector(".dish-info");
  const img = li.querySelector("img");

  const [oldName, oldPrice] = infoSpan.textContent.split(" - ₹");

  const newName = prompt("Edit dish name:", oldName);
  // Allow null/empty string for newName in case user cancels prompt
  if (newName === null) return; // User cancelled

  const newPrice = prompt("Edit dish price:", oldPrice);
  // Allow null/empty string for newPrice in case user cancels prompt
  if (newPrice === null) return; // User cancelled

  // Validate if the newName and newPrice are not just empty strings after trimming
  if (newName.trim() === "" || newPrice.trim() === "") {
    alert("Both name and price are required.");
    return;
  }

  infoSpan.textContent = `${newName.trim()} - ₹${newPrice.trim()}`;
  img.alt = newName.trim();

  if (confirm("Do you want to change the image?")) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none"; // Keep it hidden

    // Append to body temporarily so it can be clicked
    document.body.appendChild(input);

    input.onchange = function () {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
          // Remove the input element after the file has been processed
          document.body.removeChild(input);
        };
        reader.readAsDataURL(file);
      } else {
        // If user opened dialog but didn't select a file, remove the input
        document.body.removeChild(input);
      }
    };

    // Programmatically click the input to open the file dialog
    input.click();
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