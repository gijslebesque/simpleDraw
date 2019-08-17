window.onload = function() {
  //Setting up video
  const constraints = {
    video: true
  };
  //setting up access to camera
  const canvas = document.getElementById("draw");
  const drawingTool = new DrawingTool(canvas);

  const video = document.querySelector("video");

  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    //Make sure canvas and video have same dimensions;
    const height = "500";
    video.srcObject = stream;
    video.height = height;
    drawingTool.canvas.width = video.clientWidth;
    drawingTool.canvas.height = video.offsetHeight;
  });

  //Start drawing
  canvas.addEventListener("mousedown", function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    drawingTool.paint = true;
    drawingTool.clickHandler(mouseX, mouseY, false);
    drawingTool.redraw();
  });

  canvas.addEventListener("mousemove", function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if (drawingTool.paint) {
      drawingTool.clickHandler(mouseX, mouseY, true);
      drawingTool.redraw();
    }
  });

  canvas.addEventListener("mouseup", function(e) {
    drawingTool.paint = false;
  });
  canvas.addEventListener("mouseleave", function(e) {
    drawingTool.paint = false;
  });

  const buttons = document.getElementsByTagName("button");
  const buttonsArray = [...buttons];

  buttonsArray.forEach(button => {
    button.style.backgroundColor = button.innerHTML;
    button.addEventListener("click", function() {
      drawingTool.colour = this.innerHTML;
    });
  });
};
