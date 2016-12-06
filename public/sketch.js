
//Connectivity
var sb,
app_name = "Data_Vis_Controller";



//Sliders!
var slider;
var slider2;

//DIV Elements
var sliderDiv;
var sliderDiv2;
var linearSliderDiv;

var sliderRad;
var sliderRad2;
// var sliderRad2  = 300;
// var sliderRad3 = 370;

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

  linearSliderDiv = createDiv("");
  linearSliderDiv.id("linearSlider");
  //linearSliderDiv.class("lslider");
  linearSliderDiv.position(windowWidth / 2, windowHeight -20);


//linearSlider.position(windowWidth/2, windowHeight-50);



  // create clear button
  centralButton = createButton(' ');
  centralButton.position(windowWidth/2-25, windowHeight/2-25);
  centralButton.touchEnded(resetGraph);
  centralButton.class('round');

  //Text Input
  input = createInput();
  input.position(windowWidth/2 -150, 10);
  input.class('black');
  input.value('...');
  input.style('width', '300px');
  input.style('z-index', '8');
  input.style('text-align', 'center');



  linSlider = createSlider(0, 100, 50, 10);
  linSlider.style('width', '200px');
  linSlider.style('z-index', '9');

  linSlider.position(windowWidth/2-100, windowHeight-20);
  linSlider.class('linSlider');




  //Setup our Connectivity
   sb = new Spacebrew.Client("192.168.5.198", app_name, "Remote controls for data visualization", {reconnect: true} );

    // add publishers and subscribers
    sb.addPublish("slider1", "range", "0" );
    sb.addPublish("slider2", "range", "0" );
    sb.addPublish("centralButton", "boolean", "false" );
    sb.addPublish("linearSlider", "range", "0" );


    sb.addSubscribe("backgroundColor", "range" );

    // listen to events
    // note: different than above, we can just write the
    // function here!
    sb.onRangeMessage = function( name, value ){
        // change the bg color based on the range!
        document.body.style.backgroundColor = "rgb(" + value +"," + value +"," + value + ")"
    }

    // send range based on mouse X

    document.body.onmousemove = function( e ){

    }

    // connect
    sb.connect();


}

function draw() {
  // Nothing
  background(0);
  //sb.send("buttonPress", "boolean", "true");

}

function mouseDragged() {
  // Draw some white circles
  // fill(255);
  // noStroke();
  // ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
// sb
}

function mousePressed() {
 //  sb.send("button_Press", "boolean", "true");
 // console.log("Send");

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


}


//Slider Callbacks


function onValueChange1(e){

  //console.log(e);
//  var array = e.value.split(',');
  var preValue = e.preValue;
  var value = e.value;

  sb.send( "slider1", "range", String(value));
  // console.log();

  //console.log(value);

//  console.log("max = " + max + " min = " + min);




}
function onValueChange2(e){


//  var array = e.value.split(',');
var preValue = e.preValue;
var value = e.value;
//console.log(value);
sb.send( "slider2", "range", String(value));



//  console.log("max = " + max + " min = " + min);


}

function resetGraph(){
console.log("Touched");
sb.send("centralButton", "boolean", "true");

}
