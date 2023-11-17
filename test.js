let requestOptions = {
    method: 'POST',
    redirect: 'follow'
};

async function logPDF() {
    const response = await fetch("https://pdftotext-88ae2d376ebb.herokuapp.com/extractPDFText?url=" + "https://www.africau.edu/images/default/sample.pdf", requestOptions);
    const output = await response.json();
    return output;
}

let variable = logPDF();
console.log(await variable)