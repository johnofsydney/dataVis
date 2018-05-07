console.log("connected");
// data visulaisation practice, using data from
// http://api.population.io:80/1.0/population/Australia/40/
// and inspired by Hans Rosling;
// https://www.youtube.com/watch?v=jbkSRLYSojo

let timer
let dataStream = []
let speedConstant = 500
let maxPop = 0
let minPop = 0
let numYears = 80
let volatile = 2000
let offset = 300
let country = "Australia"
let color = 50
let bgTotal = `rgb(0, ${color}, ${color})`
let bdTotal = "red solid 2px"



const getPopulation = (country) => {
  const BASE_URL = "http://api.population.io:80/1.0/population/"
  const POP_URL = BASE_URL + country + "/60/"
  $.getJSON( POP_URL ).then( addData ).then(plotData)
}

const addData = (results) => {
  let tempArr = []
  dataStream = results
  
  $.each(dataStream, function( index, value ) {
    tempArr.push(value.total)
  })
  maxPop = _.max(tempArr);
  minPop = _.min(tempArr);

  console.log(maxPop);
  console.log(minPop);
}

const plotData = () => {
  console.log(dataStream);
  let i = 0
  timer = setInterval( function () {
    plotSingleData(i)
    i ++
    if ( i > numYears ) {
      clearInterval(timer)
    }
  }, speedConstant)
}

const plotSingleData = (i) => {
  // i is to make this feel more like a loop rather than setInterval...
  let total = dataStream[i].total
  let women = dataStream[i].females
  let men = dataStream[i].males
  let year = dataStream[i].year
  x = (i + 1) * window.innerWidth / numYears // moves through time from left to right


  // 2166000 - russia - needs 1100 as divisor
  // china 2500 / Australia

  // 76467
  rTotal = total / 15000

  yTotal = window.innerHeight - ( total / (maxPop / volatile ) ) + (minPop / maxPop) + offset


  yWomen = window.innerHeight - ( women / 12000 ) + 100
  yMen = window.innerHeight - ( men / 12000 ) + 100



  rWomen = women / 15000
  rMen = men / 15000
  let bgWomen = "red"
  let bdWomen = "blue solid 2px"
  if (year > 2018 ) {
    bgWomen = "green"
    bdWomen = "yellow solid 2px"
  }
  let bgMen = "blue"
  let bdMen = "red solid 2px"
  if (year > 2018 ) {
    bgMen = "yellow"
    bdMen = "green solid 2px"
  }


  // const $Women = $('<div class="bubble"></div>').css({
  //   border: bdWomen,
  //   background: bgWomen,
  //   left: x,
  //   top: yWomen,
  //   width: rWomen,
  //   height: rWomen
  // }).appendTo($('body'));
  //
  // const $Men = $('<div class="bubble"></div>').css({
  //   border: bdMen,
  //   background: bgMen,
  //   left: x,
  //   top: yMen,
  //   width: rMen,
  //   height: rMen
  // }).appendTo($('body'));

  const $Total = $('<div class="bubble"></div>').css({
    background: bgTotal,
    border: bdTotal,
    left: x,
    top: yTotal,
    width: rTotal,
    height: rTotal
  }).appendTo($('body'));

  $('#year').html(`<h1>Population of 60 year olds in ${year}</h1>`)
  $('#born').html(`<h1>Born in: ${year - 60 }</h1>`)
  $('#twentyfive').html(`<h1>These folks were 25 in ${year - 35}</h1>`)


}



$(document).ready( () => {
  console.log("ready");



  $('#btnStart').on('click', function () {
    country = $('#country').val();
    volatile = +($('#volatile').val());
    offset = +($('#offset').val());
    console.log( country );
    getPopulation(country)
    color = color + 40
    bgTotal = `rgb(0, ${color}, ${color})`
  })



})
