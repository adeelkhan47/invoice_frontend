import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import * as puppeteer from 'puppeteer';

@Controller('pdf')
export class PdfController {
  @Post()
  async generatePdf(@Req() req: Request, @Res() res: Response) {
    const htmlContent =
      `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th,
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .total {
            font-weight: bold;
            font-size: 18px;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice Details</h1>
    
          <table>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Subcontractor Name</td>
              <td id="subcontractorName"></td>
            </tr>
            <tr>
              <td>Invoice Number</td>
              <td id="invoiceNumber"></td>
            </tr>
            <tr>
              <td>Customer Name</td>
              <td id="customerName"></td>
            </tr>
            <tr>
              <td>Email Address</td>
              <td id="emailAddress"></td>
            </tr>
            <tr>
              <td>Total Amount Due</td>
              <td id="totalAmountDue"></td>
            </tr>
          </table>
    
          <h2>Service Description</h2>
          <table>
            <tr>
              <th>Date</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tbody id="serviceDescriptionRows"></tbody>
            <tr class="total">
              <td colspan="3">Subtotal</td>
              <td id="serviceDescriptionSubtotal"></td>
            </tr>
          </table>
    
          <h2>Materials and Parts</h2>
          <table>
            <tr>
              <th>Date</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tbody id="materialsAndPartsRows"></tbody>
            <tr class="total">
              <td colspan="3">Subtotal</td>
              <td id="materialsAndPartsSubtotal"></td>
            </tr>
          </table>
    
          <h2>Parking and Tolls</h2>
          <table>
            <tr>
              <th>Date</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
            <tbody id="parkingAndTollsRows"></tbody>
            <tr class="total">
              <td colspan="3">Subtotal</td>
              <td id="parkingAndTollsSubtotal"></td>
            </tr>
          </table>
    
          <p class="total">Total Amount: <span id="invoiceTotalAmount"></span></p>
        </div>
    
        <script>
          var jsonData = ` +
      JSON.stringify(req.body) +
      `;

          function populateTable() {
            document.getElementById("subcontractorName").textContent =
              jsonData.subcontractorName;
            document.getElementById("invoiceNumber").textContent =
              jsonData.invoiceNumber;
            document.getElementById("customerName").textContent =
              jsonData.customerName;
            document.getElementById("emailAddress").textContent =
              jsonData.emailAddress;
            document.getElementById("totalAmountDue").textContent =
              jsonData.totalAmountDue;
    
            populateRows(
              jsonData.serviceDescription,
              "serviceDescriptionRows",
              "serviceDescriptionSubtotal"
            );
            populateRows(
              jsonData.materialsAndParts,
              "materialsAndPartsRows",
              "materialsAndPartsSubtotal"
            );
            populateRows(
              jsonData.parkingAndTolls,
              "parkingAndTollsRows",
              "parkingAndTollsSubtotal"
            );
    
            document.getElementById("invoiceTotalAmount").textContent =
              jsonData.invoiceTotalAmount;
          }
    
          function populateRows(data, tbodyId, subtotalId) {
            var tbody = document.getElementById(tbodyId);
            var subtotal = 0;
    
            data.forEach(function (item) {
              var row = "<tr>";
              row += "<td>" + item.date + "</td>";
              row += "<td>" + item.quantity + "</td>";
              row += "<td>" + item.rate + "</td>";
              row += "<td>" + item.amount + "</td>";
              row += "</tr>";
              tbody.innerHTML += row;
    
              subtotal += item.amount;
            });
    
            document.getElementById(subtotalId).textContent = subtotal;
          }
    
          populateTable();
        </script>
      </body>
    </html>
    `;

    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set content and generate PDF
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      path: 'mypdf.pdf',
      format: 'A4',
      printBackground: true,
    });

    // Close browser
    await browser.close();

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="sample.pdf"');

    // Send PDF buffer as response
    res.send(pdfBuffer);
  }
}
