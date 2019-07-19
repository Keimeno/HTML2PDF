# HTML2PDF
### Table of Contents
1. Client Side Setup
   1. jsPDF
   2. Example
2. Server Side Setup
   1. wkhtmltopdf
   2. Python (pdfkit module)
3. Pros and Cons
   1. jsPDF and html2canvas
   2. wkhtmltopdf
### Client Side Setup
#### jsPDF
Import the latest version to your page using a CDN.

`<script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>`

This Javascript library allows you to easily create PDF files and make it downloadable to the user.

As an example of this:

```
var doc = new jsPDF()

doc.text('Hello world!', 10, 10)
doc.save('a4.pdf')
```

Further examples can be found on their [documentation page](http://raw.githack.com/MrRio/jsPDF/master/docs/).
#### Example
The following example can be found [here](https://github.com/GeorgeWalt/HTML2PDF/blob/master/examples/client_side/conversion.js).

We will write a function that in this example will be called when the website content has been loaded.

1. We create a canvas using the library html2canvas, which we mus [download](https://github.com/niklasvh/html2canvas/releases/download/v1.0.0-rc.3/html2canvas.min.js) first. Keep in mind that you must use version 1.0.0 for this.
2. We then retrieve the jpeg image data from it.
3. Now we create a new jsPDF object with the parameters: `p`, `mm` and `a4`.
   1. With `p` we say the pdf should be in portrait mode.
   2. After that, we say with `mm` that we want to use millimeters to calculate with.
   3. In the end, we tell jsPDF with `a4` that we want a DIN-A4 sized page.
4. After this, we get the image and page height and width.
5. Then we calculate the ratio. We then use a ternary operator to determine if the ratio of imageWidth/imageHeight is bigger than the pageWidth/pageHeight. And if that's the case we set the `ratio` variable to the pageWidth/imageWidth, otherwise we set it to the pageHeight/imageHeight.
6. Now we use the `addImage()` function from our new jsPDF object. With it, we insert the image data. And insert the position.
7. In the end, we make the user download the pdf file by calling the `save()` function.

Here is the corresponding code to this example: 

```
function print() {
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
}
```
### Server Side Setup
#### wkhtmltopdf
wkhtmltopdf is an extensive command line tool, to render HTML to PDF, while using the QT WebKit Engine.

To setup, wkhtmltopdf download the binaries from [here](https://wkhtmltopdf.org/downloads.html). Choose a Stable version and your OS.

For Ubuntu/Debian just enter `sudo apt install wkhtmltopdf` into your command line.

After the install, add the `/bin/` folder of wkhtmltopdf to your PATH.

Now reload all your command line instances and you can now use it properly.

As an example, you can convert a webpage to a pdf file by entering: `wkhtmltopdf https://wikipedia.org/wiki/Wiki demo.pdf`. This will create the demo.pdf file in your current folder.

#### Python (pdfkit module)
If you want to use this for Python-specific there's the pdfkit module, which you can install with the pip packet manager. `pip install pdfkit`. But keep in mind, that you must install wkhtmltopdf as well to use it.

Here's a quick example of how you can convert a webpage to HTML with pdfkit: 

```
import pdfkit

# Creates a PDF file from a URL. 
pdfkit.from_url('https://en.wikipedia.org/wiki/Wiki', 'demo1.pdf')

# Creates a PDF file from a file. 
pdfkit.from_file('../client_side/wiki.html', 'demo2.pdf')
```
You have the options to convert a pdf file from a webpage or from a local HTML file.

This example in particular can be found [here](https://github.com/GeorgeWalt/HTML2PDF/blob/master/examples/server_side/conversion.py).
### Pros and Cons
#### jsPDF and html2canvas
1. Pros
   1. Utilizes User resources to convert the HTML file.
   2. Very flexible, and stores any CSS content as it makes a screenshot of the given section.
2. Cons
   1. Text and SVG files are not scaleable.
   2. The text is not highlightable.
   3. Content can get blurry.
   4. It doesn't support multiple pages.
   5. Extremely high file size.
#### wkhtmltopdf
1. Pros
   1. The text is highlightable.
   2. Text and SVG files are scaleable.
   3. Handles multiple pages very well.
   4. Small file size.
2. Cons
   1. Encoding errors can happen.
   2. Uses server resources.
