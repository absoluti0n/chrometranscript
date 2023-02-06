/*var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@v2.0.0-beta.2/dist/tesseract.min.js";
document.head.appendChild(script);*/

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

          /*chrome.tabs.captureVisibleTab({format: "png"}, function(screenshotUrl) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            const image = new Image();
            image.src = screenshotUrl;

            image.onload = function() {
              canvas.width = width;
              canvas.height = height;
              context.drawImage(image, left, top, width, height, 0, 0, width, height);
              yo = canvas.toDataURL()
            };*/
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
          var yo;

          image.onload = function() {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, left, top, width, height, 0, 0, width, height);
            yo = canvas.toDataURL()
            console.log(yo);

            console.log('%c ','font-size: 300px; background: url(' + canvas.toDataURL() + ') no-repeat;');

            /*var link = document.createElement('a');
            link.download = 'test.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);*/
          };

          //console.log(yo);


          //var image2 = new Image();
          //image2.src = yo;

          /*Tesseract.recognize(
            'https://tesseract.projectnaptha.com/img/eng_bw.png',
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
          });*/

          Tesseract.recognize(
            canvas,
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
          });

          /*chrome.runtime.sendMessage({
              action: "translate",
              image2: canvas
            }, function(response) {
              console.log('yeayeayea');
              });*/
/*
          Tesseract.recognize(image)
            .then(function(result) {
              console.log(result.text);
            })
            .catch(function(error) {
              console.error(error);
            });*/


          /*var image2 = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
          window.location.href=image2; // it will save locally*/

          document.removeEventListener("mouseup", mouseUpListener);

          });
        };
});