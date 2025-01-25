
const longitudeInput = document.getElementById('longitude');
const latitudeInput = document.getElementById('latitude');
const searchBtn = document.getElementById('search');
const displayContent = document.querySelector('.display-content');
// bind event of search button
searchBtn.addEventListener('click', (e) => {
    console.log('click')
    // get query string
    const longitude = longitudeInput.value;
    const latitude = latitudeInput.value;
    getData(latitude, longitude);
})

async function getData(latitude, longitude) {
    try {
        try{
            if (longitude.trim() == '' || latitude.trim() == ''){
                alert('請輸入經緯度')
            }
        } catch(e){
            console.error(e)
        }
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`請求失敗：${response.status}`);
        }
        // render data
        const localTime = data.current_weather.time.split('T')[0];
        const timezone = data.timezone + ' ' + data.current_weather.time.split('T')[1];
        const localLongitude = data.longitude;
        const localLatitude = data.latitude;
        const temperature = data.current_weather.temperature;
        const temperatureUnit = data.current_weather_units.temperature;
        const windspeed = data.current_weather.windspeed;
        const windspeedUnit = data.current_weather_units.windspeed;
        const elevation = data.elevation;
        const renderData = `
            <tr>
                <th>當地時間</th>
                <td>${localTime}</td>
            </tr>
            <tr>
                <th>時區</th>
                <td>${timezone}</td>
            </tr>
            <tr>
                <th>地點</th>
                <td>經度 ${localLongitude}   緯度 ${localLatitude}</td>
            </tr>
            <tr>
                <th>溫度</th>
                <td>${temperature}  ${temperatureUnit}</td>
            </tr>
            <tr>
                <th>風速</th>
                <td>${windspeed}  ${windspeedUnit}</td>
            </tr>
            <tr>
                <th>海拔高度</th>
                <td>${elevation}</td>
            </tr>
            `;
        displayContent.innerHTML = renderData;
    } catch (error) {
        console.error('錯誤：', error);
    }
}
