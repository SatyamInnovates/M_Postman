const urlInput = document.getElementById('url');
const methodSelect = document.getElementById('method');
const sendButton = document.getElementById('send');
const resultArea = document.getElementById('response_text')

sendButton.addEventListener('click',async () => {
    const requestData = {
        method: methodSelect.value,
        url: urlInput.value,
        headers:{},
        params:{},
        body:null
    }
    const response = await fetch("http://127.0.0.1:8000/api/request",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(requestData)
}
)
const result = await response.json();
resultArea.textContent = JSON.stringify(result,null,2);
})



