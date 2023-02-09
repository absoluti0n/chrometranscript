var searchInput;
var searchButton;

// Function to search the page with the specified text

function searchPage(textToSearch) {
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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "capture") {

      chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
        console.log("ça marche");
        var image = request.image;
        image.src = dataUrl;
        sendResponse({screenshot: dataUrl})
      });
    return true;  
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getTabId") {
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.startsWith("https://datagalaxy-test.liebherr.i")) {
          var tabId = tabs[i].id;
          console.log("Tab with URL starting with 'https://datagalaxy-test.liebherr.i' is open, with ID: " + tabId);
		  chrome.tabs.update(tabId, { active: true });
          sendResponse({ tabId: tabId });
		  
		  	chrome.runtime.sendMessage({ greeting: "Hello from background script" }, function(response) {
				console.log(response.farewell);
			});
          return true; // This will indicate that the response function will only be called once
        }
      }
      sendResponse({ tabId: "no" });
      return true;
    });
    return true; // This will indicate that the response will be sent asynchronously
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action === "search") {
		/*
		chrome.scripting.executeScript({
			target: {tabId: request.tabId, text: request.msg},
			files: ['scr/script1.js']
		});*/
		
		//chrome.tabs.update(request.tabId, { active: true });
		
		/*searchPage(request.textToSearch).then(
			console.log("ça y est fréro on a gagné");
		)*/
		
		/*searchInput = document.querySelector("input[name='searchTerm']");
		searchButton = document.querySelector("input[type='submit']");
		
		if (searchInput && searchButton) {
			// Input the search term in the input element
			searchInput.value = request.textToSearch;

			// Click the search button
			searchButton.click();

			return "Search performed for: " + textToSearch;
		  } else {
			return "Error: Could not find search input or button on page.";
		  }*/

		return true;
	}
});



/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getTabId") {
	console.log("yea");
    chrome.tabs.query({}, async function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.startsWith("https://datagalaxy-test.liebherr.i")) {
          var tabId = tabs[i].id;
          console.log("Tab with URL starting with 'https://datagalaxy-test.liebherr.i' is open, with ID: " + tabId);
          sendResponse({tabId: tabId});
          return true;
        } 
      }
    });
  return true;
  }
});

/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getTabId") {
	console.log("yea");
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  var currentTab = tabs[0];
		  var currentTabUrl = currentTab.url;
		  console.log(currentTabUrl);
		});
  }
});*/

/*function searchPage(searchTerm) {
  var searchInput = document.querySelector("input[name='searchTerm']");
  var searchButton = document.querySelector("input[type='submit']");

  if (searchInput && searchButton) {
    searchInput.value = searchTerm;
    searchButton.click();
    return "Search performed for: " + searchTerm;
  } else {
    return "Error: Could not find search input or button on page.";
  }
}*/

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
  });
}*/