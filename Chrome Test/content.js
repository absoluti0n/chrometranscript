var isAltDown = false;
var rectangleDiv = null;
var tesseractisdone = false;

document.addEventListener("mousedown", function(event) {
      if (event.altKey) {
        isAltDown = true;
        var startX = event.clientX;
        var startY = event.clientY;
        var endX, endY;

        rectangleDiv = document.createElement("div");
        rectangleDiv.style.position = "absolute";
        rectangleDiv.style.backgroundColor = "blue";
        rectangleDiv.style.opacity = "0.2";
        rectangleDiv.style.border = "1px solid blue";
        document.body.appendChild(rectangleDiv);

        document.addEventListener("keyup", function(event) {
          if (event.altKey) {
            isAltDown = false;
          }
          if (document.body.contains(rectangleDiv)) {
            document.body.removeChild(rectangleDiv);
          }
        });

        document.addEventListener("mousemove", function mouseMoveListener(event) {
          if (!isAltDown) {
            return;
          }
          endX = event.clientX;
          endY = event.clientY;
          var top = Math.min(startY, endY);
          var left = Math.min(startX, endX);
          var height = Math.abs(endY - startY);
          var width = Math.abs(endX - startX);
          rectangleDiv.style.top = `${top + window.scrollY}px`;
          rectangleDiv.style.left = `${left}px`;
          rectangleDiv.style.height = `${height}px`;
          rectangleDiv.style.width = `${width}px`;
        });

        document.addEventListener("mouseup", function mouseUpListener(event) {
          if (document.body.contains(rectangleDiv)) {
            document.body.removeChild(rectangleDiv);
          }
          if (!isAltDown) {
            return;
          }
          if (!event.altKey) {
            return;
          }
          isAltDown = false;
          endX = event.clientX;
          endY = event.clientY;
          var top = Math.min(startY, endY);
          var left = Math.min(startX, endX);
          var height = Math.abs(endY - startY);
          var width = Math.abs(endX - startX);
          console.log("top:", top, "left:", left, "height:", height, "width:", width);

          const image = new Image()

          chrome.runtime.sendMessage({
            action: "capture",
            top: top,
            left: left,
            height: height,
            width: width,
            image: image
          }, function(response) {
            if (!response || !response.screenshot) {
              console.error("Error capturing screenshot.");
              return;
            }
            // Handle the response from background.js, for example, by setting the source of an image element to the screenshot data
            image.src = response.screenshot;
            //console.log(image.src);
            });          

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          image.onload = function() {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, left, top, width, height, 0, 0, width, height);
            yo = canvas.toDataURL()

            console.log('%c ','font-size: 300px; background: url(' + canvas.toDataURL() + ') no-repeat;');

            /*var link = document.createElement('a');
            link.download = 'test.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);*/
          };

		var textToSearch = "";
		
        Tesseract.recognize(canvas,'eng',{ logger: m => console.log(m) })
			.then(({ data: { text } }) => {
				console.log(text)
				textToSearch = text;
				tesseractisdone = true;
			})
						
          /*Tesseract.recognize(canvas)
            .then(function(result) {
              textToSearch = result.text;
			  console.log(textToSearch);
            })
            .catch(function(error) {
              console.error(error);
			  return;
            });*/

/*		chrome.runtime.sendMessage({action: "getTabId"}, function(response) {
		  console.log("Tab ID: " + response.tabId);
		  
		  if (response.tabId === undefined || response.tabId === "no") {
			  //create tab and open DG on the search page
		  }
		  
		  //chrome.runtime.sendMessage({action: "DGSearch", msg: textToSearch}, function() {
			searchPage(response.tabId, textToSearch);  
			  
		  //});
		});	*/
		
		try {
		  chrome.runtime.sendMessage({action: "getTabId"}, function(response) {
			console.log("Tab ID: " + response.tabId);
			
			if (response.tabId === undefined || response.tabId === "no") {
			  //create tab and open DG on the search page
			} else {
				console.log("yahou");
			}
			
		var startTime = Date.now();

		function checkVariable() {
		  if (tesseractisdone) {
			console.log("Variable is now true");
						
			/*chrome.runtime.sendMessage({action: "search", msg: textToSearch, tabId: response.tabId}, function(response) {
				console.log("alleluia");
			});*/
			
			/*searchInput = document.querySelector("input[name='searchTerm']");
			searchButton = document.querySelector("input[type='submit']");
			
			//var searchBar = document.querySelector('input[type="searchTerm"]');
			//var searchBar = document.querySelector(".mat-input-element mat-form-field-autofill-control no-filters ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored");	
 
			// Check if both elements are found
			if (searchInput && searchButton) {
			// Input the search term in the input element
			console.log("on a trouvé searchinput & searchbutton");
			searchInput.value = textToSearch;

			// Click the search button
			searchButton.click();

			return "Search performed for: " + textToSearch;
			} else {
			return "Error: Could not find search input or button on page.";
			}		*/	
			
			chrome.runtime.onMessage.addListener(
			  function(request, sender, sendResponse) {
				console.log(request.greeting);
				sendResponse({ farewell: "Goodbye from content script" });
			  });
			
			return;
		  }
		  
		  if (Date.now() - startTime > 5000) {
			console.error("Timed out waiting for variable to be true");
			return;
		  }
		  
		  setTimeout(checkVariable, 100);
		}

		checkVariable();
		

		  });
		} catch (e) {
		  console.error(e);
		}

		if (chrome.runtime.lastError) {
		  console.error("Error sending message: " + chrome.runtime.lastError.message);
		}		
		
		//(if tab id = no then create tab go to DG and tab id = tab id, else) go directly to search

          document.removeEventListener("mouseup", mouseUpListener);
		  tesseractisdone = false;

          });
        };
});

/*
function searchPage(tabId, searchTerm) {
  var searchInput = document.querySelector("input[name='searchTerm']");
  var searchButton = document.querySelector("input[type='submit']");

  if (searchInput && searchButton) {
    searchInput.value = searchTerm;
    searchButton.click();
    return "Search performed for: " + searchTerm;
  } else {
    return "Error: Could not find search input or button on page.";
  }
};
*/

