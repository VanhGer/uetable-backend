const HTML_TEMPLATE = (text) => {
    return ` 
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>UETable Open Now!</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>  
            ${text}
          <div class="container">
            <img src="https://i.pinimg.com/originals/7c/00/be/7c00be6291990e08affa37a27301e6b9.gif" alt="Girl in a jacket">
          </div>
        </body>
      </html>
    `;
  }
  
  export default HTML_TEMPLATE;