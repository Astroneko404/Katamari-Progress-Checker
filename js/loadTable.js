var folder = "images/item collection with names/";

function appendTable(data) {
    // Loading table from JSON file
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
        // return false; // Test purpose
    }

    // Add event to rows
    picHandlers();
}

function picHandlers() {
  var table = document.getElementById("dataframe");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
      return function() {
        var id = row.getElementsByTagName("td")[0].innerHTML;
        var image = document.getElementById("preview");
        image.src = folder + id.toLowerCase().replace(" ", "_") + ".PNG";
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

window.onload = function() {
    $.getJSON("data/Katamari Cleaned.json", appendTable);
}
