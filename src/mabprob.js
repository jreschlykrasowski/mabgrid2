/*
sources:
button positioning- https://www.w3schools.com/howto/howto_css_center_button.asp
drop down menu: https://www.w3schools.com/howto/howto_js_dropdown.asp
https://stackoverflow.com/questions/33932395/what-event-handler-do-i-need-to-use-for-a-drop-down-menu-list-in-javascript
scatter plot stuff: https://www.d3-graph-gallery.com/graph/scatter_basic.html
 */

function runARStep() {
    if(activeSet.length > 1)
    {
        timeslot += 1;
        presetA = activeSet[activeIndex];
        do {
            randomIndex = rand(rand(noPresets));
            presetB = presets[randomIndex];
            console.log('Random Index:', randomIndex);
        } while (presetA === presetB);
        winnerPreset = get_choice(presetA, presetB, probData);
        // debug statements
        console.log('PresetA:', presetA);
        console.log('PresetB:', presetB);
        console.log('Winning preset:', winnerPreset);
        if(winnerPreset === presetA){
            numWins[presetA-1] += 1;
        }
        totalDuels[presetA-1] += 1;
        var val = (numWins[presetA-1]*1.0/totalDuels[presetA-1])
        bScore[presetA-1] = val;
        cb = Math.sqrt(Math.log(noPresets / 3 * (Math.log(t + 1) + 1) / delta) / (1 + t))
        val = (bScore[presetA-1] + cb)
        uConf[presetA-1] = val;
        val = (bScore[presetA-1] - cb)
        lConf[presetA-1] = val;
        activeIndex += 1;
        // debug statements
        console.log('bScore:', bScore);
        console.log('uConf:', uConf);
        console.log('lConf:', lConf);
        if(activeIndex === activeSet.length){
            activeIndex = 0;
            eliminationStep();
        }
        console.log('Timeslot:', timeslot);
        //updateDisplay();
    }
}
// performs elimination steps
function eliminationStep(){
    console.log('In elimination step.');
    t += 1;
    max_ind = max_arr(bScore);
    console.log('Max index:', max_ind);
    var ind_to_remove = [];
    // trying to recover top 1 from the rest of all
    for(var i=0; i<activeSet.length;i++){
        if(lConf[max_ind] > uConf[activeSet[i]-1]){
            ind_to_remove.push(i);
        }
    }
    console.log('Active set is:', activeSet);
    console.log('Indices to remove:', ind_to_remove);
    for(var i=ind_to_remove.length; i > 0; i--){
        console.log('Removed:', activeSet[ind_to_remove[i-1]]);
        activeSet.splice(ind_to_remove[i-1], 1);
    }
    console.log('Active set is:', activeSet);
}
// select random index
function rand(max) {
    var offset = 0;
    var min = 0;
    var range = (max - min) + 1;
    var randomNumber = Math.floor( Math.random() * range) + offset;
    return randomNumber;
}
// select random number
function random_number() {
    return Math.random();
}
// get preset choice
function get_choice(presetA, presetB, probData){
    if(random_number() < probData[(presetA-1)*15+(presetB-1)])
    {
        return presetA;
    } else {
        return presetB;
    }
}
// Shuffle the array
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}
// function reset
function resetSimulation(){
    for(var i=0; i<presets.length;i++){
        presets[i] = i+1;
        activeSet[i] = i+1;
        bScore[i] = 0;
        uConf[i] = 0;
        lConf[i] = 0;
        numWins[i] = 0;
        totalDuels[i] = 0;
        timeslot = 0;
        t = 1;
        activeIndex = 0;
    }
}
// maximum index
function max_arr(array) {
    return array.indexOf(Math.max.apply(null, array));
}
// update the webpage display
function updateDisplay(){
    document.getElementById('bScoreArr').innerHTML=bScore;
    document.getElementById('uConfArr').innerHTML=uConf;
    document.getElementById('lConfArr').innerHTML=lConf;
}
// init part
// We initialize, no of presets, preset list, borda score and upper conf and lower conf
var noPresets = 15;
var presets = new Array(noPresets);
var bScore = new Array(noPresets);
var uConf = new Array(noPresets);
var lConf = new Array(noPresets);
var numWins = new Array(noPresets);
var totalDuels = new Array(noPresets);
var activeSet = new Array(noPresets);
var timeslot = 0;
var t = 1;
var activeIndex = 0;
var delta = 0.1;
var presetA = -1;
var presetB = -1;
var winnerPreset = -1;
// We hardcode the subject's preference data ~ taken from csv file provided.
var probData = [0,0.5,1,0.5,0.75,0.75,0.75,0.5,0.75,0.5,1,0.5,0.25,0,0.25,0.5,0,0.75,0.75,1,0.5,0.5,0.25,1,0.75,0.75,0,0.25,0,0.5,0,0.25,0,0.25,0.5,0.25,0.25,0.25,0.5,0.5,0,0.25,0.25,0,0.5,0.5,0.25,0.75,0,1,0,0.75,0.25,0.5,0.5,0.5,0.25,0,0,0.5,0.25,0,0.5,0,0,0.5,0.25,0,0.5,0.25,0,0,0,0,0.25,0.25,0.5,0.75,1,0.5,0,0,0.25,0.5,0.5,0.75,0.25,0.25,0,0,0.25,0.5,0.75,0.25,0.75,1,0,0.25,0.5,0.5,0,0.5,0.25,0,0.5,0.5,0.75,0.75,0.75,1,0.75,0.75,0,0.75,1,0.75,0.75,0.5,0,0.25,0.25,0,0.5,0.5,0.5,0.5,0.5,0.25,0,0.5,0.25,0.25,0,0,0,0.5,0.25,0.5,0.5,0.75,0.5,0.5,0,0.5,0,0,0,0.25,0,0.5,0,0.25,1,0.5,1,0.25,1,0.25,0.75,1,0,0.5,0.5,0,0.5,0.5,1,0.75,0.75,1,0.75,0.5,0.25,0.75,1,0.5,0,0.25,0,0.25,0.75,0.75,0.75,1,1,0.75,0.75,0.5,1,0.75,0.5,0.75,0,0,0.75,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0.75,0.5,0.5,0.5,0.75,1,0.5,0.75,1,0.5,0.5,0.75,0.25,0,0]
// init
resetSimulation();
shuffleArray(activeSet);

