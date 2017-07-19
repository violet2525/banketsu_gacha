(function () {

  "use strict";
const canvas_w = 960;
const canvas_h = 540;
let misumaru = 0;
let character = '';
let page = {
  now: '',
  sekirei: ''
};

//クリック箇所
let buttons = {
  start: {
    font: "80px MyFont",
    align: "center",
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
, sindai: {
    font: "60px MyFont",
    align: "center",
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
, oudai: {
    font: "60px MyFont",
    align: "center",
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
, gacha: {
    font: "100px MyFont",
    align: "center",
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
, back: {
    font: "50px MyFont",
    align: "left",
    x: 0,
    y: 0,
    h: 0,
    w: 0
  }
, title: {
    font: "50px MyFont"
  , align: "right"
  , x: 0
  , y: 0
  , h: 0
  , w: 0
  }
, tweet: {
    font: "50px MyFont"
  , align: "center"
  , x: 0
  , y: 0
  , h: 0
  , w: 0
  }
};

//ボタン配置
var setButten = function(btn, name, text, x, y){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.font = btn[name].font;
  cn.textAlign = btn[name].align;
  var mtr = cn.measureText(text);
  //大きさ
  btn[name].w = mtr.width;
  btn[name].h = mtr.width/text.length;
  //位置
  switch(btn[name].align){
    case "left":
      btn[name].x = x;
      btn[name].y = y - btn[name].h;
      break;
    case "center":
      btn[name].x = x - btn[name].w/2;
      btn[name].y = y - btn[name].h;
      break;
    case "right":
      btn[name].x = x - btn[name].w;
      btn[name].y = y - btn[name].h;
      break;
    default :
      break;
  }
  //配置
  cn.fillText(text, x, y);
  return btn;
}

//ページ遷移
var Pages = function(name){
  this.name = name;
};

//START
var start = function(){
  page.now = 'start';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#ffffff";
  cn.fillRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#000000";
  cn.font = "100px MyFont";
  cn.textAlign = "center";
  cn.fillText("ばんけつくんがちゃ",canvas_w/2,canvas_h/3);
  buttons =  setButten(buttons, "start", "はじめる", canvas_w/2, canvas_h/3*2);
  stone(misumaru);
};

//鶺鴒台選択
let sekirei = function(){
  page.now = 'sekirei';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#000000";
  buttons =  setButten(buttons, "sindai", "しんだい", canvas_w/3, canvas_h/2);
  buttons =  setButten(buttons, "oudai", "おうだい", canvas_w/3*2, canvas_h/2);
  stone(misumaru);
};

//神代鶺鴒台
let seki_sindai = function(){
  page.now = 'seki_sindai';
  page.sekirei = 'sindai';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#000000";
  cn.font = "50px MyFont";
  cn.textAlign = "center";
  cn.fillText("しんだいせきれいだい",canvas_w/2,canvas_h/4);
  buttons =  setButten(buttons, "gacha", "いっちばんけつ", canvas_w/2, canvas_h/2);
  stone(misumaru);
};

//桜代鶺鴒台
let seki_oudai = function(){
  page.now = 'seki_oudai';
  page.sekirei = 'oudai';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#000000";
  cn.font = "50px MyFont";
  cn.textAlign = "center";
  cn.fillText("おうだいせきれいだい",canvas_w/2,canvas_h/4);
  buttons =  setButten(buttons, "gacha", "いっちばんけつ", canvas_w/2, canvas_h/2);
  stone(misumaru);
};

//ガチャ待機
let gacha = function(){
  page.now = 'gacha';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#000000";
  cn.font = "100px MyFont";
  cn.textAlign = "center";
  cn.fillText("がちゃがちゃ",canvas_w/2,canvas_h/2);
  stone(misumaru);
//  buttons =  setButten(buttons, "gacha", "がちゃがちゃ", canvas_w/2, canvas_h/2);
};

//ガチャ演出
let gacha_effect = function(){
  page.now = 'effect';
  //レアリティ抽選
  const persent = Math.floor( Math.random() * (100 + 1 - 1) ) + 1;
  let rair;
  if(persent <= 70){
    rair = "銀";
  }else if(persent > 70 && persent < 98){
    rair = "金";
  }else if(persent == 99){
    rair = "虹";
  }else{
    rair = "黒";
  }
  //Json呼び出し
  const objReq = tableReq(rair);
  //御統珠計算
  misumaru = misumaru + 960;

  var i = 0;
  var intervalId = setInterval(function(){
    i++;
    if(i > 10) {
      clearInterval(intervalId);
      setTimeout(function() {
        result(rair, character);
      }, 0.1);
    }
    switch(i % 4){
      case 0:
        silver();
        break;
      case 1:
        gold();
        break;
      case 2:
        rainbow();
        break;
      case 3:
        black();
        break;
      default:
        break;
    }
  }, 300);
 }

//ガチャ結果
let result = function(rair, chara){
  page.now = 'result';
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
//  cn.clearRect(0, 0, canvas_w, canvas_h);
  //背景描画
  switch(rair){
    case "銀":
      silver();
      break;
    case "金":
      gold();
      break;
    case "虹":
      rainbow();
      break;
    case "黒":
      black();
      break;
    default:
      break;
  }
  cn.fillStyle = "#000000";
  cn.textAlign = "center";
  cn.font = "100px MyFont";
  cn.fillText(chara, canvas_w/2, canvas_h/3);
  cn.font = "80px MyFont";
  cn.fillText("がうまれました", canvas_w/2, canvas_h/3+150);
  buttons =  setButten(buttons, "back", "もどる", 0, canvas_h-20);
  buttons =  setButten(buttons, "title", "たいとる", canvas_w, canvas_h-20);
  buttons =  setButten(buttons, "tweet", "つぶやく", canvas_w/2, canvas_h/5*4);
  stone(misumaru);
};

//御統珠
let stone = function(misumaru){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.font = "50px MyFont";
  cn.fillStyle = "#000000";
  cn.textAlign = "left";
  cn.fillText("みすまる", 250, canvas_h-20);
  cn.textAlign = "right";
  cn.fillText(misumaru + " こ", canvas_w - 250, canvas_h-20);
}

//銀
let silver = function(){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#999999";
  cn.fillRect(0, 0, canvas_w, canvas_h);
}

//金
let gold = function(){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#e6b422";
  cn.fillRect(0, 0, canvas_w, canvas_h);
}

//虹
let rainbow = function(){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#cc0033";
  cn.fillRect(0, 0, canvas_w, canvas_h);
}

//黒
let black = function(){
  var cv = document.getElementById("cvs");
  var cn = cv.getContext("2d");
  cn.clearRect(0, 0, canvas_w, canvas_h);
  cn.fillStyle = "#333333";
  cn.fillRect(0, 0, canvas_w, canvas_h);  
}

//画面遷移
var senni = function(cv, e){
  const cv_pos = cv.getBoundingClientRect();
  const mX = e.pageX - cv_pos.left;
  const mY = e.pageY - cv_pos.top;
  if(page.now == 'start'){
    //スタート画面→鶺鴒台選択
    if(mX >= buttons.start.x && mX <= buttons.start.x + buttons.start.w && mY >= buttons.start.y && mY <= buttons.start.y + buttons.start.h){
      sekirei();
    }
  }else if(page.now == 'sekirei'){
    if (mX >= buttons.sindai.x && mX <= buttons.sindai.x + buttons.sindai.w && mY >= buttons.sindai.y && mY <= buttons.sindai.y + buttons.sindai.h){
      //鶺鴒台→神代鶺鴒台
      seki_sindai();
    }else if(mX >= buttons.oudai.x && mX <= buttons.oudai.x + buttons.oudai.w && mY >= buttons.oudai.y && mY <= buttons.oudai.y + buttons.oudai.h){
      //鶺鴒台→桜代鶺鴒台
      seki_oudai();
    }
  }else if(page.now == 'seki_sindai' || page.now == 'seki_oudai'){
    //ガチャ画面
    if(mX >= buttons.gacha.x && mX <= buttons.gacha.x + buttons.gacha.w && mY >= buttons.gacha.y && mY <= buttons.gacha.y + buttons.gacha.h){
      gacha();
    }
  }else if(page.now =='gacha'){
    //ガチャ結果
    //if(mX >= buttons.back.x && mX <= buttons.back.x + buttons.back.w && mY >= buttons.back.y && mY <= buttons.back.y + buttons.back.h){
      gacha_effect();
    //}
  }else if(page.now =='result'){
    //ガチャ結果
    if(mX >= buttons.back.x && mX <= buttons.back.x + buttons.back.w && mY >= buttons.back.y && mY <= buttons.back.y + buttons.back.h){
      //鶺鴒台にもどる
      if (page.sekirei == 'sindai'){
        seki_sindai();
      }else{
        seki_oudai();
      }
    }else if(mX >= buttons.title.x && mX <= buttons.title.x + buttons.title.w && mY >= buttons.title.y && mY <= buttons.title.y + buttons.title.h){
      //タイトルにもどる
      start();
    }else if(mX >= buttons.tweet.x && mX <= buttons.tweet.x + buttons.tweet.w && mY >= buttons.tweet.y && mY <= buttons.tweet.y + buttons.tweet.h){
      tweet(character, misumaru);
    } 
  }
};

//マウスポインタ
let pointer = function(cv, e){
  const cv_pos = cv.getBoundingClientRect();
  const mX = e.pageX - cv_pos.left;
  const mY = e.pageY - cv_pos.top;
  if(page.now == 'start'){
    //スタート画面→鶺鴒台選択
    if(mX >= buttons.start.x && mX <= buttons.start.x + buttons.start.w && mY >= buttons.start.y && mY <= buttons.start.y + buttons.start.h){
      document.body.style.cursor = "pointer";
    }else{
      document.body.style.cursor = "";      
    }
  }else if(page.now == 'sekirei'){
    if (mX >= buttons.sindai.x && mX <= buttons.sindai.x + buttons.sindai.w && mY >= buttons.sindai.y && mY <= buttons.sindai.y + buttons.sindai.h){
      //鶺鴒台→神代鶺鴒台
      document.body.style.cursor = "pointer";
    }else if(mX >= buttons.oudai.x && mX <= buttons.oudai.x + buttons.oudai.w && mY >= buttons.oudai.y && mY <= buttons.oudai.y + buttons.oudai.h){
      //鶺鴒台→桜代鶺鴒台
      document.body.style.cursor = "pointer";
    }else{
      document.body.style.cursor = "";      
    }
  }else if(page.now == 'seki_sindai' || page == 'seki_oudai'){
    //ガチャ画面
    if(mX >= buttons.gacha.x && mX <= buttons.gacha.x + buttons.gacha.w && mY >= buttons.gacha.y && mY <= buttons.gacha.y + buttons.gacha.h){
      document.body.style.cursor = "pointer";
    }else{
      document.body.style.cursor = "";      
    }
  }else if(page.now =='gacha'){
    //ガチャ結果
    document.body.style.cursor = "pointer";
  }else if(page.now == 'result'){
    if(mX >= buttons.back.x && mX <= buttons.back.x + buttons.back.w && mY >= buttons.back.y && mY <= buttons.back.y + buttons.back.h){
      document.body.style.cursor = "pointer";
    }else if(mX >= buttons.title.x && mX <= buttons.title.x + buttons.title.w && mY >= buttons.title.y && mY <= buttons.title.y + buttons.title.h){
      document.body.style.cursor = "pointer";
    }else if(mX >= buttons.tweet.x && mX <= buttons.tweet.x + buttons.tweet.w && mY >= buttons.tweet.y && mY <= buttons.tweet.y + buttons.tweet.h){
      document.body.style.cursor = "pointer";
    }else{
      document.body.style.cursor = "";      
    }
  }else{
    document.body.style.cursor = "";      
  }
};

//初回ロード時
var load = function(){
//  tweet();
  start();
//  result("銀","ウラシマタロウ");
//  tableReq();

  //document.getElementById('cvs').addEventListener('click', senni, false);
  var cv = document.getElementById('cvs');
  cv.addEventListener('mousemove',(e) => pointer(cv, e),false);
  cv.addEventListener('click',(e) => senni(cv, e), false);
};

window.addEventListener('load', load, false);

//Json呼出
var tableReq = function(rair){
  let script = document.createElement('script');
  let sedai = '';
  //世代
  if(page.now == 'sindai'){
    sedai = 'o';
  }else{
    sedai = 's';
  }
  script.src = "https://script.google.com/macros/s/AKfycbwvIQKVN-kbFqhcRSA5HVojF1hJzjv0NG0odkZiuiiqWkUBm_E/exec?callback=callbackFunction&sedai=" + sedai;
  window.callbackFunction = function(data) {
    //（コールバックされた後の処理）
    const aryReq = data[rair];
    //キャラ抽選
    const chara = Math.floor( Math.random() * (aryReq.length-1 + 1 - 0) ) + 0;
    //result(rair, chara);
    character = aryReq[chara];
    return [rair, character];
  }
  document.body.appendChild(script);  
};

function tweet(chara, misumaru){
  var result = chara + "が産まれました（消費御統珠：" + misumaru + "個）\nhttps://banketsu-gacha.netlify.com/";
  var win = window.open("https://twitter.com/intent/tweet?text="+ encodeURIComponent(result));
//  location.href = "https://twitter.com/intent/tweet?text="+ encodeURIComponent(result);
}

}());
