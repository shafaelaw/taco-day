// Taco Day RSVP — Google Apps Script
// ─────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
//   1. Create a new Google Sheet
//   2. Click Extensions → Apps Script
//   3. Delete any existing code and paste this entire file
//   4. Click Save (floppy disk icon)
//   5. Click Deploy → New deployment
//      - Type: Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   6. Click Deploy, authorize when prompted
//   7. Copy the Web app URL
//   8. Open index.html and replace PASTE_YOUR_SCRIPT_URL_HERE with that URL
// ─────────────────────────────────────────────────────────────

const SHEET_NAME = 'RSVPs'; // tab name — will be created automatically

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // create the sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Attending',
        'Total Party',
        'Adults',
        'Kids',
        'Bringing Pet',
        'Note'
      ]);

      // style the header row
      const header = sheet.getRange(1, 1, 1, 9);
      header.setFontWeight('bold');
      header.setBackground('#E8823A');
      header.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }

    const params = e.parameter;

    sheet.appendRow([
      new Date(),
      params.name      || '',
      params.email     || '',
      params.attending || '',
      params.total     || '0',
      params.adults    || '0',
      params.kids      || '0',
      params.pet       || 'No',
      params.note      || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually in the Apps Script editor to verify the sheet is created correctly
function testSetup() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  Logger.log(sheet ? 'Sheet exists: ' + sheet.getName() : 'Sheet not yet created — it will be on first RSVP submission');
}
