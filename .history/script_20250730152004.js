// script.js

// Function to handle user logout
function logout() {
    // Redirects the user to the 'index.html' page upon logout
    window.location.href = "index.html";
}

// Function to add a new dish to the menu
function addDish() {
    // Get references to input elements for new dish details
    const nameInput = document.getElementById("newDish");
    const priceInput = document.getElementById("dishPrice");
    const imageInput = document.getElementById("dishImage");
    const category = document.getElementById("dishCategory").value; // Get selected category
    // Toggle between Login and Register forms
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});

registerBtn.addEventListener("click", () => {
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});


    // Trim whitespace from name and price inputs
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const imageFile = imageInput.files[0]; // Get the selected image file

    // Basic validation: ensure all fields are filled
    if (!name || !price || !imageFile) {
        alert("Please enter all fields and select an image.");
        return; // Stop function execution if validation fails
    }

    // Use FileReader to read the image file as a Data URL
    const reader = new FileReader();
    reader.onload = function (e) {
        // Create a new list item (<li>) for the dish
        const li = document.createElement("li");
        li.classList.add('dish-item'); // Add a class for styling and easier selection
        li.style.display = "flex"; // Use flexbox for layout
        li.style.alignItems = "center"; // Vertically center items
        li.style.gap = "15px"; // Space between elements
        li.style.padding = "10px 0";
        li.style.borderBottom = "1px dotted #eee"; // Separator

        // Create the image element for the dish
        const img = document.createElement("img");
        img.src = e.target.result; // Set image source from FileReader result
        img.alt = name; // Set alt text for accessibility
        img.style.width = "60px"; // Fixed width for display
        img.style.height = "60px"; // Fixed height for display
        img.style.objectFit = "cover"; // Ensures image covers the area without distortion
        img.style.borderRadius = "8px"; // Rounded corners for the image
        img.classList.add('dish-image'); // Add a class for easier selection

        // Create a container for dish information (name/price display and edit inputs)
        const infoContainer = document.createElement("div");
        infoContainer.classList.add('dish-info-container');
        infoContainer.style.flexGrow = "1"; // Allows it to take available space

        // Element to display dish name and price (visible when not editing)
        const infoSpan = document.createElement("span");
        infoSpan.className = "dish-info-display";
        infoSpan.textContent = `${name} - ₹${price}`;
        infoSpan.style.fontWeight = "bold";
        infoSpan.style.color = "#444";

        // Input field for editing dish name (hidden initially)
        const nameEditInput = document.createElement("input");
        nameEditInput.type = "text";
        nameEditInput.classList.add('dish-name-edit');
        nameEditInput.value = name; // Pre-fill with current name
        nameEditInput.style.display = "none"; // Hidden by default
        nameEditInput.style.width = "calc(50% - 10px)"; // Responsive width
        nameEditInput.style.padding = "5px";
        nameEditInput.style.border = "1px solid #ccc";
        nameEditInput.style.borderRadius = "4px";

        // Input field for editing dish price (hidden initially)
        const priceEditInput = document.createElement("input");
        priceEditInput.type = "number"; // Use number type for price
        priceEditInput.classList.add('dish-price-edit');
        priceEditInput.value = price; // Pre-fill with current price
        priceEditInput.style.display = "none"; // Hidden by default
        priceEditInput.style.width = "calc(50% - 10px)"; // Responsive width
        priceEditInput.style.padding = "5px";
        priceEditInput.style.border = "1px solid #ccc";
        priceEditInput.style.borderRadius = "4px";

        // File input for changing dish image (hidden initially)
        const imageFileInput = document.createElement("input");
        imageFileInput.type = "file";
        imageFileInput.accept = "image/*"; // Only accept image files
        imageFileInput.classList.add('dish-image-edit');
        imageFileInput.style.display = "none"; // Hidden by default
        imageFileInput.style.marginTop = "5px"; // Spacing above it

        // Append display and edit inputs to the info container
        infoContainer.appendChild(infoSpan);
        infoContainer.appendChild(nameEditInput);
        infoContainer.appendChild(priceEditInput);
        infoContainer.appendChild(imageFileInput);

        // Create a div for action buttons (Edit/Save, Delete)
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "dish-actions";

        // Create the "Edit" button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add('edit-btn'); // Class for selection and styling
        editBtn.style.backgroundColor = "#3498db"; // Blue color
        editBtn.style.color = "white";
        editBtn.style.border = "none";
        editBtn.style.padding = "7px 14px";
        editBtn.style.borderRadius = "5px";
        editBtn.style.cursor = "pointer";
        editBtn.style.fontSize = "0.9em";
        editBtn.style.marginRight = "8px";
        editBtn.style.transition = "background-color 0.2s ease";
        // Add hover effects
        editBtn.onmouseover = () => editBtn.style.backgroundColor = "#2980b9";
        editBtn.onmouseout = () => editBtn.style.backgroundColor = "#3498db";

        // Dynamic click handler for Edit/Save button
        editBtn.onclick = function () {
            if (editBtn.textContent === "Edit") {
                startEdit(li); // If button says "Edit", start editing mode
            } else {
                saveEdit(li); // If button says "Save", save changes
            }
        };

        // Create the "Delete" button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn'); // Class for selection and styling
        deleteBtn.style.backgroundColor = "#e74c3c"; // Red color
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.padding = "7px 14px";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontSize = "0.9em";
        deleteBtn.style.transition = "background-color 0.2s ease";
        // Add hover effects
        deleteBtn.onmouseover = () => deleteBtn.style.backgroundColor = "#c0392b";
        deleteBtn.onmouseout = () => deleteBtn.style.backgroundColor = "#e74c3c";

        // Click handler for Delete button with confirmation
        deleteBtn.onclick = function () {
            if (confirm(`Are you sure you want to delete "${name}"?`)) {
                li.remove(); // Remove the list item from the DOM
            }
        };

        // Append buttons to the actions div
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        // Append all created elements to the list item
        li.appendChild(img);
        li.appendChild(infoContainer);
        li.appendChild(actionsDiv);

        // Append the new dish list item to the correct category list
        document.getElementById(`${category}List`).appendChild(li);
    };

    // Read the image file as a Data URL, which triggers the onload event
    reader.readAsDataURL(imageFile);

    // Clear the input fields after adding the dish
    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";
}

