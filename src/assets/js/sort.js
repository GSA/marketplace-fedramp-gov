function sortCol(n, isNum = false, tableType = 'desktop') {
   
    var table = document.getElementById("sort-table-" + tableType);
    var header = document.getElementById("sort-header-" + n + "-" + tableType);
    var headers = document.getElementsByClassName("sort-header-" + tableType);

    var isSortNone = header.classList.contains("sort-none");
    var isSortAsc = header.classList.contains("sort-ascending");
    var headerSortNew = "sort-ascending";
    
    var sortCol = "sort-col-" + n + "-" + tableType;

    const kids = table.children;

    var rows = [];
    var vals = [];

    for (let i = 0; i < kids.length; i++) {
        rows[i] = kids[i].outerHTML;
        vals[i] = kids[i].getElementsByClassName(sortCol)[0].textContent;
    }
    
    if(isSortNone == true) {

        if(isNum == true) {
            quickSortInt(rows, vals, 0, vals.length-1);
        } else {
            quickSort(rows, vals, 0, vals.length-1);
        }
        table.innerHTML = rows.join('').replace(/=\"\"/g,'');

    } else {

        table.innerHTML = rows.reverse().join('').replace(/=\"\"/g,'');
    }

    for(let i = 0; i < headers.length; i++) {
        headers[i].className = "sort-header-" + tableType + " cursor-pointer sort-none";
    }

    if(isSortAsc == true) {
        headerSortNew = "sort-descending";
    }

    header.classList.remove("sort-none");
    header.classList.add(headerSortNew);
}


// partition and quickSort(below) for strings
function partition(rows, vals, left, right) {

    let i = left;
    let j = right;
    
    let pivot = vals[Math.floor((i+j) / 2)];

    while(i <= j) {

        while(vals[i] < pivot) {
            i++;
        }

        while(vals[j] > pivot) {
            j--;
        }

        if(i <= j) {
            [vals[i], vals[j]] = [vals[j], vals[i]];
            [rows[i], rows[j]] = [rows[j], rows[i]];
            i++;
            j--;
        }
    }

    return i;
}

function quickSort(rows, vals, left, right) {

    let index;

    if(vals.length > 1) {
        index = partition(rows, vals, left, right);

        if(left < index-1) {
            quickSort(rows, vals, left, index-1);
        }

        if(index < right) {
            quickSort(rows, vals, index, right);
        }
    }

    return rows, vals;
}

// partition and quickSort (below) for integers
function partitionInt(rows, vals, left, right) {

    let i = left;
    let j = right;
    
    let pivot = parseInt(vals[Math.floor((i+j) / 2)]);

    while(i <= j) {

        while(parseInt(vals[i]) < pivot) {
            i++;
        }

        while(parseInt(vals[j]) > pivot) {
            j--;
        }

        if(i <= j) {
            [vals[i], vals[j]] = [vals[j], vals[i]];
            [rows[i], rows[j]] = [rows[j], rows[i]];
            i++;
            j--;
        }
    }

    return i;
}

function quickSortInt(rows, vals, left, right) {

    let index;

    if(vals.length > 1) {
        index = partitionInt(rows, vals, left, right);

        if(left < index-1) {
            quickSortInt(rows, vals, left, index-1);
        }

        if(index < right) {
            quickSortInt(rows, vals, index, right);
        }
    }

    return rows, vals;
}
