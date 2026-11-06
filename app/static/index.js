
const urlInput = document.getElementById('url');
const methodSelect = document.getElementById('method');
const sendButton = document.getElementById('send');
const container = document.querySelector('.response_txt');
const bodyInput = document.getElementById('request_body');
const addheaderbutton = document.getElementById("add_header");
const addqbsButtion = document.getElementById("add_parameter");

const params_button = document.getElementById("params-tab");
const headers_button = document.getElementById("headers-tab");
const body_button = document.getElementById("body-tab");

const qbsSection = document.getElementById("params-rows");
const params_section = document.getElementById("params-section");
const headerSection = document.getElementById("headers-section");
const bodySection = document.getElementById("body-section");

const responseBodySection = document.getElementById("response-body-section");
const responseHeadersSection = document.getElementById("response-headers-section");


addqbsButtion.addEventListener("click", () => {

    const qbsRow = document.createElement("div");
    qbsRow.classList.add('q_p_s');

    const keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.placeholder = "QBS Key";

    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.placeholder = "Value";

    keyInput.classList.add("q_p_s-key");
    valueInput.classList.add("q_p_s-value");

    qbsRow.appendChild(keyInput);
    qbsRow.appendChild(valueInput);

    qbsSection.appendChild(qbsRow);
});


addheaderbutton.addEventListener("click", () => {

    const headerRow = document.createElement("div");
    headerRow.classList.add("header-row");

    const keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.placeholder = "Header Key";

    const valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.placeholder = "Header Value";

    keyInput.classList.add("header-key");
    valueInput.classList.add("header-value");

    headerRow.appendChild(keyInput);
    headerRow.appendChild(valueInput);

    headerSection.appendChild(headerRow);

});


function highlightJSON(data) {

    const formattedJSON = JSON.stringify(data, null, 2);

    return formattedJSON.replace(
        /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(?=\s*:))|("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,

        (match, key, string) => {

            if (key) {
                return `<span class="json-key">${key}</span>`;
            }

            if (string) {
                return `<span class="json-string">${string}</span>`;
            }

            if (match === "true" || match === "false" || match === "null") {
                return `<span class="json-value">${match}</span>`;
            }

            return `<span class="json-number">${match}</span>`;
        }
    );
}


sendButton.addEventListener('click', async () => {

    try {

        const requestData = {
            method: methodSelect.value,
            url: urlInput.value,
            headers: collectHeaders(),
            params: collectqbs(),
            body: bodyInput.value ? JSON.parse(bodyInput.value) : null
        };

        console.log("Sending headers:", requestData.headers);

        const response = await fetch("http://127.0.0.1:8000/api/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        
        const result = await response.json();
        const successMessage = document.getElementById("success-message");
        if (result.status_code >= 200 && result.status_code < 300){
            successMessage.textContent = "Hurrah! It worked"
            successMessage.style.display = "block";
        }else {
            successMessage.textContent = "Sorrt Man! Request failed";
            successMessage.style.display = "block";
        }
        console.log(result);
        console.log("Response body:", result.body);

        document.getElementById("response-status").textContent =
            `Status Code: ${result.status_code}`;

        document.getElementById("response-time").textContent =
            `Response Time: ${result.response_time.toFixed(2)} ms`;


        responseBodySection.innerHTML = "<h3>Response Body</h3>";



        const coreAnswer = result.body?.choices?.[0]?.message?.content;

        if (coreAnswer) {

            const coreHeading = document.createElement("h3");
            coreHeading.textContent = "Core Answer";

            const coreText = document.createElement("pre");
            coreText.classList.add("json-response");

            try {
                const parsedAnswer = JSON.parse(coreAnswer);
                coreText.innerHTML = highlightJSON(parsedAnswer);
            } catch {
                coreText.textContent = coreAnswer;
            }

            responseBodySection.appendChild(coreHeading);
            responseBodySection.appendChild(coreText);
        }




        const responseBody = document.createElement("pre");
        responseBody.classList.add("json-response");

        responseBody.innerHTML = highlightJSON(result.body);

        responseBodySection.appendChild(responseBody);


        responseHeadersSection.innerHTML = "<h3>Useful Response Headers</h3>";

        const usefulHeaders = [
            "content-type",
            "content-length",
            "date",
            "server",
            "cache-control",
            "x-ratelimit-remaining-requests"
        ];

        const filteredHeaders = {};

        usefulHeaders.forEach(header => {
            if (result.headers[header]) {
                filteredHeaders[header] = result.headers[header];
            }
        });

        const headersDisplay = document.createElement("pre");
        headersDisplay.classList.add("json-response");

        headersDisplay.innerHTML = highlightJSON(filteredHeaders);

        responseHeadersSection.appendChild(headersDisplay);


    } catch (error) {

        console.error(error);
        alert(`Error: ${error.message}`);

    }

});


function collectHeaders() {

    const keys = document.querySelectorAll(".header-key");
    const values = document.querySelectorAll(".header-value");

    const headers = {};

    keys.forEach((key, index) => {

        const headerName = key.value.trim();
        const headerValue = values[index].value.trim();

        if (headerName && headerValue) {
            headers[headerName] = headerValue;
        }

    });

    return headers;
}


function collectqbs() {

    const keys = document.querySelectorAll(".q_p_s-key");
    const values = document.querySelectorAll(".q_p_s-value");

    const qbs_parameters = {};

    keys.forEach((key, index) => {

        const qpsName = key.value.trim();
        const qpsValue = values[index].value.trim();

        if (qpsName && qpsValue) {
            qbs_parameters[qpsName] = qpsValue;
        }

    });

    return qbs_parameters;
}


console.log(collectHeaders());
console.log(collectqbs());


function showSection(section, activeButton) {

    params_section.style.display = "none";
    headerSection.style.display = "none";
    bodySection.style.display = "none";

    params_button.classList.remove("active");
    headers_button.classList.remove("active");
    body_button.classList.remove("active");

    section.style.display = "block";

    activeButton.classList.add('active');
}


params_button.addEventListener("click", () => {
    showSection(params_section, params_button);
});

headers_button.addEventListener("click", () => {
    showSection(headerSection, headers_button);
});

body_button.addEventListener("click", () => {
    showSection(bodySection, body_button);
});


showSection(params_section, params_button);
