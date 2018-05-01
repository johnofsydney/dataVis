console.log("connected");
// data visulaisation practice, using data from
// http://api.population.io:80/1.0/population/Russian%20Federation/40/
// and inspired by Hans Rosling;
// https://www.youtube.com/watch?v=jbkSRLYSojo

let timer
let dataStream = []
let speedConstant = 300



const getPopulation = () => {
  const BASE_URL = "http://api.population.io:80/1.0/population/Russian%20Federation/60/"
  $.getJSON( BASE_URL ).then( addData ).then(plotData)
}

const addData = (results) => {
  dataStream = results
}

const plotData = () => {

  let i = 0
  timer = setInterval( function () {
    plotSingleData(i)
    i ++
    if ( i > 80 ) {
      clearInterval(timer)
    }
  }, speedConstant)
}

const plotSingleData = (i) => {
  // i is to make this feel more like a loop rather than setInterval...
  let women = dataStream[i].females
  let men = dataStream[i].males
  let year = dataStream[i].year
  x = (i + 1) * window.innerWidth / 80 // moves through time from left to right
  yWomen = window.innerHeight - ( women / 1200 ) + 100
  yMen = window.innerHeight - ( men / 1200 ) + 100
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


  const $Women = $('<div class="bubble"></div>').css({
    border: bdWomen,
    background: bgWomen,
    left: x,
    top: yWomen,
    width: rWomen,
    height: rWomen
  }).appendTo($('body'));

  const $Men = $('<div class="bubble"></div>').css({
    border: bdMen,
    background: bgMen,
    left: x,
    top: yMen,
    width: rMen,
    height: rMen
  }).appendTo($('body'));

  $('#year').html(`<h1>Population of 60 year olds in ${year}</h1>`)
  $('#born').html(`<h1>Born in: ${year - 60 }</h1>`)
  $('#twentyfive').html(`<h1>These folks were 25 in ${year - 35}</h1>`)


}



$(document).ready( () => {
  console.log("ready");

  getPopulation()


})
