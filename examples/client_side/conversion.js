function print() {
    setTimeout(function () {
        html2canvas(document.querySelector("body")).then(canvas => {
            var imgData = canvas.toDataURL("image/jpeg");
            var pdf = new jsPDF("p", "mm", "a4");
            var pageWidth = pdf.internal.pageSize.width;
            var pageHeight = pdf.internal.pageSize.height;
            var imageWidth = canvas.width;
            var imageHeight = canvas.height;

            var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
            pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);
            pdf.save("demo.pdf");
        });
    },500);
}