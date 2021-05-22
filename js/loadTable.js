var folder = "images/item collection with names/";

function appendTable(data) {
    // Loading table from JSON file
    var line;
    for (var i=0; i<data.length; i++) {
        line = $('<tr />')
        line.append("<td>" + data[i].Item + "</td>");
        line.append(
            '<td class="data-stage" rel="' + data[i].Place +
            '">' + data[i].Place + "</td>"
        );
        line.append("<td>" + data[i].Category + "</td>");
        line.append("<td>" + data[i].Level + "</td>");
        line.append("<td>" + data[i].Location + "</td>");
        line.append("<td></td>");
        $('tbody').append(line);
        // console.log(line);
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
        var newPath = folder + id.replace(/\s+/g, "_").replace(/"/g, "").toLowerCase() + ".PNG";
        image.src = newPath;
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

$("input:checkbox").click(function () {
    var showAll = true;
    $('tr').not('.first').hide();
    $('input[type=checkbox]').each(function () {
        if ($(this)[0].checked) {
            showAll = false;
            var status = $(this).attr('rel');
            var value = $(this).val();

            	$('td').each(function() {
              	if ($(this).attr('class') == status) {
                    if ($(this).attr('rel').includes(value)) {
                        $(this).parent('tr').show();
                    }
                }
              });
            /* $('td.' + status + '[rel="/.g' + value + '/.g"]').parent('tr').show() */;
        }
    });
    if(showAll){
        $('tr').show();
    }
});

window.onload = function() {
    $.getJSON("data/Katamari Cleaned.json", appendTable);
}
