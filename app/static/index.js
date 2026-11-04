
const urlInput = document.getElementById('url');
const methodSelect = document.getElementById('method');
const sendButton = document.getElementById('send');

const container = document.querySelector('.response_txt');

sendButton.addEventListener('click', async () => {
    try {
        const requestData = {
            method: methodSelect.value,
            url: urlInput.value,
            headers: {},
            params: {},
            body: null
        };

        const response = await fetch("http://127.0.0.1:8000/api/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const result = await response.json();
        console.log("Full response:", result);
        console.log("Response body:", result.body);
        container.innerHTML = "";
        const heading = document.createElement("h3");
        heading.textContent = `Status Code: ${result.status_code}`;
        container.appendChild(heading);

        const time = document.createElement("p");
        time.textContent = `Response Time: ${result.response_time.toFixed(2)} ms`;
        container.appendChild(time);

        const bodyHeading = document.createElement("h3");
        bodyHeading.textContent = "Response Body";
        container.appendChild(bodyHeading);

        const responseBody = document.createElement("pre");
        responseBody.textContent = JSON.stringify(result.body, null, 2);
        container.appendChild(responseBody);

    } catch (error) {
        container.textContent = `Error: ${error.message}`;
        console.error(error);
    }
});
