const SPREADSHEET_ID = "168tjWF6gvejVKcQ2lAcJZnYTZBiK587k_uA9X9s8EvA";
const INQUIRY_SHEET_NAME = "Inquiries";
// Optional: set the address replies should go to. Leave empty to use the script owner's email.
const REPLY_TO_EMAIL = "";
const INQUIRY_HEADERS = [
  "Submitted At",
  "Name",
  "Email",
  "Preferred Contact",
  "Contact Detail",
  "Event Type",
  "Event Date",
  "Venue or City",
  "Theme or Style",
  "Additional Details",
];
const EMAIL_BACKGROUND_INLINE_BASE64 = [
  "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAB4UFhoWEx4aGBohHx4jLEowLCkpLFtB",
  "RDZKa15xb2leaGZ2haqQdn6hgGZolMqWobC1v8C/c47R4M+53qq7v7f/2wBDAR8h",
  "ISwnLFcwMFe3emh6t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3",
  "t7e3t7e3t7e3t7e3t7f/wAARCAB4AaQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEA",
  "AAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIh",
  "MUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6",
  "Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZ",
  "mqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx",
  "8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREA",
  "AgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAV",
  "YnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hp",
  "anN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPE",
  "xcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC4",
  "Tj8qVW4FQs/anxmtDlJGAJ/woZWIAzkUoBpWPGKBDVPUGnZppGTkdaAT6UAPBpc4",
  "OaaDS9aAJKWmIeMelLmgB1KelNzQDQAHjmlpDyKAaAHg4prGkJpC1IYue1LTBTge",
  "aYh1JRmlzSGGRSZpTikoATpS9qbnPFO7UxBioJVyCGqx0pki55FAFMgg4NNfGOKl",
  "kVmOMVWkLBue1BSHqaf2qNSO9OHNADjxTHxjB707pSZHegCvg557d6kA6GlI5NIA",
  "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",
  "ooEMwvcc0UUUxn//2Q==",
].join("");
const EMAIL_LOGO_INLINE_BASE64 = [
  "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",
].join("");

