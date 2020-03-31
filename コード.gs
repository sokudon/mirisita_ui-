/**
 * Return a list of sheet names in the Spreadsheet with the given ID.
 * @param {String} a Spreadsheet ID.
 * @return {Array} A list of sheet names.
 */

var sid="1CpwNLrurUVVLX2dmMgZHU-uQC7WQfyfWqLlaiooRaN8";
var sname="周回のるま";
var moment = Moment.load();
 

function doGet() {
  var ss = SpreadsheetApp.openById(sid);
  var sheets = ss.getSheetByName(sname);
  
　var last_row = sheets.getLastRow()-1;
　var last_col = 13;
  
  
   var values= sheets.getRange(1,1,last_row ,last_col).getValues();
  var str=JSON.stringify(values);
  
  var ss=JSON.parse(str);
  
  var kyoku="2017/08/22 00:00";
  var kikan= (moment()-moment(kyoku))/3600/24/30/1000; 
 
  for(var i=1;i<ss.length;i++)
  {
  for(var k=0;k<last_col;k++){
    if(k==5 && i>0){
      ss[i][k]=moment(ss[i][k]).format("YY/MM/DD HH:mm");
    }
    if(k==11 && i>0){
      ss[i][k]=moment(ss[i][k]).format("HH:mm");
    }
  }
  }  
  
 ss=filetercombine(ss);//分離後QS
  
   
  var st="曲追加ペース;" +  ((last_row-17)/kikan) +"<br>";
  
  
  var col={
    "Angel":"yellow",
    "Princess":"pink",
    "Fairy":"aqua",
    "All":"green"
  };
    
  var selcol;
  
  for(var i=0;i<ss.length;i++)
  {
    st +="<tr>";
    selcol=col[ss[i][1]];
    
  for(var k=0;k<last_col;k++){
   
  st += "<td bgcolor='" + selcol +"'>" +ss[i][k] +"</td>";
  }
  st += "</tr>";
  }
  
  st = "<table border='1'><tbody>" +st + "<tbody></table>";
  
  return HtmlService.createHtmlOutput(st);
  //return ContentService.createTextOutput(st).setMimeType(ContentService.MimeType.TEXT);
    //JSON.stringify(sheet.getName());
}

function wmap_getSheetsName(sheets){
  //var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var sheet_names = new Array();
  
  if (sheets.length >= 1) {  
    for(var i = 0;i < sheets.length; i++)
    {
      sheet_names.push(sheets[i].getName());
    }
  }
  return sheet_names;
}



//0 no,1=属,2=name,3=hiara,4=条件,5=time,6=lv,7=uta
var time=3;


function MIRISITA_UNEI(s){
var arrReplaceData = [
 ["が","か゛"],["ぎ","き゛"],["ぐ","く゛"],["げ","け゛"],["ご","こ゛"],["ざ","さ゛"],
["じ","し゛"],["ず","す゛"],["ぜ","せ゛"],["ぞ","そ゛"],["だ","た゛"],["ぢ","ち゛"],
["づ","つ゛"],["で","て゛"],["ど","と゛"],["ば","は゛"],["び","ひ゛"],["ぶ","ふ゛"],
["べ","へ゛"],["ぼ","ほ゛"],["ぱ","は゜"],["ぴ","ひ゜"],["ぷ","ふ゜"],["ぺ","へ゜"],
["ぽ","ほ゜"],
["っ","つ"],["ゃ","や"],["ゅ","ゆ"],["ょ","よ"],
["ぁ","あ"],["ぃ","い"],["ぅ","う"],["ぇ","え"],["ぉ","お"]
  ];

  if (s.length > 0) {
    for (var i = 0; i < arrReplaceData.length; i++) {
      var replaceData = arrReplaceData[i];
      s= s.replace(new RegExp(replaceData[0], 'g'), function() {
        return replaceData[1];
      });
    }
  }
  s= s.replace(/[゛゜]/gm,"");

return s
}

function filetercombine(data){
    
data.sort(function(a,b){
  var aa = MIRISITA_UNEI(a[time]);
  var bb = MIRISITA_UNEI(b[time]);
  
    if(aa<bb) {
     return -1;
  }
    if(aa>bb) {
     return 1;
  }
   return 0;
});
  
  return data;
}


