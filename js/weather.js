function getCurrentWeather(data, zipCode) {
    console.log(data)
    // Exception Handling
    if (data.cod == "400" || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // reveal the hidden div
        weatherContent.style.display = 'block'
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit
    }

    // make a p element 
    let p = document.createElement('p')
    let date = new Date(data.dt * 1000)
    let dateStr = date.toLocaleDateString('en-us')
    let timeStr = date.toLocaleTimeString('en-us')

    // displays:
    // date
    // time
    // city
    // description
    // temperature
    // low temp
    // high temp
    // ground level
    // humidity
    // Feels like
    // Wind speed
    // Wind gust

    p.innerHTML = dateStr + ' - ' + timeStr + '<br>' + data.name + '<br>' + data.weather[0].description + '<br> Temperature: ' + data.main.temp + '<br> Low Temperature: ' + data.main.temp_min + '<br> High Temperature: ' + data.main.temp_max + '<br> Ground Level: ' + data.main.grnd_level + '<br> Humidity: ' + data.main.humidity + '<br> Feels Like: ' + data.main.feels_like + '<br> Wind Speed: ' + data.wind.speed + '<br> Wind Gust: ' + data.wind.gust// content for p
    weatherContent.append(p) // add the p to the weatherContent to the DOM

    const icon = document.createElement('img') // create img element for icon
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`) // set the src attribute using the data from the API
    icon.setAttribute('alt', `${data.weather[0].description}`)
    weatherContent.append(icon) // add the icon to the DOM
    weatherContent.style.display = 'block'
}

// weather Forecast Function 
// Copy what has already been done with the weather & you should be good to go

// description & temperature also add the icon
function getWeatherForecast(data, zipCode) {
    console.log(data)

    if (data.cod == "400" || data.cod == '404' || data.cod == '401' || zipCode.trim() == '') {
        // reveal the hidden div
        weatherContent.style.display = 'block'
        weatherContent.innerHTML = 'Please enter a valid Zip Code'
        return // exit
    }


    // displays:
    // date
    // time
    // city
    // description
    // temperature
    // low temp
    // high temp
    // ground level
    // humidity
    // Feels like
    // Wind speed
    // Wind gust
    let currentDate
    let i = 0
    data.list.forEach(function (dayTime) {
        // Create a p for weatherContent
        let p = document.createElement('p')

        let date = new Date(dayTime.dt * 1000)
        let dayStr = date.toLocaleDateString('en-us')
        let timeStr = date.toLocaleTimeString('en-us')

        let icon = document.createElement('img') // create img element for icon
        icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`) // set the src attribute using the data from the API
        icon.setAttribute('alt', `${data.list[i].weather[0].description}`)
        weatherContent.append(icon) // add the icon to the DOM

        if (currentDate != dayStr) {
            currentDate = dayStr
            // console.log(currentDate)
            p.append(currentDate + ' - ' + data.city.name)
            // console.log(' - ' + timeStr)
            p.append(' - ' + timeStr)
        } else {
            // console.log(' - ' + timeStr)
            p.innerHTML = ' - ' + timeStr + '<br>'
        }
        p.append(' - ' + data.list[i].weather[0].description + ' - Temperature: ' + data.list[i].main.temp)
        p.append(' -- Low Temperature: ' + data.list[i].main.temp_min + ' - High Temperature: ' + data.list[i].main.temp_max + ' - Feels like: ' + data.list[i].main.feels_like + ' - Ground Level: ' + data.list[i].main.grnd_level + ' - Humidity: ' + data.list[i].main.humidity + ' - Wind Speed: ' + data.list[i].wind.speed + ' - Wind Gust: ' + data.list[i].wind.gust)
        i = i + 1
        weatherContent.append(p)


        weatherContent.style.display = 'block'
    })
}

// Declare Variables
const weatherContent = document.querySelector('#weather')
const API_KEY = 'afcef5e06ba82db2259553faf1fef49d' // my api key

document.querySelector('#getWeather').addEventListener('click', function () {
    weatherContent.innerHTML = '' // clear out prior results
    let zipCode = document.querySelector('#zip').value
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call getWeather function
            getCurrentWeather(data, zipCode)
        }).catch((e) => {
            console.log(`This error occurred: ${e}`)
        })
})

document.querySelector('#getWeatherForecast').addEventListener('click', function () {
    weatherContent.innerHTML = '' // clear out prior results
    let zipCode = document.querySelector('#zip').value
    let url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},US&appid=${API_KEY}&units=imperial`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call getForecast function
            getWeatherForecast(data, zipCode)
        })
    // .catch((e) => {
    //     console.log(`This error occurred: ${e}`)
    // })
})