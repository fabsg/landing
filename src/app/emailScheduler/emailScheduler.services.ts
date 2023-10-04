import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import { ExcelService } from '../excel/excel.services';
import { LandingService } from '../landing/landing.services';

@Injectable()
export class EmailSchedulerService {
  private transporter: nodemailer.Transporter;

  constructor(private landingService: LandingService, 
    private excelService: ExcelService
     ) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_SENDER_USER,
        pass: process.env.EMAIL_SENDER_PASS,
      },
    });
  }

  @Cron('0 45 14 * * *')
  async sendEmailWithCSV() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const contactData = await this.landingService.fetchData() || [];
    await this.excelService.generateExcel(contactData, process.env.PATH_NAME_FOR_XLSX);
    const mailOptions = {
      from: process.env.EMAIL_SENDER_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Contatti raccolti al ${formattedDate} ${formattedTime}`,
      text: '"Questa è una email autogenerata. Si prega di non rispondere a questo indirizzo email."',
      attachments: [
        {
          filename: process.env.XLSX_NAME,
          path: process.env.PATH_NAME_FOR_XLSX
        }
      ],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email programmata con CSV allegato inviata:', info);
    } catch (error) {
      console.log('Errore nell\'invio dell\'email programmata:', error);
    }
  }

}
