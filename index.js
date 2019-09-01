
// express Webフレームワークをインポート
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

var path = require('path');

// サーバーをポート3000番で起動
app.listen(port, () => console.log(`Start listening at port ${port}`));
// Routing: ルートへのGETアクセスへの対応。ルートはpublicフォルダにセットし、index.htmlを返す。
app.use(express.static('public'));

app.get('/portofolio', function (req, res) {
  //console.log(__dirname); 
  res.sendFile(path.join(__dirname + '/public/portfolio.html'));  
});

app.get('/about', function (req, res) {
  //console.log(__dirname);  
  res.sendFile(path.join(__dirname + '/public/about.html'));  
});

app.get('/skill', function (req, res) {
  //console.log(__dirname);  
  res.sendFile(path.join(__dirname + '/public/skill.html'));  
});
  