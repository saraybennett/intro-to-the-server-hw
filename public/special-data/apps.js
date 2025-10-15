// JavaScript code for search functionality

// Load JSON data

fetch("As Am Lit.json")
  .then((response) => response.json())
  .then((data) => {
    // Get input element and results list
    let search = document.getElementById("search");
    let results = document.getElementById("results");

    // Attach event listener to input element
    search.addEventListener("keyup", function (event) {
      // Clear results list
      results.innerHTML = "";

      // Get search term
      let searchTerm = event.target.value.toLowerCase();

      // Loop through data and check for matches
      data.books.forEach(function (book) {
        // Check if title or author contains search term
        if (
          book.title.toLowerCase().indexOf(searchTerm) > -1 ||
          book.author.toLowerCase().indexOf(searchTerm) > -1
        ) {
          // Create result item
          let item = document.createElement("li");
          item.innerHTML =
            book.title + " by " + book.author + " (" + book.year + ")";
          results.appendChild(item);
        }
      });
    });
  });
