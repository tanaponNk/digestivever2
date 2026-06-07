function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  if (e.parameter.action === 'save') {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['วันที่','ทีม 1','ชั้น1','เลขที่1','ทีม 2','ชั้น2','เลขที่2','คะแนนทีม1','คะแนนทีม2','ผู้ชนะ','จำนวนรอบ','จำนวน Card']);
    }
    sheet.appendRow([
      new Date(),
      e.parameter.t1name || '',
      e.parameter.t1cls  || '',
      e.parameter.t1num  || '',
      e.parameter.t2name || '',
      e.parameter.t2cls  || '',
      e.parameter.t2num  || '',
      Number(e.parameter.s1)     || 0,
      Number(e.parameter.s2)     || 0,
      e.parameter.winner         || '',
      Number(e.parameter.rounds) || 0,
      Number(e.parameter.cards)  || 0 
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var rows = sheet.getDataRange().getValues();
  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}