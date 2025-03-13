const companyEmailHTML = (userName, email, body) => {
  return `
    <html>
        <body>
            <div>
                <p>Hola JM99,</p>
                <p>Aca esta el email de ${userName} con la direccion de contacto</p>
                <p>${email}</p>
                <p>${body}</p>
            </div>
            <div>
                <a href="${url}">Ir a JM99</a>
            </div>
        </body>
    </html>
    `;
};

export default companyEmailHTML;
