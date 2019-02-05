$(document).ready(function () {
    $('#submitButton').click(function () {
        var searchText = $('#searchText').val();
        if (searchText.length > 0) {
            ajaxReuest(searchText);
        } else {
//    better print error nearby input in red color, add hidden block for error and show it if error         
            alert("Введите название фильма");
        }
    });

    $('#resetButton').click(function () {
        $('#searchText').val('');
        $('#results').html('');
    });
});

function ajaxReuest(term) {
    $.ajax({
        type: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi',
        data: {'query': term, 'language': 'ru-RU', 'api_key': 'd272326e467344029e68e3c4ff0b4059'},
        success: function (data) {
            $.each(data.results, function (keyFilm, valFilm) {

                var $filmTable = $('<table class="table" align="center"></table>');
//                 you can get attribute value by direct reference to attribute instead of loop and if
//                 if (valFilm.overview) check if attr is not empty
//                 {
//                 let $filtAttrTr = $('<tr><td>' + "описание" + '</td><td>' + valAttr + '</td></tr>');
//                         $filmTable.append($filtAttrTr);
//                 }
                
                $.each(valFilm, function (keyAttr, valAttr) {


                    if (keyAttr === 'overview') {
                        keyAttr = "описание";
                        let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td>' + valAttr + '</td></tr>');
                        $filmTable.append($filtAttrTr);
                    }
                    if (keyAttr === 'vote_average') {
                        if (valAttr > 6) {
//                          alert for every film looks strangely
//                          better print it using html on the page                
                            alert("Этот фильм  Неплох")
                        } else {
                            keyAttr = "оценка";
                            let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td>' + valAttr + '</td></tr>');
                            $filmTable.append($filtAttrTr);
                        }
                    }
                    if (keyAttr === 'backdrop_path') {
                        keyAttr = "постер";
//                      move prefix of image url to constant variable to escape copy past
//                         const varName = varValue
                        let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td><img src="' + 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + valAttr + '"></td></tr>');
                        $filmTable.append($filtAttrTr);
                    }

                });
                $('#results').append($filmTable);
            });

        }
    });
}
