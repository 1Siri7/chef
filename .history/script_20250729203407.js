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
        li.classList.add('dish-item'); // Add a class for easier styling and selection
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "15px"; // Increased gap for clarity
        li.style.padding = "10px 0";
        li.style.borderBottom = "1px dotted #eee";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = name;
        img.style.width = "60px"; // Fixed width
        img.style.height = "60px"; // Fixed height
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px"; // Slightly more rounded corners
        img.classList.add('dish-image'); // Add a class for easier selection

        const infoSpan = document.createElement("span");
        infoSpan.className = "dish-info";
        infoSpan.textContent = `${name} - ₹${price}`;
        infoSpan.style.flexGrow = "1";
        infoSpan.style.fontWeight = "bold";
        infoSpan.style.color = "#444";

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "dish-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.backgroundColor = "#3498db";
        editBtn.style.color = "white";
        editBtn.style.border = "none";
        editBtn.style.padding = "7px 14px"; // Adjusted padding
        editBtn.style.borderRadius = "5px";
        editBtn.style.cursor = "pointer";
        editBtn.style.fontSize = "0.9em";
        editBtn.style.marginRight = "8px"; // Spacing between buttons
        editBtn.style.transition = "background-color 0.2s ease";
        editBtn.onmouseover = () => editBtn.style.backgroundColor = "#2980b9";
        editBtn.onmouseout = () => editBtn.style.backgroundColor = "#3498db";
        editBtn.onclick = function () {
            console.log("Edit button clicked for:", infoSpan.textContent);
            editDish(this);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "#e74c3c";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.padding = "7px 14px"; // Adjusted padding
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontSize = "0.9em";
        deleteBtn.style.transition = "background-color 0.2s ease";
        deleteBtn.onmouseover = () => deleteBtn.style.backgroundColor = "#c0392b";
        deleteBtn.onmouseout = () => deleteBtn.style.backgroundColor = "#e74c3c";
        deleteBtn.onclick = function () {
            if (confirm(`Are you sure you want to delete "${name}"?`)) {
                li.remove();
                console.log("Dish deleted:", name);
            }
        };

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(img);
        li.appendChild(infoSpan);
        li.appendChild(actionsDiv);

        document.getElementById(`${category}List`).appendChild(li);
        console.log("Dish added:", name, "to", category);
    };

    reader.readAsDataURL(imageFile);

    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
}

function editDish(button) {
    console.log("editDish function called.");
    // Traverse up to find the parent <li> element.
    // The button is inside actionsDiv, which is inside li.
    const li = button.closest('.dish-item');
    if (!li) {
        console.error("Could not find parent <li> element for edit button.");
        return;
    }

    const infoSpan = li.querySelector(".dish-info");
    const img = li.querySelector(".dish-image"); // Use the class for more reliable selection

    if (!infoSpan || !img) {
        console.error("Could not find dish info span or image within the list item.");
        return;
    }

    const [oldName, oldPrice] = infoSpan.textContent.split(" - ₹");
    console.log("Current dish info:", { oldName, oldPrice });

    // --- Edit Name and Price ---
    const newName = prompt("Edit dish name:", oldName);
    if (newName === null) { // User clicked cancel
        console.log("Name edit cancelled.");
        return;
    }

    const newPrice = prompt("Edit dish price (₹):", oldPrice);
    if (newPrice === null) { // User clicked cancel
        console.log("Price edit cancelled.");
        return;
    }

    // Validate inputs
    if (newName.trim() === "" || newPrice.trim() === "" || isNaN(parseFloat(newPrice.trim()))) {
        alert("Both name and a valid price are required.");
        console.warn("Invalid name or price entered.");
        return;
    }

    infoSpan.textContent = `${newName.trim()} - ₹${parseFloat(newPrice.trim()).toFixed(0)}`; // Ensure price is formatted as an integer if needed
    img.alt = newName.trim();
    console.log("Dish info updated to:", infoSpan.textContent);

    // --- Edit Image (Optional) ---
    if (confirm("Do you want to change the image?")) {
        console.log("Image change requested.");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.style.display = "none";

        // Append to body temporarily so it can be clicked
        document.body.appendChild(input);

        input.onchange = function () {
            console.log("File input change detected.");
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                    console.log("Image updated successfully.");
                    // Remove the input element after the file has been processed
                    document.body.removeChild(input);
                };
                reader.readAsDataURL(file);
            } else {
                console.log("No file selected for image change.");
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
        console.log("Order status changed to Preparing.");
    } else if (currentStatus === "preparing") {
        statusSpan.textContent = "Completed";
        statusSpan.className = "status completed";
        button.remove();
        console.log("Order status changed to Completed.");
    }
}