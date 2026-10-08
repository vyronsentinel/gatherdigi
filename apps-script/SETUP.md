# Inquiry form setup

The inquiry form writes to the spreadsheet you provided, in a dedicated `Inquiries` tab, and sends a receipt to the email address entered by each visitor. The Apps Script project has been authorized and deployed as a web app.

Web app URL: `https://script.google.com/macros/s/AKfycbzMn1NVcysxzJHpgih5gkzDFkQVYvP1qAUfIL3HAEJdEC9UUI2HixarF1JyGrMfHbiRSw/exec`

The deployed endpoint returns `{"status":"ready"}` on GET. The Apps Script creates the `Inquiries` tab and its headers the first time a valid inquiry arrives. To change the handler, edit `Code.gs` in the Apps Script project, deploy a new version, and update `APPS_SCRIPT_URL` here if Google gives you a different URL. Publish the website over HTTPS, then submit a real inquiry using an email address you can check to confirm both the sheet row and receipt email arrive.