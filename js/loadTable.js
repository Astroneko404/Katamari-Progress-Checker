var folder = "images/item collection with names/";
var table;

$(document).ready(function() {
    table = $('#dataframe').DataTable({
        ajax: {
            url: "data/Katamari Cleaned.json",
        },
        autoWidth: false,
        bSortable: false,
        bLengthChange: false,
        columnDefs: [{
            'targets': 5,
            'checkboxes': {
                'selectRow': true,
                'selectCallback': function(nodes, selected) {
                    if($('#show-selected').val() !== 'all') {
                        table.draw(false);
                    }
                }
            },
            'render': function (data, type, full, meta){
                 return '<input type="checkbox" class="check" value="" />';
             }
        }],
        columns: [
            { "data": "Item" },
            { "data": "Category" },
            { "data": "Level" },
            { "data": "Place" },
            { "data": "Location" }
            // { "defaultContent": '<input type="checkbox" value="">' }
        ],
        fixedColumns: {
            heightMatch: 'none'
        },
        fixedHeader: true,
        initComplete: function() {
            $("#dataframe thead tr:eq(1) th").each(function (i) {
                if (i == 2) {
                    var select = $('<select><option value=""></option></select>').appendTo($(this).empty()).on('change', function() {
                            var val = $(this).val();
                            // console.log(val);
                            table.column( i )
                                .search( val ? '^'+$(this).val()+'$' : val, true, false )
                                .draw();
                    });

                    table.column( i ).data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    });
                }
                else if (i == 3) {
                    var select = $('<select><option value=""></option></select>').appendTo($(this).empty()).on('change', function() {
                            var val = $(this).val();
                            // console.log(val);
                            table.column( i )
                                .search( val ? '^.*'+$(this).val()+'.*$' : val, true, false )
                                .draw();
                    });

                    select.append( '<option value="mas1">mas1</option><option value="mas2">mas2</option>' );
                    select.append( '<option value="mas3">mas3</option><option value="mas4">mas4</option>' );
                    select.append( '<option value="mas5">mas5</option><option value="mas6">mas6</option>' );
                    select.append( '<option value="mas7">mas7</option><option value="mas8">mas8</option>' );
                    select.append( '<option value="mas9">mas9</option><option value="mtm">mtm</option>' );
                    select.append( '<option value="cancer">cancer</option><option value="cygnus">cygnus</option>' );
                    select.append( '<option value="corona">corona</option><option value="pisces">pisces</option>' );
                    select.append( '<option value="virgo">virgo</option><option value="ursa major">ursa major</option>' );
                    select.append( '<option value="gemini">gemini</option><option value="taurus">taurus</option>' );
                    select.append( '<option value="eternal1">eternal1</option><option value="eternal2">eternal2</option>' );
                    select.append( '<option value="eternal3">eternal3</option>' );
                }
                else if (i == 5) {
                    var select = $('<select id="show-selected"><option value="all" selected>Show all</option><option value="selected">Selected</option></select>')
                    .appendTo($(this).empty()).on('change', function() {
                        var val = $(this).val();

                        // If all records should be displayed
                        if(val === 'all'){
                         $.fn.dataTable.ext.search.pop();
                         table.draw();
                        }

                        // If selected records should be displayed
                        if(val === 'selected'){
                         $.fn.dataTable.ext.search.pop();
                         $.fn.dataTable.ext.search.push(
                            function (settings, data, dataIndex){
                               // return ($(table.row(dataIndex).node()).hasClass('selected')) ? true : false;
                               // console.log( $('#dataframe tbody tr:eq(' + dataIndex + ') td:eq(5)').data() );
                               return ($(table.row(dataIndex).node()).hasClass('selected')) ? true : false;
                            }
                         );

                         table.draw();
                        }
                    });
                }
            });
        },
        lengthMenu: [[5], [5]],
        order: [[1, 'asc']],
        ordering: false,
        // orderCellsTop: true,
        select: {
         'style': 'multi'
        },
    });

} );

// Image Handler
$('#dataframe').on('click', 'tr', function () {
    var id = $(this).children(":first").text();
    var image = document.getElementById("preview");
    var newPath = folder + id.replace(/\s+/g, "_").replace(/"/g, "")
                .replace("#", "%23").replace("&", "%26").toLowerCase() + ".PNG";
    image.src = newPath;
});
$('#dataframe').on('click', 'thead', function () {
    var image = document.getElementById("preview");
    image.src = "images/cover.jpg";
});

// Checkbox
$("#dataframe").on("click", "input[type='checkbox']", function() {
    var tr = $(this).closest("tr");
    console.log("clicked");
    tr.toggleClass('selected');
});

$("#credits").on('click', function() {
    text = "This website is made by Astray404. All text data is provided" +
            "by Xeinok and all images are provided by @KatamariItems."
    alert(text);
});

// window.onload = function() {
//     $.getJSON("data/Katamari Cleaned.json", appendTable);
// }
