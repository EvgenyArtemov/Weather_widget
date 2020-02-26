const DOM = {
    cityHeader: document.querySelector('.city'),
    tempNumber: document.querySelector('.temp__number'),
    tempContainer: document.querySelector('.temp__container'),
    tempImage: document.querySelector('.temp__icon--image'),
    humidity: document.querySelector('.humidity__value'),
    wind: document.querySelector('.wind__value'),
    pressure: document.querySelector('.pressure__value')
}

let cities = ['Волгоград', 'Москва'];


const control = async (cities) => {
    let counter = 0;
    let key = '56b81a5e44483f1326acad2e8ebb0158';

    let allWeather = await Promise.all(
        cities.map(async cityName => {
            let cityWeather = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${cityName},ru&APPID=${key}`)
            return cityWeather.json()
        }))

    // console.log(allWeather);

    if(allWeather){
        delayFunc();
    }

    function delayFunc() {
        prepareHtml(allWeather[counter])
        counter++;
        if (counter === allWeather.length) {
            counter = 0;
          }
          setTimeout(delayFunc, 5000)
     }

     function animate (){
         //animations

        //title
        DOM.cityHeader.classList.remove('fadeOUT__down');
        DOM.cityHeader.classList.add('fadeIN__up');
        //temperature
        DOM.tempContainer.classList.remove('fadeOUT');
        DOM.tempContainer.classList.add('fadeIN');
        //humidity pressure wind
        DOM.humidity.classList.remove('fadeOUT__down');
        DOM.wind.classList.remove('fadeOUT__down');
        DOM.pressure.classList.remove('fadeOUT__down');
        DOM.humidity.classList.add('fadeIN__up');
        DOM.wind.classList.add('fadeIN__up');
        DOM.pressure.classList.add('fadeIN__up');

        setTimeout(() => {
            DOM.cityHeader.classList.remove('fadeIN__up');
            DOM.tempContainer.classList.remove('fadeIN')
            DOM.humidity.classList.remove('fadeIN__up');
            DOM.wind.classList.remove('fadeIN__up');
            DOM.pressure.classList.remove('fadeIN__up');
        }, 1000);

        setTimeout(() => {
            DOM.cityHeader.classList.add('fadeOUT__down');
            DOM.tempContainer.classList.add('fadeOUT');
            DOM.humidity.classList.add('fadeOUT__down');
            DOM.wind.classList.add('fadeOUT__down');
            DOM.pressure.classList.add('fadeOUT__down');
        }, 4000);
     }
    
     function prepareHtml(obj){
        animate();
        //inner values
        DOM.cityHeader.innerText = obj.name;
        DOM.tempNumber.innerText = obj.main.temp < 273.15 ?
    
        `- ${Math.round(obj.main.temp - 273.15)}` 
        : 
        `+ ${Math.round(obj.main.temp - 273.15)}`;
    
        DOM.humidity.innerText = `${obj.main.humidity}%`;
        DOM.pressure.innerText = `${Math.round(obj.main.pressure * 0.75)} мм рт. ст.`;
        DOM.wind.innerText = `${obj.wind.speed} м/с`;
    }
    
}

control(cities);




let animation = lottie.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './data.json'
  })