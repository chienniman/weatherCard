let url = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=CWB-3D266574-1B58-4579-B22A-FD86DFC8A135&downloadType=WEB&format=JSON`
const app=Vue.createApp({
    data(){
        return{
            weather_img:'',
            time:1,
            paths:[],
            filter: '',
            place_data: null,
            weather_data: [],
            temp_data:[],
            all_data:[],
        } 
    },
    mounted() {
        axios.get(url).then(data => {
             this.weather_data = data.data.cwbopendata.dataset.locations.location;
            console.log(this.weather_data);
        })
        paths = document.querySelectorAll('path');
        let _this = this
        paths.forEach(e => {
            e.onmouseover = function () {
                _this.filter = this.dataset.nameZh
            }
        })
    },
    computed: {
        // 顯示台灣地圖上的城鎮資訊
        now_city() {
            let data = {}
            // 用縣市名找到該筆資料
            let result = this.weather_data.find((obj) => {
                return obj.locationName === this.filter
            })
            if (result) {
                // 最高溫度
                let high = result.weatherElement.find(el => el.elementName === 'MaxT').time[this.time].elementValue.value
                // 最低溫度
                let low = result.weatherElement.find(el => el.elementName === 'MinT').time[this.time].elementValue.value
                // 天氣狀況描述與對應代號
                let weather = result.weatherElement.find(el => el.elementName === 'Wx').time[this.time].elementValue[0].value
                let weather_value=result.weatherElement.find(el => el.elementName === 'Wx').time[this.time].elementValue[1].value
                // 預測降雨機率
                let probability=result.weatherElement.find(el => el.elementName === 'PoP12h').time[this.time].elementValue.value
                // 紫外線指數
                let UVI=result.weatherElement.find(el => el.elementName === 'UVI').time[this.time].elementValue[0].value
                // 資料傳到畫面上方便渲染
                data = {
                    place: this.filter,
                    low: low,
                    high: high,
                    weather: weather,
                    probability:probability,
                    UVI:UVI,
                }
                // 依照天氣描述不同改照片
                this.change_weather_card_img(weather_value);
            }
            return data
        }
    },
    methods:{
        Ultra_violet_index:function(UVI){
            if(UVI>0 && UVI<2){
                return "低量級"
            }else if(UVI>=3 && UVI<=5){
                return "中量級"
            }else if(UVI>=6 && UVI<=7){
                return "高量級"
            }else if(UVI>=8 && UVI<=10){
                return "過量級"
            }else{
                return "危險級"
            }
        },
        change_weather_card_img:function(val){
            this.weather_img=`./pics/weather-imgs/${val}.svg`
        }
    }
})
app.mount('#app')