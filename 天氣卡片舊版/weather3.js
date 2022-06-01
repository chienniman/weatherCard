var cities_names=[];
var weather_info=[];
var date=3;
var btns=document.querySelectorAll(`.btn-group .btn`);



fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3D266574-1B58-4579-B22A-FD86DFC8A135")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  

  var weather_data=data.records.location
  var wrapper=document.querySelector('.row')
  weather_data.forEach((i)=>{
    wrapper.innerHTML+=`
  <div class="card mb-3  bg-light me-3" style="width: 18rem;">
  <div class="card-body bg-light">
    <h2 class="card-title"><i class="bi bi-house-door me-1"></i>${i.locationName}</h2>
    <p class="card-text"><i class="bi bi-calendar-check-fill me-3"></i>${i.weatherElement[0].time[2].startTime}</p>
    <p class="card-text"><i class="bi bi-calendar-check me-3"></i>${i.weatherElement[0].time[2].endTime}</p>
    <p class="card-text"><i class="bi bi-cloud-sun me-3"></i>天氣現象:${i.weatherElement[0].time[2].parameter.parameterName}</p>
    <p class="card-text"><i class="bi bi-cloud-drizzle-fill me-3"></i>降雨機率:${i.weatherElement[1].time[2].parameter.parameterName}%</p>
    <p class="card-text"><i class="bi bi-thermometer me-3"></i>最低溫度:${i.weatherElement[2].time[2].parameter.parameterName}°C </p>
    <p class="card-text"><i class="bi bi-thermometer-high me-3"></i>最高溫度:${i.weatherElement[4].time[2].parameter.parameterName}°C </p>
    <p class="card-text"><i class="bi bi-person-check me-3"></i>舒適度:${i.weatherElement[3].time[2].parameter.parameterName}</p>
    <p class="card-text"><img src="./weather-img/${i.weatherElement[0].time[2].parameter.parameterName}.svg" alt=""></p>
  </div>
</div>
  `
  })
});
