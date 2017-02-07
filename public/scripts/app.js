function generateGameBoard() {
  var $tab = $('<table>', {id: 'gameBoard'})
  // var $tr = $('<tr></tr>')
  // var $td = $('<td></td>')
  $('#board').append($tab)
  for (i = 0; i < 5; i++) {
    $('#gameBoard').append($('<tr>', {id: 'tr'+i}))
    for (j = 0; j < 5; j++) {
      $('#tr'+ i).append($('<td></td>', {id: 'td'+j}))
    }
  }
}

function placeStartingPieces() {
  for (i = 0; i < 5; i++) {
    $(`#tr4 > #td${i}`).append($('<div>', {class: 'upiece'}))
  }
  for (i = 0; i < 5; i++) {
    $(`#tr0 > #td${i}`).append($('<div>', {class: 'ypiece'}))
  }
}

function placeStartingWalls() {
  for (i = 1; i < 4; i++) {
    $(`#tr1 > #td${i}`).addClass('ywallBot')
  }
  for (i = 1; i < 4; i++) {
    $(`#tr2 > #td${i}`).addClass('uwallBot')
  }
}

function placeTest() {
  $('#tr2 > #td2').addClass('uwallRyt')
  $('#tr3 > #td2').addClass('uwallBot')
}

generateGameBoard();
placeStartingPieces();
placeStartingWalls();

placeTest();


$('td').click(function(event) {
  $('.choiceBox').empty()
  var $tar = $(this);
  //console.log('ping');
  if ($tar.children().is('.upiece')) {
    $('.choiceBox').append($('<p>', {id: 'piecep'}).text('Select your piece'))
  };
  if ($tar.is('.uwallBot')) {
    $('.choiceBox').append($('<p>', {id: 'wbotp'}).text('Select your bottom wall'))
  }
  if ($tar.is('.uwallRyt')) {
    $('.choiceBox').append($('<p>', {id: 'wrytp'}).text('Select your right wall'))
  }
  if ($tar.prev().is('.uwallRyt'))  {
    $('.choiceBox').append($('<p>', {id: 'wltfp'}).text('Select your left wall'))
  }
  var $id = ($tar.attr('id'))
  if ($tar.parent().prev().find('#'+$id).is('.uwallBot')) {
    $('.choiceBox').append($('<p>', {id: 'wtopp'}).text('Select your top wall'))
  }
})
