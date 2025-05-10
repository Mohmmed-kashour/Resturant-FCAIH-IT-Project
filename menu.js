function addToCart() {
  let span = document.getElementById("itemsInCart"); // نجيب الـ span
  let currentNumber = parseInt(span.innerText);   // ناخد الرقم اللي جواه ونحوله لرقم حقيقي (مش نص)
  currentNumber += 1;                             // نزود 1
  span.innerText = currentNumber;                 // نرجع نحط الرقم الجديد في الـ span
}
function completePurchase() {
  alert("Thank you for your purchase!");
  let span = document.getElementById("itemsInCart");
  span.innerText = "0";
}

window.onload = function () {
  let buttons = document.getElementsByClassName("category-button");
  let sections = document.getElementsByClassName("menu-category");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      let target = this.getAttribute("data-category");

      for (let j = 0; j < sections.length; j++) {
        sections[j].style.display = "none";
      }

      for (let j = 0; j < sections.length; j++) {
        if (sections[j].getAttribute("data-category") === target) {
          sections[j].style.display = "block";
        }
      }
    };
  }
};
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');
  const searchResultsList = document.getElementById('searchResultsList');

  // Function to perform search
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
      searchResults.style.display = 'none';
      return;
    }

    // Clear previous results
    searchResultsList.innerHTML = '';

    // Hide all other categories
    const categories = document.getElementsByClassName('menu-category');
    for (let i = 0; i < categories.length; i++) {
      categories[i].style.display = 'none';
    }

    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item-box');
    let resultsFound = 0;

    menuItems.forEach(item => {
      const itemName = item.querySelector('h4').textContent.toLowerCase();
      const itemDescription = item.querySelector('p').textContent.toLowerCase();

      if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
        resultsFound++;

        // Clone the item
        const clonedItem = item.cloneNode(true);

        // Highlight the search term in the name and description
        const itemNameElement = clonedItem.querySelector('h4');
        const itemDescElement = clonedItem.querySelector('p');

        itemNameElement.innerHTML = highlightSearchTerm(itemNameElement.textContent, searchTerm);
        itemDescElement.innerHTML = highlightSearchTerm(itemDescElement.textContent, searchTerm);

        // Append to search results
        searchResultsList.appendChild(clonedItem);
      }
    });

    if (resultsFound === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'No menu items found matching "' + searchTerm + '"';
      searchResultsList.appendChild(noResults);
    }

    // Show search results section
    searchResults.style.display = 'block';

    // Re-attach event listeners to the cloned "add to cart" buttons
    const clonedButtons = searchResults.querySelectorAll('.cart-btn');
    clonedButtons.forEach(button => {
      button.onclick = function () {
        addToCart();
        alert('Done!👍');
      };
    });
  }

  // Function to highlight search terms
  function highlightSearchTerm(text, searchTerm) {
    const regex = new RegExp('(' + searchTerm + ')', 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Event listeners
  searchButton.addEventListener('click', performSearch);

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Also allow searching when typing (after a short delay)
  let searchTimeout;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 500);
  });
});