function authorizeServices() {
  SpreadsheetApp.openById(SPREADSHEET_ID).getName();
  MailApp.getRemainingDailyQuota();
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: "ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const fields = event && event.parameter ? event.parameter : {};
  const requestToken = cleanField_(fields.requestToken, 120);

  if (fields.website) return iframeResponse_("success", requestToken);

  const inquiry = {
    name: cleanField_(fields.name, 120),
    email: cleanField_(fields.email, 254),
    eventType: cleanField_(fields.eventType, 80),
    eventDate: cleanField_(fields.eventDate, 30),
    contactMethod: cleanField_(fields.contactMethod, 40),
    contactDetail: cleanField_(fields.contactDetail, 120),
    venue: cleanField_(fields.venue, 200),
    theme: cleanField_(fields.theme, 200),
    details: cleanField_(fields.details, 2000),
  };

  const emailParts = inquiry.email.split("@");
  const validEmail = emailParts.length === 2 && emailParts[0] && emailParts[1].includes(".");
  if (!inquiry.name || !inquiry.eventType || !validEmail) {
    return iframeResponse_("error", requestToken);
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(INQUIRY_SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(INQUIRY_SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(INQUIRY_HEADERS);

    sheet.appendRow([
      new Date(),
      safeCell_(inquiry.name),
      safeCell_(inquiry.email),
      safeCell_(inquiry.contactMethod),
      safeCell_(inquiry.contactDetail),
      safeCell_(inquiry.eventType),
      safeCell_(inquiry.eventDate),
      safeCell_(inquiry.venue),
      safeCell_(inquiry.theme),
      safeCell_(inquiry.details),
    ]);
  } catch (error) {
    console.error(error);
    return iframeResponse_("error", requestToken);
  }

  try {
    sendConfirmation_(inquiry);
  } catch (error) {
    console.error(error);
    return iframeResponse_("saved-email-failed", requestToken);
  }

  return iframeResponse_("success", requestToken);
}

function sendConfirmation_(inquiry) {
  const firstName = inquiry.name.split(/\s+/)[0];
  const eventType = inquiry.eventType;
  const eventDate = inquiry.eventDate ? formatDate_(inquiry.eventDate) : "";
  const venue = inquiry.venue || "";
  const contactMethod = capitalize_(inquiry.contactMethod || "email");
  const subject = "We received your inquiry, " + firstName;

  // Plain-text fallback (shown by clients that do not render HTML)
  const body = [
    `Hi ${firstName},`,
    "",
    "Thank you for reaching out to Gathered. Your inquiry has been received.",
    "",
    "YOUR DETAILS",
    `Event: ${eventType}`,
    eventDate ? `Date: ${eventDate}` : null,
    venue ? `Venue: ${venue}` : null,
    `Preferred contact: ${contactMethod}`,
    "",
    "I will review everything and get back to you shortly about your celebration website.",
    "If you would like to add anything, simply reply to this email.",
    "",
    "Warm regards,",
    "Gathered",
  ].filter((line) => line !== null).join("\n");

  const inlineImages = {
    gatheredLogo: Utilities.newBlob(
      Utilities.base64Decode(EMAIL_LOGO_INLINE_BASE64),
      "image/png",
      "gathered-logo.png"
    ),
    watercolor: Utilities.newBlob(
      Utilities.base64Decode(EMAIL_BACKGROUND_INLINE_BASE64),
      "image/jpeg",
      "watercolor-banner.jpg"
    ),
  };

  // Only show rows the guest actually filled in
  const rows = [["Event", eventType]];
  if (eventDate) rows.push(["Date", eventDate]);
  if (venue) rows.push(["Venue", venue]);
  rows.push(["Preferred contact", contactMethod]);

  const detailRows = rows.map((row, i) => {
    const border = i < rows.length - 1 ? "border-bottom:1px solid #dfe8e1;" : "";
    return `<tr>
                  <td width="38%" valign="top" style="padding:12px 0;${border}font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b786f;">${escapeHtml_(row[0])}</td>
                  <td valign="top" style="padding:12px 0;${border}font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#202922;">${escapeHtml_(row[1])}</td>
                </tr>`;
  }).join("\n                ");

  const htmlBody = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>${escapeHtml_(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#edf3ee;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#edf3ee;">Thank you, ${escapeHtml_(firstName)} - your celebration inquiry has been received.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#edf3ee" style="background-color:#edf3ee;">
      <tr><td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #dce5de;border-radius:6px;">

          <!-- Brand header -->
          <tr><td style="padding:22px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
              <td style="padding-right:12px;vertical-align:middle;"><img src="cid:gatheredLogo" width="44" height="34" alt="" style="display:block;width:44px;height:34px;border:0;"></td>
              <td style="vertical-align:middle;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#202922;line-height:1;">gathered.</div>
                <div style="padding-top:5px;font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:1.6px;color:#6b786f;">DIGITAL INVITATIONS</div>
              </td>
            </tr></table>
          </td></tr>

          <!-- Banner -->
          <tr><td><img src="cid:watercolor" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>

          <!-- Greeting -->
          <tr><td style="padding:36px 40px 8px;">
            <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.8px;color:#315c4b;">INQUIRY RECEIVED</p>
            <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.25;font-weight:normal;color:#202922;">Thank you, ${escapeHtml_(firstName)}.</h1>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#4d5a52;">We have received your celebration inquiry. I will review the details and get back to you shortly about your custom event website.</p>
          </td></tr>

          <!-- Details card -->
          <tr><td style="padding:24px 40px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f8f4" style="background-color:#f4f8f4;border-left:3px solid #315c4b;">
              <tr><td style="padding:18px 22px 8px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:#315c4b;">YOUR DETAILS</p>
              </td></tr>
              <tr><td style="padding:0 22px 10px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${detailRows}
                </table>
              </td></tr>
            </table>
          </td></tr>

          <!-- Next steps -->
          <tr><td style="padding:22px 40px 8px;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#4d5a52;">Want to add something? Just reply to this email and it will reach me directly.</p>
          </td></tr>

          <!-- Sign-off -->
          <tr><td style="padding:20px 40px 36px;">
            <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#4d5a52;">Warm regards,</p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#315c4b;">Gathered</p>
          </td></tr>

          <!-- Footer -->
          <tr><td align="center" bgcolor="#f4f8f4" style="padding:16px 24px;background-color:#f4f8f4;border-top:1px solid #e2e8e3;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#7a857d;">
            Thoughtful websites for life's meaningful celebrations.<br>
            You are receiving this because you submitted an inquiry on our website.
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  const options = {
    to: inquiry.email,
    name: "Gathered",
    subject: subject,
    body: body,
    htmlBody: htmlBody,
    inlineImages: inlineImages,
  };
  // Replies should reach YOU, not bounce back to the person who submitted the form.
  const replyTo = REPLY_TO_EMAIL || Session.getEffectiveUser().getEmail();
  if (replyTo) options.replyTo = replyTo;

  MailApp.sendEmail(options);
}

function capitalize_(value) {
  const text = String(value || "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatDate_(value) {
  // Form sends YYYY-MM-DD; show it as "January 15, 2027". Falls back to the raw text.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "MMMM d, yyyy");
}

function cleanField_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function safeCell_(value) {
  return ["=", "+", "-", "@"].some((prefix) => value.startsWith(prefix)) ? `'${value}` : value;
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function iframeResponse_(status, requestToken) {
  const payload = JSON.stringify({ source: "gathered-inquiry", status: status, requestToken: requestToken });
  const html = `<!doctype html><html><body><script>top.postMessage(${payload}, "*");</script></body></html>`;
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}