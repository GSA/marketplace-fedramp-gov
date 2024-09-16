// function csvFromFilteredData(page) {

//     let csv = "data:text/csv;charset=utf-8,";
//     var table = document.getElementById("sort-table-desktop");

//     const kids = table.children;

//     var headers = document.getElementsByClassName("csv-header");

//     var csvHeader = "";
//     var csvRow = "";

//     for (let i = 0; i < headers.length; i++) {

//         if (i > 0) {
//             csvHeader += ","
//         }
//         csvHeader += "\"" + headers[i].innerHTML.replace(/['"]+/g, '') + "\"";
//     }
//     csv += csvHeader + '\r\n';

//     for (let i = 0; i < kids.length; i++) {

//         csvRow = "";

//         if(kids[i].classList.contains("d-none") == false && kids[i].classList.contains("d-search-none") == false ) {
            
//             var csvData = kids[i].getElementsByClassName("csv-data");
            
//             for(let j = 0; j < csvData.length; j++) {
            
//                 if (j > 0) {
//                     csvRow += ",";
//                 }
//                 csvRow += "\"" + csvData[j].textContent.replace(/['"]+/g, '') + "\"";
//             }
//             csv += csvRow + "\r\n";
//         }
//     };


//     var date = new Date();
//     var stamp = date.getFullYear().toString() + 
//                 zeroPad(date.getMonth() + 1) + 
//                 zeroPad(date.getDate()) + "-" +
//                 zeroPad(date.getHours()) + 
//                 zeroPad(date.getMinutes()) + 
//                 zeroPad(date.getSeconds());

//     var uri = encodeURI(csv);
//     // window.open(uri);

//     var csvDownload = document.createElement("a");
//     csvDownload.setAttribute("href", uri);
//     csvDownload.setAttribute("download", page + "-" + stamp + ".csv");

//     document.body.appendChild(csvDownload);
//     csvDownload.click();
//     document.body.removeChild(csvDownload);

// }

// function zeroPad(n) {
//     return n < 10 ? '0' + n : n 
// }
