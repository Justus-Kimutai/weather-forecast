async function cityWeather(city){
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a7c33931d5f44680b1c54137240205&q=${city}`,{mode:'cors'});
        const weatherData = await response.json();
        // console.log(weatherData);
        const location = weatherData.location.name;
        const temp = 
            {
                temp_c:weatherData.current.temp_c,
                temp_f:weatherData.current.temp_f,
            }
        const conditionTextDescription = weatherData.current.condition.text;
        const localtime = weatherData.location.localtime;


        const weatherGIF = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=SW9dDWHwVK8c3BiRDSGImlVPY46sZvbC&s=${conditionTextDescription}`,{mode:'cors'});
        const weatherGIFData = await weatherGIF.json()
        const GIF = weatherGIFData.data.images.original.url

        const data =  {
            location:location,
            temp:temp,
            conditionTextDescription:conditionTextDescription,
            GIF:GIF,
            localtime:convertDate(localtime)
        }

        console.log(data);

    }catch(err){
        console.log('something went wrong' + err);
        return 'something went wrong'
    }
}

cityWeather('nairobi')

function app(){
    const userInput = document.querySelector('#city-input');
    const fetchBtn = document.querySelector('.submit-btn');
    const errorDiv = document.querySelector('.error-div');
    const loadingDiv = document.querySelector('.loading-anime')

    fetchBtn.addEventListener('click',(e)=>{
        if(userInput.value === ''){
            errorDiv.textContent = 'Input can\'t be empty';
        }
        return
    })



}


function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  
  

