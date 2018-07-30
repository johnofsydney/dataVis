console.log("conected");

let timer
let dataStream = []
let speedConstant = 500
let maxPop = 0
let minPop = 0
let numYears = 70
let volatile = 2000
let offset = 300
let country = "Australia"
let color = 50
let bgTotal = `rgb(100, ${color}, ${color})`
let bdTotal = "red solid 2px"

const getPopulation = (country) => {
  const BASE_URL = "http://api.population.io:80/1.0/population/"
  const POP_URL = BASE_URL + country + "/60"
  $.getJSON(POP_URL).then( addData ).then(plotData);
}

const addData = ( results ) => {
  console.log(results);
  let tempArr = []
  dataStream = results

  $.each(dataStream, function (index, value) {
    tempArr.push(value.total)
  })

  maxPop = _.max(tempArr);
  minPop = _.min(tempArr);

  console.log(maxPop, minPop);
}

const plotData = () => {
  let i = 0
  timer = setInterval( function () {
    plotSingleData(i)
    i++
    if (i > numYears ) {
      clearInterval(timer)
    }
  }, speedConstant)
}

const plotSingleData = (i) => {
  let total = dataStream[i].total
  let year = dataStream[i].year
  x = (i + 1) * window.innerWidth / numYears

  rTotal = total / 15000

  yTotal = window.innerHeight - ( total / (maxPop / volatile ) ) + (minPop / maxPop) + offset

  const $Total = $('<div class="bubble"></div>').css({
    background: bgTotal,
    border: bdTotal,
    left: x,
    top: yTotal,
    width: rTotal,
    height: rTotal
  }).appendTo($('body'));

  $('#year').html(`<h1>Population of 60 year olds in ${year}</h1>`);
  $('#born').html(`<h1>Born in ${year - 60}</h1>`)
  $('#twentyfive').html(`<h1>These folks were 25 in ${year - 35}</h1>`)
}























$(document).ready( () => {
  console.log("ready");


  $('#btnStart').on('click', function () {
    country = $('#country').val()
    volatile = +($('#volatile').val())
    offset = +($('#offset').val())

    console.log(country, volatile, offset);

    getPopulation(country)

    bgTotal = `rgb(100, ${color}, ${color})`
    color = color + 40


  })

})
