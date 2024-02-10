// Event listener for form submission
document.getElementById("post-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  const message = document.getElementById("message").value;
  const imageInput = document.getElementById("image");
  const videoInput = document.getElementById("video");

  // Create a FormData object to send text, images, and videos together
  const formData = new FormData();
  formData.append("message", message);

  // Append image and video files to the FormData object
  for (let i = 0; i < imageInput.files.length; i++) {
    formData.append("images", imageInput.files[i]);
  }

  for (let i = 0; i < videoInput.files.length; i++) {
    formData.append("videos", videoInput.files[i]);
  }

  // Send the FormData object to the server for storage
  fetch("/post-message", {
    method: "POST",
    body: formData,
  }).then(() => {
    // Clear the input fields
    document.getElementById("message").value = "";
    imageInput.value = ""; // Clear file input
    videoInput.value = ""; // Clear file input

    // Fetch and display updated messages
    fetchAndDisplayMessages();
  });
});

// Function to fetch and display messages
function fetchAndDisplayMessages() {
  fetch("/get-messages") // Replace with your server route for retrieving messages
    .then((response) => response.json())
    .then((data) => {
      const messagesContainer = document.getElementById("messages-container");
      messagesContainer.innerHTML = ""; // Clear existing messages

      data.messages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<p>${message.text}</p>`;

        if (data.messages && data.messages.length > 0) {
          const messagesContainer =
            document.getElementById("messages-container");
          messagesContainer.innerHTML = ""; // Clear existing messages

          data.messages.forEach((message) => {
            const messageElement = document.createElement("div");

            // Display the user's name at the top of the message
            const userNameElement = document.createElement("p");
            userNameElement.textContent = "john";

            // Apply CSS styles to the username element
            userNameElement.style.fontWeight = "bold"; // Make it bold
            userNameElement.style.color = "blue"; // Change the color

            messageElement.appendChild(userNameElement);

            // Display images if available
            if (message.images && message.images.length > 0) {
              message.images.forEach((imageData) => {
                if (typeof imageData === "object" && imageData.buffer) {
                  const arrayBufferView = new Uint8Array(imageData.buffer.data);
                  const blob = new Blob([arrayBufferView], {
                    type: imageData.mimetype,
                  });
                  const imageUrl = URL.createObjectURL(blob);
                  const imgElement = document.createElement("img");
                  imgElement.src = imageUrl;
                  // Resize the image to 100x100 pixels
                  imgElement.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = 100;
                    canvas.height = 100;
                    ctx.drawImage(imgElement, 0, 0, 100, 100);
                    const resizedImageUrl = canvas.toDataURL(
                      imageData.mimetype
                    );
                    imgElement.src = resizedImageUrl;
                    messageElement.appendChild(imgElement);
                  };
                }
              });
            }

            // Append the message element to the container
            messagesContainer.appendChild(messageElement);
          });
        }

        // Display videos if available
        if (message.videos && message.videos.length > 0) {
          message.videos.forEach((video) => {
            const videoElement = document.createElement("video");
            videoElement.src = `data:${
              video.mimetype
            };base64,${video.buffer.toString("base64")}`;
            videoElement.controls = true;
            messageElement.appendChild(videoElement);
          });
        }

        messagesContainer.appendChild(messageElement);
      });
    });
}

// Initial fetch and display of messages when the page loads
fetchAndDisplayMessages();
