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