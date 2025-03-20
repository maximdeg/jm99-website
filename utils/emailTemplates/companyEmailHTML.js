const companyEmailHTML = (userName, email, message) => {
  return `
    <html>
        <body>
            <div>
                <h2>${userName} mando un mensaje desde la pagina web</h2>
                <h3>Email: ${email}</h3>
                <h3>Mensaje: ${message}</h3>
            </div>

        </body>
    </html>
    `;
};

export default companyEmailHTML;
