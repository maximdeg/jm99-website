const thankYouHTML = (url, userName) => {
  return `
      <html>
          <body>
              <div>
                  <p>Estimado ${userName},</p>
                  <p>Gracias por contactar con nosotros. Nos pondremos en contacto contigo a la brevedad.</p>
              </div>
              <div>
                  <a href="${url}">Ir a JM99</a>
              </div>
          </body>
      </html>
      `;
};

export default thankYouHTML;
