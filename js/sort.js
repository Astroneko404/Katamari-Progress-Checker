function compareCheckbox(a, b) {
    return (a<b) ? -1 : (a>b) ? 1 : 0;
}

$("#sort_checkbox").click(function() {
    var table, switching, shouldSwitch, dir;
    table = document.getElementById("dataframe");
    switching = true;
    dir = $(this).attr("dir");

    while (switching) {
        $('.data_row:visible').each(function() {
            // shouldSwitch = false;
            var nextRow = $(this).nextAll('.data_row:visible').first();
            x = $(this).children("td").eq(5).children("input").is(':checked') ? 1 : 0;
            y = nextRow.children("td").eq(5).children("input").is(':checked') ? 1 : 0;

            // Is asc really necessary?
            if (dir == "asc") {
                switching = false;
                if (x > y) {
                    nextRow.insertBefore($(this));
                    switching = true;
                    // switchcount ++;
                    return false;
                }
            }
            else if (dir == "desc") {
                switching = false;
                if (x < y) {
                    nextRow.insertBefore($(this));
                    switching = true;
                    // switchcount ++;
                    return false;
                }
            }
            // console.log(switching);
        });
        // if (shouldSwitch) {
        //     rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        //     switching = true;
        //     switchcount ++;
        // } else {
    } // End of while loop
    // if (dir == "asc") {
    //     dir = "desc";
    //     // switching = true;
    // }
    // else if (dir == "desc") {
    //     dir = "asc";
    //     // switching = true;
    // }
});
