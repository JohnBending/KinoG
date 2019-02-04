$(document).ready(function () {
    $('#submitButton').click(function () {
        var searchText = $('#searchText').val();
        if (searchText.length > 0) {
            ajaxReuest(searchText);
        } else {
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
                $.each(valFilm, function (keyAttr, valAttr) {


                    if (keyAttr === 'overview') {
                        keyAttr = "описание";
                        let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td>' + valAttr + '</td></tr>');
                        $filmTable.append($filtAttrTr);
                    }
                    if (keyAttr === 'vote_average') {
                        if (valAttr > 6) {
                            alert("Этот фильм  Неплох")
                        } else {
                            keyAttr = "оценка";
                            let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td>' + valAttr + '</td></tr>');
                            $filmTable.append($filtAttrTr);
                        }
                    }
                    if (keyAttr === 'backdrop_path') {
                        keyAttr = "постер";
                        let $filtAttrTr = $('<tr><td>' + keyAttr + '</td><td><img src="' + 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + valAttr + '"></td></tr>');
                        $filmTable.append($filtAttrTr);
                    }

                });
                $('#results').append($filmTable);
            });

        }
    });
}