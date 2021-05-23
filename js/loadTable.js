var folder = "images/item collection with names/";

function appendTable(data) {
    // Loading table from JSON file
    var line;
    for (var i = 0; i < data.length; i++) {
        line = $(
            '<tr class="data_row" data_place="' + data[i].Place + '"' +
            ' data_level="' + data[i].Level + '"' +
             '/>')
        line.append("<td>" + data[i].Item + "</td>");
        // line.append(
        //     '<td class="data-stage" rel="' + data[i].Place +
        //     '">' + data[i].Place + "</td>"
        // );
        line.append("<td>" + data[i].Place + "</td>")
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
        var newPath = folder + id.replace(/\s+/g, "_").replace(/"/g, "")
            .replace("#", "%23").replace("&", "%26").toLowerCase() + ".PNG";
        console.log(newPath);
        image.src = newPath;
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

document.getElementById("submit_button").onclick = function() {
    var showAll = true;
    $('tr').not('.first').hide();
    var checkListStage = new Array();
    var checkListLevel = new Array();
    var checked = false;

    // Read through each checkbox
    $('input[type=checkbox]').each(function () {
        if ($(this)[0].checked) {
            if ($(this).attr('class') == 'check_stage')  {
                checkListStage.push($(this).attr('value'));
            }
            else if ($(this).attr('class') == 'check_level') {
                checkListLevel.push($(this).attr('value'));
            }
            else {}
        }
    });

    //
    if (checkListStage.length > 0 && checkListLevel.length > 0) {
        showAll = false;
        $('.data_row').each(function() {
            showStage = false;
            showLevel = false;
            for (var i = 0; i < checkListStage.length; i++) {
                if ($(this).attr('data_place').includes(checkListStage[i])) {
                    showStage = true;
                    break;
                }
            }
            for (var j = 0; j < checkListLevel.length; j++) {
                if ($(this).attr('data_level') == checkListLevel[j]) {
                    showLevel = true;
                    break;
                }
            }
            if (showStage == true && showLevel == true) {
                $(this).show();
            }
        });
    }
    else if (checkListStage.length > 0 && checkListLevel.length == 0) {
        showAll = false;
        $('.data_row').each(function() {
            for (var i = 0; i < checkListStage.length; i++) {
                if ($(this).attr('data_place').includes(checkListStage[i])) {
                    $(this).show();
                    break;
                }
            }
        });
    }
    else if (checkListStage.length == 0 && checkListLevel.length > 0) {
        showAll = false;
        $('.data_row').each(function() {
            for (var j = 0; j < checkListLevel.length; j++) {
                if ($(this).attr('data_level') == checkListLevel[j]) {
                    $(this).show();
                    break;
                }
            }
        });
    }

    if(showAll){
        $('tr').show();
    }
};

$(".level_filter_area").hide();

$('#stage_button').on('click', function() {
    $(".level_filter_area").hide();
    $(".stage_filter_area").show();
});

$("#map_button").on('click', function() {
    $(".level_filter_area").show();
    $(".stage_filter_area").hide();
});
window.onload = function() {
    $.getJSON("data/Katamari Cleaned.json", appendTable);
}
