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
const responseBodyContent = document.getElementById("response-body-content");
const responseBodySection = document.getElementById("response-body-section");
const responseHeadersSection = document.getElementById("response-headers-section");
const copyResponseButton = document.getElementById("copy-response")
const responseBodyTab = document.getElementById("response-body-tab");
const responseHeadersTab=document.getElementById("response-headers-tab")
const responseCookiesTab=document.getElementById("response-cookies-tab");
const responseCookiesSection = document.getElementById("response-cookies-section");
let latestResponse = null;


function showResponseSection(section,activeButton){
    responseBodySection.style.display ="none";
    responseHeadersSection.style.display = "none";
    responseCookiesSection.style.display = "none";
    responseHeadersTab.classList.remove('active')
    responseBodyTab.classList.remove('active')
    responseCookiesTab.classList.remove("active");

    section.style.display = "block";
    activeButton.classList.add("active");
}


responseBodyTab.addEventListener("click",() => {
    showResponseSection(responseBodySection,responseBodyTab);
})
responseHeadersTab.addEventListener("click",() => {
    showResponseSection(responseHeadersSection,responseHeadersTab);
})
responseCookiesTab.addEventListener("click",() => {
    showResponseSection(responseCookiesSection,responseCookiesTab)
})
showResponseSection(responseBodySection, responseBodyTab);
copyResponseButton.addEventListener("click", async () => {
    try {
        if (!latestResponse) {
            alert("No response available to copy.");
            return;
        }

        const responseText = JSON.stringify(latestResponse.body, null, 2);

        await navigator.clipboard.writeText(responseText);

        copyResponseButton.textContent = "Copied!";

    } catch (error) {
        console.error(error);
        alert("Unable to copy response.");
    }
});


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
            const safeMatch = match
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\"/g, "&quot;")
                .replace(/'/g, "&#39;");

            if (key) {
                return `<span class="json-key">${safeMatch}</span>`;
            }

            if (string) {
                return `<span class="json-string">${safeMatch}</span>`;
            }

            if (match === "true" || match === "false" || match === "null") {
                return `<span class="json-value">${safeMatch}</span>`;
            }

            return `<span class="json-number">${safeMatch}</span>`;
        }
    );
}


sendButton.addEventListener('click', async () => {

    try {
        sendButton.disabled = true;
        sendButton.textContent = "checking.."
        const requestData = {
            method: methodSelect.value,
            url: new URL(urlInput.value.trim()).href,
            headers: collectHeaders(),
            params: collectqbs(),
            body: bodyInput.value ? JSON.parse(bodyInput.value) : null
        };

        const apiBase = window.location.port === "5500" ? "http://127.0.0.1:8000" : "";
        const response = await fetch(`${apiBase}/api/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });



        const responseText = await response.text();
        let result;
        try {
            result = JSON.parse(responseText);
        } catch {
            throw new Error(`API returned an empty or non-JSON response (${response.status}).`);
        }
        if (!response.ok) {
            throw new Error(result.detail || `API request failed (${response.status}).`);
        }
        latestResponse = result;
        copyResponseButton.textContent = "copy response"
        const successMessage = document.getElementById("success-message");
        if (result.status_code >= 200 && result.status_code < 300){
            successMessage.textContent = "Hurrah! It worked"
            successMessage.style.display = "block";
        }else {
            successMessage.textContent = "Sorrt Man! Request failed";
            successMessage.style.display = "block";
        }
        document.getElementById("response-status").textContent =
            `Status Code: ${result.status_code}`;

        document.getElementById("response-time").textContent =
            `Response Time: ${result.response_time.toFixed(2)} ms`;


        responseBodyContent.innerHTML = "";



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

            responseBodyContent.appendChild(coreHeading);
            responseBodyContent.appendChild(coreText);
        }


        const responseBody = document.createElement("pre");
        responseBody.classList.add("json-response");

        responseBody.innerHTML = highlightJSON(result.body);

        responseBodyContent.appendChild(responseBody);


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

        responseCookiesSection.innerHTML = "<h3>Response Cookies</h3>";

        const cookies = Array.isArray(result.cookies) ? result.cookies : [];

        if (cookies.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "No cookies were returned with this response.";
            responseCookiesSection.appendChild(emptyMessage);
        }

        cookies.forEach(cookie => {
        const cookieDisplay = document.createElement("div");
        cookieDisplay.classList.add("cookie-item");

        const attributes = [
            ["Name", cookie.name],
            ["Value", cookie.value],
            ["Domain", cookie.domain],
            ["Path", cookie.path],
            ["Secure", cookie.secure],
            ["HttpOnly", cookie.httponly],
            ["SameSite", cookie.samesite || "Not specified"]
        ];

        attributes.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = label + ": ";
            paragraph.appendChild(strong);
            paragraph.appendChild(document.createTextNode(String(value)));

            cookieDisplay.appendChild(paragraph);
        });

            responseCookiesSection.appendChild(cookieDisplay);
        });

    }
    catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);

    }finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send";
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
