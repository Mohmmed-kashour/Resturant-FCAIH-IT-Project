onload = function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

let total = 0;
function addToInvoice(item, price) {
    const list = document.getElementById('invoice-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${item} - ${price} pound`;
    list.appendChild(listItem);

    total += price;
    document.getElementById('total').textContent = total;
}
