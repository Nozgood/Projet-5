let url = new URL(window.location.href);
let orderId = url.searchParams.get('orderId');
console.log(orderId);

let spanOrderId = document.getElementById('orderId');
spanOrderId.textContent = orderId;