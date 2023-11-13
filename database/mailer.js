import HTML_TEMPLATE from "./mail-template.js";
const message = "UETable Open Now"
const options = {
    from: "uetable@gmail.com", // sender address
    to: "21020076@vnu.edu.vn", // receiver email
    subject: "UETable Open Now!", // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
}

import SENDMAIL from "./email.js" 
// send mail with defined transport object and mail options
SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
});