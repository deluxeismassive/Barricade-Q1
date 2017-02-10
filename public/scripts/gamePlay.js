generateGameBoard();
placeStartingPieces();
placeStartingWalls();
generateHighScoreBox();

function placeTest() {
  // $('#tr3 > #td2').addClass('uwallBot')
  $('#tr3 > #td1').append($('<div>', {class: 'upiece'}))
  //$('#tr3 > #td0').append($('<div>', {class: 'upiece'}))
  $('#tr2 > #td0').append($('<div>', {class: 'ypiece'}))
  $('#tr2 > #td2').addClass('uwallBot')
  $('#tr2 > #td2').addClass('uwallRyt')
  $('#tr2 > #td1').addClass('ywallRyt')
  // $('#tr3 > #td0').append($('<div>', {class: 'ypiece'}))
  // $('#tr3 > #td1').append($('<div>', {class: 'ypiece'}))
  // $('#tr3 > #td1').addClass('ywallRyt')
  // $('#tr1 > #td0').addClass('ywallBot')

}

//placeTest();
