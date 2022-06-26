function monPDF() {
    let deferreds = [];
    let doc = new jsPDF("p", "pt", "a4");
    let deferred = $.Deferred();
    deferreds.push(deferred.promise());
    generateCanvas(doc, deferred);

    // executer après l'ajout du canvas
    $.when.apply($, deferreds).then(function () { 
        doc.save('CV_Nicolas_Dabek.pdf');
    });
}

function generateCanvas(doc, deferred) {
    // #zone_impression est l'id de l'ensemble de la zone à convertir en canvas pour générer le PDF
    html2canvas(document.querySelector("#zone_impression")).then(function (canvas) {
        let imgData = canvas.toDataURL("image/jpeg");
        // addImage(canvas, 'format', posGauche, posHaut, posDroite, posBas)
        doc.addImage(imgData, 'JPEG', 15, 15, 560, 810);
        deferred.resolve();
    });
}

// download-button est l'id du bouton qui va générer le PDF en cliquant dessus
document.getElementById('download-button').addEventListener('click', monPDF);

