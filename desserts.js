let total = 0;
function addToInvoice(item, price) {
    const list = document.getElementById('invoice-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${item} - ${price} pound`;
    list.appendChild(listItem);

    total += price;
    document.getElementById('total').textContent = total;
}
