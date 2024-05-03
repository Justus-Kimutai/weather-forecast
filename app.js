async function cityWeather(city){
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a7c33931d5f44680b1c54137240205&q=${city}`,{mode:'cors'});
        const weatherData = await response.json();
        const location = weatherData.location.name;
        const temp = 
            {
                temp_c:weatherData.current.temp_c,
                temp_f:weatherData.current.temp_f,
            }
        const conditionTextDescription = weatherData.current.condition.text;


        const weatherGIF = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=SW9dDWHwVK8c3BiRDSGImlVPY46sZvbC&s=${conditionTextDescription}`);
        const weatherGIFData = await weatherGIF.json()
        const GIF = weatherGIFData.data.images.original.url
        console.log(weatherGIFData);

        // document.querySelector('img').src = GIF;


    }catch(err){
        console.log(err);
    }
}

cityWeather('nairobi')

// document.querySelector('img').src = cityWeather('nairobi').current.condition.icon

