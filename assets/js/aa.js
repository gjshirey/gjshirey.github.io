let button = document.getElementById('goButton')
let today = new Date()
let day = String(today.getDate()).padStart(2, '0')
let month = String(today.getMonth() + 1).padStart(2, '0')
let year = today.getFullYear();

button.addEventListener('click', () => {
    info = document.getElementById('zip').value;

    const getWeatherData = async () => {
      console.log("Processing.....")
      const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${info},us&appid=7cfdc4fe0d1fcfba2e0b3510a296aa86`)
      const data = await request.json();
      return data;
    }
    getWeatherData().then(weatherData => {
        let moon = getMoonPhase(year, month, day)
        let grade = getGrade(weatherData.main.pressure, moon,
            weatherData.weather[0].main, weatherData.main.humidity, Math.floor(((weatherData.main.temp - 273.15) * 1.8) + 32), weatherData.wind.speed)
            console.log(grade)
            document.getElementById('grade').innerHTML = `<h1>${grade}</h1>`
            document.getElementById('info').innerHTML = `
            <h3>${weatherData.weather[0].description}</h3>`
        })
    
})
















    
function getGrade(pressure, moon, weather, humidity, temp, wind) {
    let score = 0
  
    /* PRESSURE */
    if (pressure < 1010) {
      score = score + 3
    }
    else if (pressure > 1010 && pressure < 1018) {
      score = score + 1
    }
    else {
      score = score - 3
    }
  
    /* Moon */
    if (moon == "new-moon" || moon == "full-moon") {
      score = score + 3
    }
    else if (moon == 'quarter-moon' || moon == 'last-quarter-moon') {
      score = score + 1
    }
    else {
      score = -1
    }
  
    /*weather*/
    if (weather == "Rain") {
      score = score - 3
    }
    else if (weather == "Clear") {
      score = score + 2
    }
    else if (weather == "Clouds") {
      score = score + 2
    }
    else if (weather == "Thunderstorm") {
      score = score - 5
    }
  
    /* HUMIDITY */
    if (parseInt(humidity) >= 50) {
      score = score + 1
    }
    else {
      score = score - 1
    }
  
    /* TEMP */
    /* Little person preference here but ill give my subjective take */
    if (parseInt(temp) < 50) {
      score = score - 2
    }
    else if (parseInt(temp) > 50 && parseInt(temp) < 70) {
      score = score + 1
    }
    else {
      score = score + 2
    }
  
    /* */
    if (parseFloat(wind) < 5) {
      score = score + 2
    }
    else if (parseFloat(wind) > 5 && parseFloat(wind) < 10) {
      score = score + 1
    }
    else {
      score = score - 5
    }
  
  
    if (score >= 13) {
      return 'A++'
    }
    else if (score < 13 && score >= 8) {
      return 'A'
    }
    else if (score <= 7 && score >= 3) {
      return 'B'
    }
    else if (score <= 2 && score >= -2) {
      return 'C'
    }
    else if (score <= -3 && score >= -7) {
      return 'D'
    }
    else if (score <= -8 && score >= -14) {
      return 'F'
    }
    else { // Likely will never get here
      return "God Awful"
    }
  
  }
  
  
  
  
  
  //https://gist.github.com/endel/dfe6bb2fbe679781948c9
  //Cheers for the moonPhase Calculator
  function getMoonPhase(year, month, day) {
    let c = 0
    let e = 0
    let jd = 0
    let b = 0
  
    if (month < 3) {
      year--;
      month += 12;
    }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; //jd is total days elapsed
    jd /= 29.5305882; //divide by the moon cycle
    b = parseInt(jd); //int(jd) -> b, take integer part of jd
    jd -= b; //subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); //scale fraction from 0-8 and round
    if (b >= 8) {
      b = 0; //0 and 8 are the same so turn 8 into 0
    }
  
    switch (b) {
      case 0:
        //new
        return '<img class= "moon" src = "../assets/new-moon"><img></img>';
        break;
      case 1:
        return '<img class= "moon" src = "../assets/waxing-crescent-moon"><img></img>';
        break;
      case 2:
        return '<img class= "moon" src = "../assets/quarter-moon"><img></img>';
        break;
      case 3:
        return '<img class= "moon" src = "../assets/waxing-gibbous-moon"><img></img>';
        break;
      case 4:
        return '<img class= "moon" src = "../assets/full-moon"><img></img>';
        break;
      case 5:
        return '<img class= "moon" src = "../assets/waning-gibbous-moon"><img></img>';
        break;
      case 6:
        return '<img class= "moon" src = "../assets/last-quarter-moon.png"><img>';
        break;
      case 7:
        return '<img class= "moon" src = "../assets/waning-crescent-moon"><img>';
        break;
        return b;
    }
  }
  
  /*
  
    Wind Direction Calc
    This obviously isnt fully accurate
    no need due to not much difference in score
  */
  function windDirection(windD) {
    switch (true) {
      case windD >= 0 && windD < 33.75:
        return 'North';
        break;
      case windD > 33.75 && windD < 56.25:
        return 'North East';
        break;
      case windD > 56.25 && windD < 123.75:
        return 'East';
        break;
      case windD > 123.75 && windD < 168.75:
        return 'South East';
        break;
      case windD > 168.75 && windD < 213.75:
        return 'South';
        break;
      case windD > 213.75 && windD < 258.75:
        return 'South West';
        break;
      case windD > 258.75 && windD < 303.75:
        return 'West';
        break;
      case windD > 303.75 && windD <= 360:
        return 'North West';
        break;
  
        return 'Cant Get';
    }
  }