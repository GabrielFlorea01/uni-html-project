const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");

let isDrawing = false;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(function () {
        successMessage.style.display = "block";
        form.reset();
        clearSignature();
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }, 1000);
});
