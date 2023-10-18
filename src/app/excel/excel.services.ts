import * as ExcelJS from 'exceljs';

export class ExcelService {

  async generateExcel(data: any[]): Promise<{ filename: string, content }> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contact');
    worksheet.columns = [
      { header: 'Nome', key: 'name', width: 30 },
      { header: 'Cognome', key: 'surname', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Cellulare', key: 'phone', width: 30 },
      { header: 'Data di creazione', key: 'createdAt', width: 30 }
    ];
    worksheet.addRows(data);
    const excelBuffer = await workbook.xlsx.writeBuffer();
    return {
      filename: 'contacts.xlsx',
      content: excelBuffer
    };
  }
}
