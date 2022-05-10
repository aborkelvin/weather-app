let loc = document.querySelector('#location');
let btn = document.querySelector('button');

//Select elements to collect data
let ftemp = document.querySelector('.feels');
let humidity = document.querySelector('.hums');
let rain = document.querySelector('.rain');
let wind = document.querySelector('.wind');
let tempval = document.querySelector('.tempval');
let city  = document.querySelector('.city');
let list = document.querySelectorAll('li');

let listarr = Array.from(list);
let listall = ['New york','Munich','Denver','Madrid','Tokyo']


async function getdata(location){
    //the API gets the hourly five days forecast
    try{
        let response1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=1&appid=3a722332992b4c82d7bc3d58f755b685&units=metric`,
        { mode: 'cors' });
        let dat1 = await response1.json();
        console.log(dat1);
        processor(dat1)
    }
    catch(error){
        console.log(error)
        //alert('Please input another location');
    }
}

btn.addEventListener('click',function(){
    let dat = loc.value;
    getdata(dat);
})

getdata('London');

//Process and log data into html elements
function processor(data){
    let maintemp = data.list[0].main.temp;
    maintemp = Math.round(maintemp)
    tempval.innerHTML = maintemp;

    let cityname = data.city.name;
    city.innerHTML = cityname;

    let tempo = data.list[0].main.feels_like;
    tempo = Math.round(tempo);
    ftemp.innerHTML = tempo+'<sup>o</sup>'+' C';

    let hums = data.list[0].main.humidity;
    humidity.innerHTML = hums+' %'

    let windspeed = data.list[0].wind.speed;
    wind.innerHTML = windspeed+' m/s';
}


console.log(list)
console.log(listarr)
list.forEach(function(item){
    item.addEventListener('click',function(){
        let i = listarr.indexOf(item);
        getdata(listall[i]);
    })   
}) 
