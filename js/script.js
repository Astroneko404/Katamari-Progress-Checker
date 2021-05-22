var folder = "images/item collection with names/";

function appendTable(data) {
    // var table_content = document.getElementById("dataframe");
    var line;
    for (var i=0; i<data.length; i++) {
        line = $('<tr/>')
        line.append("<td>" + data[i].Item + "</td>");
        line.append("<td>" + data[i].Place + "</td>");
        line.append("<td>" + data[i].Category + "</td>");
        line.append("<td>" + data[i].Level + "</td>");
        line.append("<td>" + data[i].Location + "</td>");
        line.append("<td></td>");
        $('tbody').append(line);
        console.log(line);
        // return false; // Test purpose
    }
}

function showPic() {
    //

}

window.onload = function() {
    $.getJSON("data/Katamari Cleaned.json", appendTable);
}
