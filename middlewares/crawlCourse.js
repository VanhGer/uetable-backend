import cheerio from 'cheerio';
import { CUR_TERM_ID, START_TERM_ID } from '../constant.js';
async function getCoursebyStudentId(studentId) {
  try {
    const response = await fetch(`http://112.137.129.87/qldt/index.php?SinhvienLmh%5BmasvTitle%5D=${studentId}&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=0${CUR_TERM_ID}&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid&pageSize=50&r=sinhvienLmh%2Fadmin`);
    const html = await response.text();
    // Load HTML với Cheerio
    const $ = cheerio.load(html);

    // Lấy bảng đầu tiên có class là "item"
    const table = $('table.items').first();
    const tbody = table.find('tbody');
    const trElements = tbody.find('tr');
    //console.log(trElements.html());
    // Lưu trữ dữ liệu từ các thẻ <tr>
    const data = [];

    trElements.each((index, element) => {
      const row = {};
      const tdElements = $(element).find('td');
      tdElements.each((tdIndex, tdElement) => {
        if (tdIndex == 5) {
          const key = "class";
          const value = $(tdElement).text().trim();
          row[key] = value;
        } else if (tdIndex == 7) {
          const key = "group";
          const value = $(tdElement).text().trim();
          row[key] = value;
        }
      });

      data.push(row);

    });
    return data;
  } catch (error) {
    console.log('Đã xảy ra lỗi:', error);
  }
}

async function getAllCoursesbyStudentId(studentId) {
  try {
    const res = [];
    for (let term = START_TERM_ID; term <= CUR_TERM_ID; term++) {
      const response = await fetch(`http://112.137.129.87/qldt/index.php?SinhvienLmh%5BmasvTitle%5D=${studentId}&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=0${term}&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid&pageSize=50&r=sinhvienLmh%2Fadmin`);
      const html = await response.text();
      // Load HTML với Cheerio
      const $ = cheerio.load(html);
      
      // Lấy bảng đầu tiên có class là "item"
      const table = $('table.items').first();
      const tbody = table.find('tbody');
      const trElements = tbody.find('tr');
      //console.log(trElements.html());
      // Lưu trữ dữ liệu từ các thẻ <tr>
      const data = [];
  
      trElements.each((index, element) => {
        const row = {};
        const tdElements = $(element).find('td');
        tdElements.each((tdIndex, tdElement) => {
          if (tdIndex == 5) {
            const key = "class";
            const value = $(tdElement).text().trim();
            row[key] = value;
          } else if (tdIndex == 7) {
            const key = "group";
            const value = $(tdElement).text().trim();
            row[key] = value;
          }
        });
  
        data.push(row);
  
      });
      return data;
    }


  } catch (error) {
    console.log('Đã xảy ra lỗi:', error);
  }
}



export {getCoursebyStudentId}