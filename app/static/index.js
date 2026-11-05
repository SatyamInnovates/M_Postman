
const urlInput = document.getElementById('url');
const methodSelect = document.getElementById('method');
const sendButton = document.getElementById('send');
const container = document.querySelector('.response_txt');
const bodyInput = document.getElementById('request_body');
const addheaderbutton = document.getElementById("add_header");
const addqbsButtion = document.getElementById("add_parameter");
const params_button = document.getElementById("params-tab")

const headers_button = document.getElementById("headers-tab")

const body_button = document.getElementById("body-tab")

const qbsSection = document.getElementById("params-rows");
const params_section = document.getElementById("params-section");
const headerSection = document.getElementById("headers-section");
const bodySection = document.getElementById("body-section");



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

        console.log(result);
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




function showSection(section,activeButton) {
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
    showSection(params_section,params_button);
});

headers_button.addEventListener("click", () => {
    showSection(headerSection,headers_button);
});

body_button.addEventListener("click", () => {
    showSection(bodySection,body_button);
});



