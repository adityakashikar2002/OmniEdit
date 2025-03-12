import pdfkit


html_content = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            color: black; 
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Hello, this is a test PDF</h1>
    <p>This should be visible now!</p>
</body>
</html>
"""
pdf = pdfkit.from_string(html_content, False)

with open("fixed.pdf", "wb") as f:
    f.write(pdf)

print("Generated fixed.pdf successfully.")
