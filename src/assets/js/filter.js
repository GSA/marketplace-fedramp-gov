function filterRows(filterClass, tableType = 'desktop') {

    var clear = document.getElementById("clear-all-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);
    var filter = document.getElementById(filterClass);

    const kids = table.children;
    var rows = [];

    clear.classList.remove("d-none");
    table.classList.toggle(filterClass);
    filter.classList.toggle("filter-on");
    
    var filterClass = table.getAttribute('class');
    var filterClasses = filterClass.split(' ');

    for (let i = 0; i < kids.length; i++) {

        kids[i].classList.remove("d-none");

        if(filterClass != '') {

            if(filterClasses.some(filterClass => kids[i].classList.contains(filterClass) == false)) {

                kids[i].classList.add("d-none");
            }
        }
        rows[i] = kids[i].outerHTML;
    }

    if(filterClass == '') {
        clear.classList.add("d-none");
    }

    table.innerHTML = rows.join('').replace(/=\"\"/g,'');
}

function clearFilter(tableType = 'desktop') {

    var clear = document.getElementById("clear-all-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);

    const kids = table.children;

    clear.classList.add("d-none");
    table.className = "";

    var rows = [];

    for (let i = 0; i < kids.length; i++) {
        rows[i] = kids[i].outerHTML;
    }

    table.innerHTML = rows.join('').replace(/d-none/g,'');
}