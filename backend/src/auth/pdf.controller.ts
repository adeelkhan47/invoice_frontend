import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as puppeteer from 'puppeteer';

@Controller('pdf')
export class PdfController {
  @Get()
  async generatePdf(@Res() res: Response) {
    // Sample JSON data (replace this with your actual JSON data retrieval logic)
    const jsonData = {
      title: 'Sample PDF',
      content: 'This is a sample PDF generated from JSON data.',
    };

    // Generate HTML content from JSON data
    const htmlContent = `
      <html>
        <head><title>${jsonData.title}</title></head>
        <body>
          <h1>${jsonData.title}</h1>
          <p>${jsonData.content}</p>
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
