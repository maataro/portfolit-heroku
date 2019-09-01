const mymap = L.map('checkinMap').setView([0, 0], 1);
//     // mapオブジェクトを初期化生成して、位置とズームレベルをセットする
//     const mymap = L.map('issmap').setView([0, 0], 1);

const attribution = 
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl =
 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
//     // タイルレイヤーをmapに追加する
//     // 今回はMapbox Street タイルレイヤーを使う。
//     const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//     const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//     const tiles = L.tileLayer(tileurl, { attribution });
//     tiles.addTo(mymap);


//     // 独自のアイコンをマーカーとして使う
    // const issIcon = L.icon({
    //   iconUrl: 'iss.png',
    //   iconSize: [20, 40],
    //   iconAnchor: [10, 20],
    //   popupAnchor: [-3, -76]
    // });
//     const marker = L.marker([50.505, 30.57], { icon: issIcon }).addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (let item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    //const marker = L.marker([item.lat, item.lon], { icon: issIcon }).addTo(mymap);
    let txt =  `The weather here at ${item.lat}&deg;,
    ${item.lon}&deg; is ${item.weather.summary} with
    a temperature of ${item.weather.temperature}&deg; C.`;

    if (item.air.value < 0) {
      txt += ` No air quality reading.`;
    } else {
      txt += `  The concentration of particulate matter 
      (${item.air.parameter}) is ${item.air.value} 
      ${item.air.unit} last read on ${item.air.lastUpdated}`;
    }
    marker.bindPopup(txt);
  }
  console.log(data);

}




// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>Where is ISS</title>
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
//     integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
//     crossorigin="" />
//   <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
//     integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
//     crossorigin=""></script>

//   <style>
//     #issmap {
//       height: 280px;
//       width: 600px;
//     }
//   </style>
// </head>

// <body>
//   <h1>Where is ISS now?</h1>
//   <p>
//     latitude: <span id="lat"></span>°<br />
//     longitude: <span id="lon"></span>°
//   </p>

//   <div id="issmap"></div>

//   <script>
//     /*
//      1.ISSの位置情報取得  https://wheretheiss.at/
//      2.取得したデータを解析して緯度、経度を抽出
//      3.実際の地図上に、ISSの位置をマッピング  Leaflet.js: https://leafletjs.com/
//     */    

//     // mapオブジェクトを初期化生成して、位置とズームレベルをセットする
//     const mymap = L.map('issmap').setView([0, 0], 1);

//     // タイルレイヤーをmapに追加する
//     // 今回はMapbox Street タイルレイヤーを使う。
//     const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//     const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//     const tiles = L.tileLayer(tileurl, { attribution });
//     tiles.addTo(mymap);

//     // 独自のアイコンをマーカーとして使う
//     const issIcon = L.icon({
//       iconUrl: 'iss.png',
//       iconSize: [20, 40],
//       iconAnchor: [10, 20],
//       popupAnchor: [-3, -76]
//     });
//     const marker = L.marker([50.505, 30.57], { icon: issIcon }).addTo(mymap);

//     //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

//     // ポップアップを生成し、初期値をセット
//     var popup = L.popup();
//     popup.setLatLng([0, 0]);
//     popup.setContent('<p>Hello world!<br />This is a nice popup.</p>');
//     popup.openOn(mymap);

//     // マップ上をクリックするとポップアップで現在位置を表示する
//     function onMapClick(e) {
//       popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
//     }
//     mymap.on('click', onMapClick);


//     // ISSの位置をAPIを通して取得し、地図上にマッピングする
//     const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//     let firstTime = true;

//     async function getISS() {
//       // ISSの現在位置をAPIに問い合わせ
//       const response = await fetch(api_url);
//       const json_data = await response.json();
//       const { latitude, longitude } = json_data;

//       // パラグラフの内容として現在の緯度・経度を表示
//       document.getElementById('lat').textContent = latitude.toFixed(2);
//       document.getElementById('lon').textContent = longitude.toFixed(2);
      
//       // マーカーのロケーションをアップデート      
//       marker.setLatLng([latitude, longitude]);
//       if (firstTime) {
//         mymap.setView([latitude, longitude], 1.5);
//         firstTime = false;
//       }
//       popup.setLatLng([latitude, longitude]);
//       popup.setContent(`<p>ISS position<br />latitude:${latitude} <br />logitude:${longitude}</p>`);
//       popup.openOn(mymap);
//     }

//     getISS();
//     setInterval(getISS, 60000);
//   </script>
// </body>

// </html>