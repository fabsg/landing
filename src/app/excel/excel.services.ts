import * as ExcelJS from 'exceljs';

export class ExcelService {
  async generateExcel(data: any[], filePath: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contact');
    worksheet.columns = [
      {header: 'Nome', key: 'name', width: 30}, 
      {header: 'Cognome', key: 'surname', width: 30},
      {header: 'Email', key: 'email', width: 30},
      {header: 'Cellulare', key: 'phone', width: 30},
      {header: 'Preferenza di contatto', key: 'preferredContactDate', width: 30}
     ];
    worksheet.addRows(data);
    await workbook.xlsx.writeFile(`${filePath}`);
  }
}
