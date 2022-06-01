let url = `https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=CWB-3D266574-1B58-4579-B22A-FD86DFC8A135&downloadType=WEB&format=JSON`
const app=Vue.createApp({
    data(){
        return{
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
                // 天氣狀況描述
                let weather = result.weatherElement.find(el => el.elementName === 'Wx').time[this.time].elementValue[this.time].value
                // 預測降雨機率
                let probability=result.weatherElement.find(el => el.elementName === 'PoP12h').time[this.time].elementValue.value
                // 紫外線指數
                let UVI=result.weatherElement.find(el => el.elementName === 'UVI').time[this.time].elementValue[0].value
                data = {
                    place: this.filter,
                    low: low,
                    high: high,
                    weather: weather,
                    probability:probability,
                    UVI:UVI,
                }
            }
            return data
        }
    },
})
app.mount('#app')