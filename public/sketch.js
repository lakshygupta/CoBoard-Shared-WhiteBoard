var socket;
var brushColor;
var clearAll = false;
function setup() {
  createCanvas(windowWidth, 1900);
  background(51);
  strokeWeight(4);
  brushColor = color(255);
  img = loadImage('./images/CORSS.png');
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  const port = 3000 || process.env.PORT;
  socket = io.connect('https://coboard.herokuapp.com/');
  // socket = io.connect('http://coboard.herokuapp.com');

//   print(io.sockets.server.engine.clientsCount);
    
    MyName = createInput('Lakshy Gupta'); 
    MyName.position(50, 0);
    MyName.style('width', '95px'); 
    MyName.style('font-size', '15px'); 
    MyName.style('margin-left', '0px');
    MyName.style('background-color', 'transparent'); 
    MyName.style('border-color', 'transparent');
    MyName.style('color', 'white'); 
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    
    function(data) {
      console.log("Got: " + data.x + " " + data.y+" "+data.bcol+ " " + data.cAll);
      // Draw a blue circle
    //   fill(0,0,255);
    //   noStroke();
    stroke(data.bcol);
    if(data.cAll){
        background(51);
        clearAll = false;
        data.cAll = false;
    }

    //   ellipse(data.x, data.y, 20, 20);
    line(data.x, data.y, data.m, data.n);
    }
  );
  socket.on('recieve', data => {
      console.log(data);
      input_val.position(30, 80);  
    
    input_val.style('width', '250px'); 
     
    input_val.style('font-size', '20px'); 
    
    input_val.style('margin-left', '50px');
    input_val = createInput(data);
})
}

function draw() {
  // Nothing
//   stroke(255);
//   if (mouseIsPressed === true) {
//     line(mouseX, mouseY, pmouseX, pmouseY);
//   }
    print(MyName.value());


    if (mouseIsPressed) {
        if (mouseX <= 50) {
          if (mouseY <= 50) {
            brushColor = color(0, 0, 255);
          } else if (mouseY <= 100) {
            brushColor = color(66, 244, 194);
          } else if (mouseY <= 150) {
            brushColor = color(255, 0, 199);
          } else if (mouseY <= 200) {
            brushColor = color(249, 99, 0);
          } else if (mouseY <= 250) {
            brushColor = color(255, 22, 26);
          } else if (mouseY <= 300) {
            brushColor = color(242, 255, 0);
          } else if (mouseY <= 350) {
            brushColor = color(0, 137, 9);
          }
          else if(mouseY <= 400){
            background(51);
            clearAll = true;
            sendmouse(0,0,0, 0, brushColor, clearAll);
          }
        }
        console.log("dragged:"+ mouseY+" "+mouseX + " " + clearAll);
      }

    stroke(color(0));
  fill(0, 0, 255);
  rect(0, 0, 50, 50);
  fill(66, 244, 194);
  rect(0, 50, 50, 50);
  fill(255, 0, 199);
  rect(0, 100, 50, 50);
  fill(249, 99, 0);
  rect(0, 150, 50, 50)
  fill(255, 22, 26);
  rect(0, 200, 50, 50);
  fill(242, 255, 0);
  rect(0, 250, 50, 50);
  fill(0, 137, 9);
  rect(0, 300, 50, 50);

//   rect(0, 350, 50, 50);
  image(img, 0, 350, img.width /17, img.height / 11);
  
}

function mousePressed(){
    // sendmouse(0,0,0, 0, brushColor, clearAll);
    // clearAll = false;
    print(input_val.value()); 

}

function mouseDragged() {
  // Draw some white circles
//   fill(255);
//   noStroke();
//   stroke(255);
stroke(brushColor)

//   ellipse(mouseX,mouseY,20,20);
    line(mouseX, mouseY, pmouseX, pmouseY);

//   // Send the mouse coordinates
// console.log(clearAll);

sendmouse(mouseX,mouseY,pmouseX, pmouseY, brushColor, false);
// clearAll = false;
}

// Function for sending to the socket
function sendmouse(xpos, ypos, mpos,npos, bcolor, cAll) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos+" "+bcolor+" "+cAll);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    m: mpos,
    n: npos,
    bcol: `${bcolor}`,
    cAll:cAll
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}