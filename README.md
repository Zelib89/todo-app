## Simple server for hosting react application

### Before running
Please create SSL sertificate for HTTPS connection. 
There should be files: `cert.key` and `cert.pem` in project root. <br>
Sertificate pass phrase should be saved in `.env` file as:
`PASSPHRASE=<YOUR_PASS_PHRASE>`

### `npm start`
Runs the app on 443 port in the browser. Returns content from `./client/build ` folder.<br>
