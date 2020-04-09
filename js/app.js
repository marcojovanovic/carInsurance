// dobijes pripremljen html i css jer ima puno posla +
// uradi prvo opcije, last 20 years od 2020 nadole +
// obezbediti na submit forme da imam i make i year sve vrednosti da dalje radim +
// obezbediti vrednosti za level +
// ako je sve prazno dodati poruku alert +
// proslediti sve podatke u prototipove za racunanje +
// base = 2000, american 1.15, asian 1.05, euroepan 1.35, svake godine osigurnje jeftinije 3%+
// basic increse for 30%, complete for 50% +
// kod racuanja za year, koliko je vozilo tacno staro +
// calculate insurance +
// prikazi na strani +


//bonus
// ukloni da se rezultati pakuju jedan na drugi
// loading +
 

const form = document.querySelector('#request-quote')
const make = document.querySelector('#make')
const loading = document.querySelector('#loading img')
const yearContainer = document.querySelector('#year')
const levels = document.querySelectorAll('.form-check-input')
const result = document.querySelector('#result')

const ui = new UI()
const insurance = new Insurance()


document.addEventListener('DOMContentLoaded', () => {

  ui.fillYears()

})


form.addEventListener('submit', (e) => {

  e.preventDefault()


  let base = 2000
  let price

  if (make.value === '' || yearContainer.value === '' || levels.value === '') {

    alert('popuni polja')

  } else {

    insurance.make = make.value
    insurance.year = parseInt(yearContainer.value)

    let discont = price / (price / 100) * 3

    levels.forEach(level => {

      if (level.checked === true) {
        insurance.level = level.value
      }

    })

   


    insurance.calculateQuote(insurance)

  }

})


function UI() {}

function Insurance(make, year, level) {
  this.make = make
  this.year = year
  this.level = level

}


Insurance.prototype.calculateQuote = function (insurance) {

  let price
  let base = 2000

  // for make

  if (insurance.make === '1') {

    price = base * 1.05

  }
  if (insurance.make === '2') {

    price = base * 1.15

  }
  if (insurance.make === '3') {

    price = base * 1.25

  }

  // for year 

  let difference = new Date().getFullYear() - insurance.year

  price = price - ((difference * 3) * price) / 100;


  // for level

  if (insurance.level === 'basic') {

    price = price + ((price / 100) * 30)

  }
  if (insurance.level === 'complete') {

    price = price + ((price / 100) * 50)

  }

  ui.displayResult(price)

  return price

}

UI.prototype.fillYears = function () {

  let currentYear = new Date().getFullYear()
  let minYear = currentYear - 20

  let min = currentYear - minYear

  //console.log(min)


  for (let i = currentYear; i >= minYear; i--) {

    let option = document.createElement('option')
    option.value = i
    option.innerHTML += i
    yearContainer.appendChild(option)
  }


}

UI.prototype.displayResult = function (price) {

     let makeValue;
     const level = document.querySelector('.form-check-input:checked').value

      if(make.value === '1'){

        
          makeValue = 'American'
      }
      if(make.value === '2'){

          makeValue = 'Asian'
      }
      if(make.value === '3'){

          makeValue = 'European'
      }
     


  loading.style.display = 'block'
  


  setTimeout(() => {

    loading.style.display = 'none'

   let div = document.createElement('div')

  div.innerHTML = ` 
          <h2 class='header'>Summary:</h2>
          <p>Make: ${makeValue}</p>
          <p>Level: ${level}</p>
          <p>Total:$${price}</p>
    
    `

  result.appendChild(div)

  if(result.children.length > 1){

    result.children[0].remove()
 }
  

  }, 2000)



  

}