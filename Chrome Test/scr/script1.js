/*function searchPage(tabId, searchTerm) {
  chrome.tabs.executeScript(tabId, {
    code: `
      var searchInput = document.querySelector("input[name='searchTerm']");
      var searchButton = document.querySelector("input[type='submit']");

      if (searchInput && searchButton) {
        searchInput.value = "${searchTerm}";
        searchButton.click();
        console.log("Search performed for: ${searchTerm}");
      } else {
        console.error("Error: Could not find search input or button on page.");
      }
    `
  });*/
  
  // Variables to store the search input and button elements
var searchInput;
var searchButton;

// Function to search the page with the specified text
function searchPage(tabId, textToSearch) {
  // Get references to the search input and button elements
  searchInput = document.querySelector("input[name='searchTerm']");
  searchButton = document.querySelector("input[type='submit']");

  // Check if both elements are found
  if (searchInput && searchButton) {
    // Input the search term in the input element
    searchInput.value = textToSearch;

    // Click the search button
    searchButton.click();

    return "Search performed for: " + textToSearch;
  } else {
    return "Error: Could not find search input or button on page.";
  }
};

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "searchPage") {
    // Call the searchPage function with the tab ID and search term
    var result = searchPage(request.tabId, request.textToSearch);
    sendResponse({result: result});
  }
});