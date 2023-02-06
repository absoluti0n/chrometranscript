/*document.addEventListener("mousedown", function(event) {
  if (event.altKey) {
    /*var selection = document.getSelection();
      if (selection.rangeCount) {*/
      /*var rect = document.getSelection().getRangeAt(0).getBoundingClientRect();
      var message = {
        action: "capture_screenshot",
        top: rect.top,
        left: rect.left,
        height: rect.height,
        width: rect.width
      };
      chrome.runtime.sendMessage(message, function(response) {
        console.log(response.screenshotUrl);
        window.alert(response.screenshotUrl);
      });
        window.alert('yo');
         window.alert("yo");
    //}
  }
});*/

var isAltDown = false;
document.addEventListener("mousedown", function(event) {
  if (event.altKey) {
    isAltDown = true;
    var startX = event.clientX;
    var startY = event.clientY;
    var endX, endY;
    document.addEventListener("keyup", function(event) {
      /*if (event.altKey) {
        document.removeEventListener("mouseup", mouseUpListener);
        return;
      }*/
      isAltDown = false;
    });
    document.addEventListener("mouseup", function mouseUpListener(event) {
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
      //document.removeEventListener("mouseup", mouseUpListener);
    });
  }
});
document.addEventListener("keyup", function(event) {
  if (event.altKey) {
    isAltDown = false;
  }
});