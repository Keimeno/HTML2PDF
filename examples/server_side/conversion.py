import pdfkit

# Creates a PDF file from a URL. 
pdfkit.from_url('https://en.wikipedia.org/wiki/Wiki', 'demo.pdf')

# Creates a PDF file from a file. 
pdfkit.from_file('../client_side/wiki.html', 'demo.pdf')