// Function to transition a dish item into editing mode
function startEdit(li) {
    // Get references to all relevant elements within the specific list item
    const displaySpan = li.querySelector('.dish-info-display');
    const nameInput = li.querySelector('.dish-name-edit');
    const priceInput = li.querySelector('.dish-price-edit');
    const imageFileInput = li.querySelector('.dish-image-edit');
    const editBtn = li.querySelector('.edit-btn');
    // const deleteBtn = li.querySelector('.delete-btn'); // No need to modify delete button state for now

    // Extract current name and price from the display span
    const [currentName, currentPrice] = displaySpan.textContent.split(' - ₹');

    // Populate the edit input fields with current values
    nameInput.value = currentName.trim();
    priceInput.value = currentPrice.trim();

    // Hide the display span and show the input fields
    displaySpan.style.display = 'none';
    nameInput.style.display = 'inline-block';
    priceInput.style.display = 'inline-block';
    imageFileInput.style.display = 'block'; // Display file input below text inputs

    // Change "Edit" button to "Save" and update its style
    editBtn.textContent = "Save";
    editBtn.style.backgroundColor = "#2ecc71"; // Green for Save
    editBtn.onmouseover = () => editBtn.style.backgroundColor = "#27ae60";
    editBtn.onmouseout = () => editBtn.style.backgroundColor = "#2ecc71";

    // Optional: Disable delete button during edit to prevent conflicts
    // deleteBtn.disabled = true;
}

// Function to save changes made to a dish item during editing
function saveEdit(li) {
    // Get references to all relevant elements within the specific list item
    const displaySpan = li.querySelector('.dish-info-display');
    const img = li.querySelector('.dish-image');
    const nameInput = li.querySelector('.dish-name-edit');
    const priceInput = li.querySelector('.dish-price-edit');
    const imageFileInput = li.querySelector('.dish-image-edit');
    const editBtn = li.querySelector('.edit-btn');
    // const deleteBtn = li.querySelector('.delete-btn'); // No need to modify delete button state for now

    // Get new values from the input fields
    const newName = nameInput.value.trim();
    const newPrice = priceInput.value.trim();
    const newImageFile = imageFileInput.files[0]; // Get the newly selected image file

    // Validation: ensure name is not empty and price is a valid number
    if (!newName || newPrice === "" || isNaN(parseFloat(newPrice))) {
        alert("Please enter a valid name and numeric price.");
        return; // Stop function execution if validation fails
    }

    // Update the text content of the display span
    // parseFloat and toFixed(0) ensure price is an integer in display
    displaySpan.textContent = `${newName} - ₹${parseFloat(newPrice).toFixed(0)}`;
    img.alt = newName; // Update alt text for accessibility

    // If a new image file was selected, read and update the image source
    if (newImageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result; // Update the main dish image
        };
        reader.readAsDataURL(newImageFile); // Read the new image file
    }

    // Hide the input fields and show the display span again
    displaySpan.style.display = 'block'; // Change back to block for text display
    nameInput.style.display = 'none';
    priceInput.style.display = 'none';
    imageFileInput.style.display = 'none';

    // Reset the file input value to clear the selected file
    imageFileInput.value = '';

    // Change "Save" button back to "Edit" and update its style
    editBtn.textContent = "Edit";
    editBtn.style.backgroundColor = "#3498db"; // Blue for Edit
    editBtn.onmouseover = () => editBtn.style.backgroundColor = "#2980b9";
    editBtn.onmouseout = () => editBtn.style.backgroundColor = "#3498db";

    // Optional: Re-enable delete button
    // deleteBtn.disabled = false;
}

// Function to update the status of an order
function updateOrderStatus(button) {
    const statusSpan = button.previousElementSibling; // Get the status span
    const currentStatus = statusSpan.textContent.toLowerCase(); // Get current status text

    // Logic to cycle through order statuses
    if (currentStatus === "pending") {
        statusSpan.textContent = "Preparing";
        statusSpan.className = "status preparing"; // Update class for styling
    } else if (currentStatus === "preparing") {
        statusSpan.textContent = "Completed";
        statusSpan.className = "status completed"; // Update class for styling
        button.remove(); // Remove the "Next" button once completed
    }
}