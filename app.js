function convertDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
    });
}

function getDayOfWeek() {
    const date = new Date();

    const dayOfWeekNumber = date.getDay();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekName = days[dayOfWeekNumber];

    return dayOfWeekName;
}

async function cityWeather(city){
    try{
        document.querySelector('.loading-anime').style.display = 'flex';
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a7c33931d5f44680b1c54137240205&q=${city}`,{mode:'cors'});
        const weatherData = await response.json();
        // console.log(weatherData);
        const location = weatherData.location.name;
        const temp = 
            {
                temp_c:Math.floor(weatherData.current.temp_c),
                temp_f:Math.floor(weatherData.current.temp_f),
            }
        const conditionTextDescription = weatherData.current.condition.text;
        const localtime = weatherData.location.localtime;


        const weatherGIF = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=EDpn2fkWpwzp8NlPT7LrJfK0yL4ssYTe&s=${conditionTextDescription}`,{mode:'cors'});
        const weatherGIFData = await weatherGIF.json()
        const GIF = weatherGIFData.data.images.original.url;

        const data =  {
            location:location,
            temp:temp,
            conditionTextDescription:conditionTextDescription,
            GIF:GIF,
            localtime:convertDate(localtime)
        }

        return data

    }catch(err){
        console.log(err);
        document.querySelector('.error-div').textContent = 'Something went wrong';
        document.querySelector('.giphy').style.background = '#fff'
        return 'something went wrong'
    }finally{
        document.querySelector('.loading-anime').style.display = 'none';
        document.querySelector('#city-input').value = '';
    }
}


 function app(){
    const userInput = document.querySelector('#city-input');
    const fetchBtn = document.querySelector('.submit-btn');
    const errorDiv = document.querySelector('.error-div');
    const date = document.querySelector('.date');
    const gifImg = document.querySelector('.giphy img');
    const tempDiv = document.querySelector('.temp');
    const cityName = document.querySelector('.city-name');
    const day = document.querySelector('.day');
    const conditionText = document.querySelector('.condition-text');
    const switchTemp = document.querySelector('.switch-temp');


    fetchBtn.addEventListener('click', async (e)=>{
        document.querySelector('.error-div').textContent = '';
        document.querySelector('.giphy').style.background = ''
        if(userInput.value == ''){
            errorDiv.textContent = 'Input can\'t be empty';
            return
        }
        
        const data = await cityWeather(userInput.value);

        date.textContent = data.localtime;
        gifImg.src = data.GIF;
        tempDiv.textContent = `${data.temp.temp_c}°c`;
        cityName.textContent = data.location;
        day.textContent = getDayOfWeek();
        conditionText.textContent = data.conditionTextDescription;

        switchTemp.addEventListener('click',(e)=>{
            if (tempDiv.textContent.slice(-1) === 'c'){
                tempDiv.textContent = `${data.temp.temp_f}F`;
                switchTemp.textContent = '°c'
            }else{
                tempDiv.textContent = `${data.temp.temp_c}°c`;
                switchTemp.textContent = 'F'
            }
        }); 
    })

}

app()

  