const viewmodel=Vue.createApp({
    data(){
        return{
            all:[],
            locationName:[],
        }
    },
    methods:{

    },
    mounted() {
        fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3D266574-1B58-4579-B22A-FD86DFC8A135")
.then(function(response) {
  return response.json();
})
.then(function(data) {
  let weather_data_locationName=data.records.location   
  let arr=[];
  weather_data_locationName.forEach((i,index)=>{
      arr.push(i.locationName)
  });
  this.locationName =[...arr];
  console.log(typeof(this.locationName),this.locationName);
});
    
    }, 
    computed:{

    }   
})
viewmodel.mount("#weather_card");