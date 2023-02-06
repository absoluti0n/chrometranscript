var isAltDown = false;
var rectangleDiv = null;

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
      if (!event.altKey){
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

      /*var message = {
        action: "capture_screenshot",
        top: top,
        left: left,
        height: height,
        width: width
      };
      chrome.runtime.sendMessage(message, function(response) {
        console.log(response.screenshotUrl);
        window.alert(response.screenshotUrl);
      });*/

      var image = new Image();

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
        console.log("c bon");
        });

      /*(async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response);
      })();      */

      /*chrome.runtime.sendMessage({
        action: "capture",
        top: top,
        left: left,
        height: height,
        width: width
      }, function(response) {
        // Handle the response from background.js, for example, by setting the source of an image element to the screenshot data
        var image = new Image();
        image.src = response.screenshot;
        console.log(response.screenshot);
        });*/

      /*chrome.runtime.sendMessage({action: "capture"}, function(response) {
        console.log('on envoie');
        console.log(response.imgSrc);
      });*/

      document.removeEventListener("mouseup", mouseUpListener);
    });
  }
});
