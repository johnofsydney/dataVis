console.log("conected");

// This example has a lot of global variables.
// becuase the point is AJAX and data plotting, not eliminating global variables
let timer
let dataStream = []     // here where we save the data
let speedConstant = 200 // ms between drawing each bubble on the screen
let numYears = 70
let bgTotal             // random value assigned later
let bdTotal = "red solid 2px"


// the AJAX part of the code
// 1 - retreive the data
// 2 - then save it using addData()
// 3 - then plot it using plotData()
const getPopulation = (country) => {
  // const BASE_URL = "http://api.population.io:80/1.0/population/"
  // THis line above doesn't work on gihub pages, so had to use funky cors-anywhere

  const BASE_URL = "https://cors-anywhere.herokuapp.com/http://api.population.io:80/1.0/population/"
  const POP_URL = BASE_URL + country + "/60"

  // becuase there is a reasonable delay (due to funky cors-anywhere) first hide the button to prevent it getting clicked again
  buttonHide()
  $('#countries').hide()


//   $.getJSON("example.json", function() {
//   alert("success");
// })
// .success(function() { alert("success 2"); })
// .error(function() { alert("error occurred "); })
// .complete(function() { alert("Done"); });





  $.getJSON(POP_URL).fail(errorMessage).then( addData ).then(plotData);
}

const errorMessage = () => {
  $('#year').html(`<h1>Error!</h1>`);
  $('#born').html(`<h3>probably country name is wrong</h3>`)
  $('#twentyfive').html(`<h3>Try again</h3>`)
  buttonShow()
}

const addData = ( results ) => {
  //first save the results into the global variable dataStream, just so it's easy for plotData
  dataStream = results
  // that's it. (there was more before, but I refactored it away)
}

const plotData = () => {
  //we can't use a standard loop here becuase we need to break out of it // blah blah // timer
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

  let first = dataStream[0].total
  let total = dataStream[i].total
  let year = dataStream[i].year

  let x = (i + 1) * window.innerWidth / numYears

  // rTotal gives the width / height of the div we will append to the screen
  // 15000 is a made up number suitable for converting millions of people to hundreds of pixels
  let rTotal = total / 15000

  // There was somew trial and error to get this more or less right.
  // yTotal will be the vertical centre of the bubble div we place on the screen (measured from top)
  // (total / first) * (window.innerHeight / 4) is the bit that varies (with total)
  // all countries will statrt at the same point as the first point total == first
  // after that total will increase relative to first (for all countries I've checked)
  let yTotal = 1 * window.innerHeight - ( (total / first) * (window.innerHeight / 4)  )



  // here where we make the div, assign it's properties and append to the body
  const $Total = $('<div class="bubble"></div>').css({
    background: bgTotal,
    border: bdTotal,
    left: x - (rTotal / 2),
    top: yTotal - (rTotal / 2),
    width: rTotal,
    height: rTotal
  }).appendTo($('body'));

  $('#year').html(`<h1>Population of 60 year olds in ${year}</h1>`);
  $('#born').html(`<h1>Born in ${year - 60}</h1>`)
  $('#twentyfive').html(`<h1>These folks were 25 in ${year - 35}</h1>`)


  if (year == (1916 + 60) ) {
    $('.wwi').css({
      display: "block",
      left: x
    })
    $('.wwi.info').css({
      left: (x - 340)
    })
  }

  if (year == (1933 + 60) ) {
    $('.nineteen30').css({
      display: "block",
      left: x
    });
    $('.nineteen30.info').css({
      left: (x - 340)
    });
  }

  if (year == (1955 + 60) ) {
    $('.nineteen50').css({
      display: "block",
      left: x
    });
    $('.nineteen50.info').css({
      left: (x - 340)
    });
  }

  if (i >= numYears) {
    $('#updating').fadeOut(5000);

    let country = $('#country').val()
    const $country = $(`<h3>${country}</h3>`).css({
      color: bgTotal
    }).appendTo($('#list'));
    buttonShow()
    $('#countries').show(8000)
  }


}

// generate a random number 0 - 255
const getRandomColor = () => {
  let color = Math.random(1) * 255
  color = Math.floor(color)
  return color;
}

// these are in their own functions so I can use them inside the then() of the getPopulation
const buttonHide = () => {
  $('#btnStart').hide();
  $('#country').prop("disabled",true)
}
const buttonShow = () => {
  $('#btnStart').show();
  $('#country').prop("disabled",false)
}


$(document).ready( () => {
  console.log("ready");


  let oneHundred = 1 * window.innerHeight - ( (1 / 1) * (window.innerHeight / 4)  )
  let twoHundred = 1 * window.innerHeight - ( (2 / 1) * (window.innerHeight / 4)  )
  let threeHundred = 1 * window.innerHeight - ( (3 / 1) * (window.innerHeight / 4)  )
  let fourHundred = 1 * window.innerHeight - ( (4 / 1) * (window.innerHeight / 4)  )
  // 1t : 1 - 1/4
  // 2t: 1 - 2/4
  // 3t: 1 - 3/4

    $('#one').css({
      display: "block",
      top: oneHundred
    })
    $('#two').css({
      display: "block",
      top: twoHundred
    })
    $('#three').css({
      display: "block",
      top: threeHundred
    })






  $('#btnStart').on('click', function () {
    $('#intro').hide()
    $('#updating').show()
    let country = $('#country').val()

    getPopulation(country)

    // becuase this code runs asynchronously, the code below will run before the
    // AJAX .then() promise is complete. Hence the bgTotal variable will get randomised
    // below before the color is assigned to the div
    let r = getRandomColor()
    let g = getRandomColor()
    let b = getRandomColor()

    bgTotal = `rgb(${r}, ${g}, ${b})`;


  })

})
