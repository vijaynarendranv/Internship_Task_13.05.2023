function generateHTMLTable(data, config) {
  const table = document.createElement('table');
  table.border = 2
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table header
  const headerRow = document.createElement('tr');
  config.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column.HeaderName;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table rows
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    config.forEach((column, columnIndex) => {
      const td = document.createElement('td');
      const columnValue = typeof column.Column === 'function'
        ? column.Column(row)
        : row[column.Column];

      td.textContent = columnValue;

      // Merge cells if necessary
      
      if (column.Merge && index > 0 && row[column.Column] === data[index - 1][column.Column] && (columnIndex == 0 || row[ config[columnIndex - 1].Column] === data[index - 1][config[columnIndex - 1].Column] )) {
        console.log(data[index - 1][column.Column])
        var prevTd = tbody.children[index - 1].children[columnIndex];
        pid = 2;
        while(prevTd.style.display == 'none') {
          prevTd = tbody.children[index - pid].children[columnIndex];
          pid++;
        }
        prevTd.rowSpan++;
        
        td.style.display = 'none';
      }
      
      // else if(column.Merge && index > 0 && row[column.Column] === data[index - 1][column.Column] ) {
      //   console.log(data[index - 1][column.Column])
      //   const prevTd = tbody.children[index - 1].children[columnIndex];
      //   prevTd.rowSpan++;
      //   td.style.display = 'none';
      // }

      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}
// Example usage:
const data = [
  {"Organization":"Google","UserId":"akumar","UserName":"Ashok Kumar","Department":"Sales","Designation":"Sales","CheckInTime":1548909000000,"CheckOutTime":1548945000000},
  {"Organization":"Google","UserId":"akumar","UserName":"Ashok Kumar","Department":"Sales","Designation":"Sales","CheckInTime":1549081800000,"CheckOutTime":1549110600000},
  {"Organization":"FB","UserId":"phanis","UserName":"Phani Sai","Department":"Sales","Designation":"Sales","CheckInTime":1549081800000,"CheckOutTime":1549110600000},
  {"Organization":"FB","UserId":"phanis","UserName":"Phani Sai","Department":"Sales","Designation":"Sales","CheckInTime":1548909000000,"CheckOutTime":1548945000000},
  {"Organization":"FB","UserId":"phanis","UserName":"Phani Sai","Department":"Sales","Designation":"Sales","CheckInTime":1549081800000,"CheckOutTime":1549110600000},
  {"Organization":"FB","UserId":"lakshmig","UserName":"Laskhmi Gayathri","Department":"Quality","Designation":"QA Engineer","CheckInTime":1549081800000,"CheckOutTime":1549110600000},
  {"Organization":"FB","UserId":"lakshmig","UserName":"Laskhmi Gayathri","Department":"Quality","Designation":"QA Engineer","CheckInTime":1549081800000,"CheckOutTime":1549110600000}
];

const config = [
  {
    HeaderName: 'Organization',
    Column: 'Organization',
    Merge: true
  },
  {
    HeaderName: 'Department',
    Column: 'Department',
    Merge: true
  },
  {
    HeaderName: 'UserName',
    Column: 'UserName',
    Merge: true
  },
  {
    HeaderName: 'Date',
    Column: ({ CheckInTime }) => {
      return moment(CheckInTime).format("DD/MM/YYYY");
    },
    Merge: false
  },
  {
    HeaderName: 'Time',
    Column: ({ CheckInTime, CheckOutTime }) => {
      const secs = (CheckOutTime - CheckInTime) / 1000;
      const mins = secs / 60;
      const hours = Math.floor(mins / 60);
      const remainingMins = Math.floor(mins % 60);
      return hours + ' Hrs ' + remainingMins + ' Mins';
    },
    Merge: false
  }
];

const table = generateHTMLTable(data, config);
document.body.appendChild(table);
