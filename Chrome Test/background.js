/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == "capture_screenshot") {
    const { top, left, height, width } = request;

    chrome.tabs.captureVisibleTab({ format: "png" }, function(screenshotUrl) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
 
      const image = new Image();
      image.src = screenshotUrl;

      image.onload = function() {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, left, top, width, height, 0, 0, width, height);
        sendResponse({
          screenshotUrl: canvas.toDataURL()
        });
      };
    });
  }
  return true;
});

/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture_screenshot") {
    const { top, left, height, width } = request;
    console.log("yo");
    sendResponse({
      screenshotUrl: "yo"
    });
  }
});*/
//import * as module from './module/tesseract.min.js';
//import * as module2 from './module/worker.min.js';
//import { createWorker } from './module/tesseract.min.js';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "capture") {

      chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
        console.log("ça marche");
        var image = request.image;
        image.src = dataUrl;
        /*var canvas = document.createElement("canvas");
        canvas.width = request.width;
        canvas.height = request.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, request.left, request.top, request.width, request.height, 0, 0, request.width, request.height);
        sendResponse({screenshot: canvas.toDataURL("image/png")});*/
        sendResponse({screenshot: dataUrl})
      });
    return true;  
    }
});

/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "translate") {
        console.log('tesseract à toi de jouer');
        var image2 = request.image2;

          Tesseract.recognize(image2)
            .then(function(result) {
              console.log(result.text);
              sendResponse({translation: result})
            })
            .catch(function(error) {
              console.error(error);
            });


    return true;  
    }

}

);*/


/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "capture")
      sendResponse({success: "reussi"});
  }
);*/

/*chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(request)
        chrome.tabs.captureVisibleTab(
            null,
            {},
            function(dataUrl)
            {
                sendResponse({imgSrc:dataUrl});
            }
        );

        return true;
    }
);*/