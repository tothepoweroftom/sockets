// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;


//Sliders!
var slider;
var slider2;

//DIV Elements
var sliderDiv;
var sliderDiv2;

var sliderRad;
var sliderRad2;
// var sliderRad2  = 300;
// var sliderRad3 = 370;

var linearSliderDiv;
var margin = 30;
var orbitWidth = 12;

//Central button
var centralButton;

//Text input
var input

//Linear slider
var linSlider;
var linearSlider;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);

  sliderRad = displayWidth/2-80;
  sliderRad2 = displayWidth/2-10;

  //CREATE Sliders
  //SLIDER DIV 1
  sliderDiv = createDiv("");
  sliderDiv.id("slider");
  sliderDiv.class("rslider");
  sliderDiv.position(windowWidth / 2 - sliderRad, windowHeight / 2 - sliderRad);

  slider = $('#slider').roundSlider({
  radius: sliderRad,
  width: 0,
  //sliderType: "range",
  max: "360",
  handleSize: "+20",

  value: "0,180",
  showTooltip: "false",

  change: "onValueChange1"
  });



  //SLIDER DIV 2
  sliderDiv2 = createDiv("");
  sliderDiv2.id("slider2");
  sliderDiv2.class("rslider");
  sliderDiv2.position(windowWidth / 2 - sliderRad2, windowHeight / 2 - sliderRad2);

  slider2 = $('#slider2').roundSlider({
    radius: sliderRad2,
    width: 0,
    //sliderType: "range",
    max: "362",
    handleSize: "+30",
    //startAngle: "90",
    value: "180, 270",
    showTooltip: "false",
    change: "onValueChange2"
  });



//linearSlider.position(windowWidth/2, windowHeight-50);



  // create clear button
  centralButton = createButton(' ');
  centralButton.position(windowWidth/2-25, windowHeight/2-25);
  centralButton.touchEnded(resetGraph);
  centralButton.class('round');

  //Text Input
  input = createInput();
  input.position(windowWidth/2 -50, 10);
  input.class('black');
  input.value('Filter');
  input.style('width', '100px');
  input.style('z-index', '8');


  linSlider = createSlider(0, 100, 50, 10);
  linSlider.style('width', '200px');

  linSlider.position(windowWidth/2-100, windowHeight-20);
  linSlider.class('linSlider');


  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  // Nothing
  background(0);
}

function mouseDragged() {
  // Draw some white circles
  // fill(255);
  // noStroke();
  // ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}


//Slider Callbacks


function onValueChange1(e){

  //console.log(e);
//  var array = e.value.split(',');
  var preValue = e.preValue;
  var value = e.value;
  socket.emit('slider', value);

  //console.log(value);

//  console.log("max = " + max + " min = " + min);




}
function onValueChange2(e){


//  var array = e.value.split(',');
var preValue = e.preValue;
var value = e.value;
socket.emit('slider2', value);
//console.log(value);



//  console.log("max = " + max + " min = " + min);


}

function resetGraph(){
console.log("Touched");

}
