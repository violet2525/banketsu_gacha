const canvas_w = 960;
const canvas_h = 540;
let w_flg = '';

window.addEventListener('load', load, false);

function load(){
  start();
  //document.getElementById('cvs').addEventListener('click', senni, false);
  var cv = document.getElementById('cvs');
  cv.addEventListener('mouseup',function(e){
    senni(cv, e);
  }, false);
}

//画面遷移
function senni(cv, e){
const cv_pos = cv.getBoundingClientRect();
const mX = e.pageX - cv_pos.left;
const mY = e.pageY - cv_pos.top;
if(w_flg == 'start'){
  //スタート画面→鶺鴒台選択
  if(mX >= 310 && mX <= 750 && mY >= 365 && mY <= 460){
    sekirei();
  }else{
    window.alert(mX + ', ' + mY);
  }
}else if(w_flg == 'sekirei'){
  if (true){
    //鶺鴒台→神代鶺鴒台
  }else if(true){
    //鶺鴒台→桜代鶺鴒台
  }
  start();    
}
}

//START
function start(){
  w_flg = 'start';
  var cv = document.getElementById("cvs");
  cv.setAttribute("width",canvas_w);
  cv.setAttribute("height",canvas_h);
  var cn = cv.getContext("2d");
  var img = new Image();
  img.src = "start.png"
  img.onload = function(){
    cn.drawImage(img,0,0,canvas_w*2,canvas_h*2,0,0,canvas_w,canvas_h);
  }
}

//鶺鴒台選択
function sekirei(){
  w_flg = 'sekirei';
  var cv = document.getElementById("cvs");
  cv.setAttribute("width",canvas_w);
  cv.setAttribute("height",canvas_h);
  var cn = cv.getContext("2d");
  cn.font = "18px 'ＭＳ Ｐゴシック'"
  cn.fillText("鶺鴒台選択",100,100);
}