let menuChoice = 1; //this will indicate which arm of the MAB to graph
function selectArm() {
    let menuChoiceStr = document.getElementById("mabMenu").value;
    menuChoice = parseInt(menuChoiceStr);
    resetGraph();
}

let xAxisMax = 50; //this is the maximum value on the x axis, it will increase
//when buttons are pressed

//graph margins
let margin = {top: 10, right: 10, bottom: 60, left: 60},
    width = 200,
    height = 200;


let stepsCount = 0; //counts how many iterations have happened per graph

let svg = d3.select("#graph1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 10)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append('line') //line that will mark the current value over time
    .style("stroke", "lightgreen")
    .style("stroke-width", 5)
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", width)
    .attr("y2", height);

// Y axis
let y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0])
svg.append("g")
    .call(d3.axisLeft(y))

// Add X axis
let x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

makeGraph();
function makeGraph() { //makes resetting things easier
    //add the y axis and x axis again
    y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0])
    svg.append("g")
        .call(d3.axisLeft(y))

    x = d3.scaleLinear()
        .domain([0, 50])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

//y axis label, left of chart
    svg.append("text")
        .attr("class", "axislabel")
        .style("font-size", "16")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left - 100)
        .attr("x", margin.top - height/2)
        .text("Probability")

//x axis label, bottom of chart
    svg.append("text")
        .attr("class", "axislabel")
        .style("font-size", "16")
        .attr("text-anchor", "end")
        .attr("y", height + 30)
        .attr("x", width / 2 + 60)
        .text("Number of Simulations")
}


//let bScoreArms = [0]; //this will be the dataset for arm 1 bordascore, more will be added as steps run
//making an array containing all 15 arms borda scores, instead of just one
//initializing to 15 columns containing just zero
let bScoreData = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]

function stepsIncremented() {  //this modifies the graph x axes appropriately for how many steps were added
    //and updates the borda score by however many steps were added (stepsIncreased)
    svg.selectAll("circle")
        .remove()
    svg.selectAll('line')
        .remove()

    for (let i = 0; i < stepsIncreased; i++) {
        runARStep(); //update borda score every simulation
        for (let j = 0; j < 14; j++) {
            bScoreData[j].push(bScore[j]);
        }
    }

    plotCur();

    svg.append("rect")
        .attr("class", "square")
        .style("fill", "#ffffff")
        .attr("x", 10)
        .attr("y", 360)
        .attr("height", 20)
        .attr("width", 400)
// Add X axis, now with expanded number of steps
    x = d3.scaleLinear()
        .domain([0, xAxisMax])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    svg //scatterplot because the line plot was not working
        .selectAll("dot")
        .data(bScoreData[menuChoice-1])
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return x(i);
        } )
        .attr("cy", function (d) {
            return y(d);
        } )
        .attr("r", 1.5)
        .style("fill", 'rgba(0,35,130,0.78)')

    svg.append("rect") //rectangle to cover up the sins on  the right side of the graph
        .attr("class", "square")
        .style("fill", "#ffffff")
        .attr("x", 375)
        .attr("y", 0)
        .attr("height", 600)
        .attr("width", 400)
}

let stepsIncreased = -1;
function nextSteps50 () { //basically just increases the range of x axis by 50
    stepsIncreased = 50;
    xAxisMax += stepsIncreased;
    stepsIncremented();
}

function nextSteps100 () { //increases the range of x axis by 100
    stepsIncreased = 100;
    xAxisMax += 100;
    stepsIncremented();
}

function resetGraph() {
    svg.selectAll("circle")
        .remove()

    svg.append("rect")
        .attr("class", "square")
        .style("fill", "#ffffff")
        .attr("x", 10)
        .attr("y", 360)
        .attr("height", 20)
        .attr("width", 400)

    stepsCount = 0;
    xAxisMax = 50; //reset x axis to be smaller again
    resetSimulation(); //reset all the values from the MAB simulation
    makeGraph();
}

function plotCur() {
    stepsCount = xAxisMax - 51; //total steps is equal to the xAxisMax - 50 since the x axis increments
    // and -1 again to account for size of array starting at 0
    //at each iteration and xAxisMax initial value = 50
    svg.append('line') //line that will mark the current value over time
        .style("stroke", "lightgreen")
        .style("stroke-width", 5)
        .attr("x1", 0)
        .attr("y1", y(bScoreData[menuChoice-1][stepsCount]))
        .attr("x2", width)
        .attr("y2", y(bScoreData[menuChoice-1][stepsCount]));
}


//these will increase the range of the x axis because the number of steps will be increased
let nextButton = document.getElementById("nextButton")
let nextButton100 = document.getElementById("nextButton100")
let reset = document.getElementById("resetButton")

nextButton.addEventListener("click", nextSteps50);

nextButton100.addEventListener("click", nextSteps100);

reset.addEventListener("click", resetGraph)
