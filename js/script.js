function appendTable(data) {
    // var item = `${data.Item}`
    var table_content = document.getElementById("dataframe");
    console.log(table_content);
}

// $.getJSON( , function(data) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<tr><td>" + key + "'>" + val + "</li>" );
//   });
//
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });

window.onload = function() {
    $.getJSON("Katamari Cleaned.json", appendTable);
}
