function generateGameBoard() {
  var $tab = $('<table>', {id: 'gameBoard'})

  $('#board').append($tab)
  for (i = 0; i < 5; i++) {
    $('#gameBoard').append($('<tr>', {id: 'tr'+i}))
    for (j = 0; j < 5; j++) {
      $('#tr'+ i).append($('<td></td>', {id: 'td'+j}))
    }
  }
  $('.rulesWindow').hide()
  $('.warning').hide()
  $('.winnersWindow').hide()
  attachListeners();
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

function generateHighScoreBox() {
  var $tab = $('<table>', {id: 'highScoreBoxGrid'})
  $.get( "https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/barricade_g43", function(data) {
    var sorted = data.sort(function(a, b) {
      return a.score - b.score;
    })
    $('#highScoreBox').append($tab)
    for (i = 0; i < sorted.length; i++) {
      $('#highScoreBoxGrid').append($('<tr>', {id: 'hstr'+i}))
      var $td = $('<td></td>')
      $('#hstr'+ i).append($td.text(sorted[i]['player_name']), {id: 'name'+i})
    }
    for (i = 0; i < 11; i++) {
      $('#highScoreBoxGrid').append($('<tr>', {id: 'hstr'+i}))
      var $td = $('<td></td>')
      $('#hstr'+ i).append($td.text(sorted[i]['score']), {id: 'name'+i})
    }
  });
}

//Click handlers for placing a wall after jump.
function attachListeners() {
  $(document).on('click', '#placeWallRight', function (event) {
    $('.temp').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
    scanYPiecesJ()
  })
  $(document).on('click', '#placeWallLeft', function (event) {
    if ($('.temp').find('#td0').length) {
      $('.temp').addClass('uwallLft')
    } else {
    $('.temp').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
    scanYPiecesJ()
  })
  $(document).on('click', '#placeWallBot', function (event) {
    $('.temp').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
    scanYPiecesJ()
  })
  $(document).on('click', '#placeWallTop', function (event) {
    var $id = $('.temp').attr('id')
    if ($('.temp').parent().find('#tr0').length) {
      $('.temp').addClass('uwallTop')
    } else {
      $('.temp').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
    scanYPiecesJ()
  })

  //TopWall Movement Handlers
  $(document).on('click', '#TlowerRight', function (event) {
    var $id = $('.selected').attr('id')
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#TlowerLeft', function (event) {
    var $id = $('.selected').attr('id')
    if ($('.selected').find('#td0').length) {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#TupperRight', function (event) {
    var $id = $('.selected').attr('id')
    $('.selected').removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#TupperLeft', function (event) {
    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if ($('.selected').find('#td0').length) {
      $('.selected').removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })

  //RightWall event Handlers

  $(document).on('click', '#RupperLeft', function (event) {
    var $id = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0').length) {
      $('.selected').removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#RupperRight', function (event) {
    var $nid = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0').length) {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$nid).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#RlowerLeft', function (event) {
    $('.selected').removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#RlowerRight', function (event) {
    $('.selected').prev().removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })

  //LeftWall movement event Handlers

  $(document).on('click', '#LupperLeft', function (event) {
    var $id = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0').length) {
      $('.selected').removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#LupperRight', function (event) {
    var $nid = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0').length) {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$nid).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#LlowerLeft', function (event) {
    $('.selected').removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#LlowerRight', function (event) {
    $('.selected').prev().removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })


  //BottomWall movement event Handlers

  $(document).on('click', '#BlowerRight', function (event) {
    var $id = $('.selected').attr('id')
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#BlowerLeft', function (event) {
    var $id = $('.selected').attr('id')
    if ($('.selected').find('#td0').length) {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#BupperRight', function (event) {
    var $id = $('.selected').attr('id')
    $('.selected').removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })
  $(document).on('click', '#BupperLeft', function (event) {
    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if ($('.selected').find('#td0').length) {
      $('.selected').removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    scanYPiecesJ()
  })

  //Generates the choices in the ChoiceBox or Jumps the piece or moves the piece

  $('td').click(function(event) {
    var $tar = $(this);
    if ($tar.is('.highlightCellPiece')) {
      movePiece($tar)
    } else if ($tar.is('.highlightCellJump')) {
        jumpPiece($tar)
    } else {
      $('td').removeClass('selected').removeClass('highlightCellJump').removeClass('highlightCellPiece').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
      $('.indicateRight').remove()
      $('.indicateLeft').remove()
      $('.indicateUp').remove()
      $('.indicateDown').remove()
      $('.choiceBox').empty()
      $tar.addClass('selected')
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
        $('.choiceBox').append($('<p>', {id: 'wlftp'}).text('Select your left wall'))
      }
      var $id = ($tar.attr('id'))
      if ($tar.parent().prev().find('#'+$id).is('.uwallBot')) {
        $('.choiceBox').append($('<p>', {id: 'wtopp', class: 'choice'}).text('Select your top wall'))
      }
    }
  })

  //Choice Box selection of TopWall and the highlighting of potential moves.
  $('.choiceBox').on('click', '#wtopp', function(event) {
    $('.indicateRight').remove()
    $('.indicateLeft').remove()
    $('.indicateUp').remove()
    $('.indicateDown').remove()
    var $id = $('.selected').attr('id')
    $('td').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
    $('td').removeClass('highlightCellPiece').removeClass('highlightCellJump')
    $('.selected').parent().prev().find('#'+$id).addClass('botwallchange')

    if (!$('.selected').filter('.ywallRyt').length && !$('.selected').filter('.uwallRyt').length) {
      $('.selected').append($('<div>', {class: 'indicateRight', id: 'TlowerRight'}))
    }

    if (!$('.selected').prev().filter('.ywallRyt').length && !$('.selected').prev().filter('.uwallRyt').length) {
      $('.selected').append($('<div>', {class: 'indicateLeft', id: 'TlowerLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $idp = $('.selected').prev().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallRyt').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallRyt').length) {
      $('.selected').parent().prev().find('#'+$id).append($('<div>', {class: 'indicateRight', id: 'TupperRight'}))
    }
    if (!$('.selected').parent().prev().find('#'+$idp).filter('.ywallRyt').length && !$('.selected').parent().prev().find('#'+$idp).filter('.uwallRyt').length) {
      $('.selected').parent().prev().find('#'+$id).append($('<div>', {class: 'indicateLeft', id: 'TupperLeft'}))
    }
  })

  //Choice Box selection of RightWall and the highlighting of potential moves.
  $('.choiceBox').on('click', '#wrytp', function(event) {
    $('.indicateRight').remove()
    $('.indicateLeft').remove()
    $('.indicateUp').remove()
    $('.indicateDown').remove()
    $('td').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
    $('td').removeClass('highlightCellPiece').removeClass('highlightCellJump')
    $('.selected').addClass('rytwallchange')

    if (!$('.selected').filter('.ywallBot').length && !$('.selected').filter('.uwallBot').length) {
      $('.selected').append($('<div>', {class: 'indicateDown', id: 'RlowerLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $nid = $('.selected').next().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallBot').length) {
      $('.selected').append($('<div>', {class: 'indicateUp', id: 'RupperLeft'}))
    }

    if (!$('.selected').parent().prev().find('#'+$nid).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$nid).filter('.uwallBot').length) {
      $('.selected').next().append($('<div>', {class: 'indicateUp', id: 'RupperRight'}))
    }

    if (!$('.selected').next().filter('.ywallBot').length && !$('.selected').next().filter('.uwallBot').length) {
      $('.selected').next().append($('<div>', {class: 'indicateDown', id: 'RlowerRight'}))
    }
  })
  //Choice Box selection of LeftWall and the highlighting of potential moves.
  $('.choiceBox').on('click', '#wlftp', function(event) {
    $('.indicateRight').remove()
    $('.indicateLeft').remove()
    $('.indicateUp').remove()
    $('.indicateDown').remove()
    $('td').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
    $('td').removeClass('highlightCellPiece').removeClass('highlightCellJump')
    $('.selected').prev().addClass('rytwallchange')

    if (!$('.selected').filter('.ywallBot').length && !$('.selected').filter('.uwallBot').length) {
      $('.selected').append($('<div>', {class: 'indicateDown', id: 'LlowerRight'}))
    }

    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallBot').length) {
      $('.selected').append($('<div>', {class: 'indicateUp', id: 'LupperRight'}))
    }

    if (!$('.selected').parent().prev().find('#'+$pid).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$pid).filter('.uwallBot').length) {
      $('.selected').prev().append($('<div>', {class: 'indicateUp', id: 'LupperLeft'}))
    }

    if (!$('.selected').prev().filter('.ywallBot').length && !$('.selected').prev().filter('.uwallBot').length) {
      $('.selected').prev().append($('<div>', {class: 'indicateDown', id: 'LlowerLeft'}))
    }
  })

  //Choice Box selection of BottomWall and the highlighting of potential moves.
  $('.choiceBox').on('click', '#wbotp', function(event) {
    $('.indicateRight').remove()
    $('.indicateLeft').remove()
    $('.indicateUp').remove()
    $('.indicateDown').remove()
    $('td').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
    $('td').removeClass('highlightCellPiece').removeClass('highlightCellJump')
    $('.selected').addClass('botwallchange')

    if (!$('.selected').filter('.ywallRyt').length && !$('.selected').filter('.uwallRyt').length) {
      $('.selected').append($('<div>', {class: 'indicateRight', id: 'BupperRight'}))
    }

    if (!$('.selected').prev().filter('.ywallRyt').length && !$('.selected').prev().filter('.uwallRyt').length) {
      $('.selected').append($('<div>', {class: 'indicateLeft', id: 'BupperLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $idp = $('.selected').prev().attr('id')
    if (!$('.selected').parent().next().find('#'+$id).filter('.ywallRyt').length && !$('.selected').parent().next().find('#'+$id).filter('.uwallRyt').length) {
      $('.selected').parent().next().find('#'+$id).append($('<div>', {class: 'indicateRight', id: 'BlowerRight'}))
    }
    if (!$('.selected').parent().next().find('#'+$idp).filter('.ywallRyt').length && !$('.selected').parent().next().find('#'+$idp).filter('.uwallRyt').length) {
      $('.selected').parent().next().find('#'+$id).append($('<div>', {class: 'indicateLeft', id: 'BlowerLeft'}))
    }
  })

  //Choice Box selection of Piece and the highlighting of potential moves.
  $('.choiceBox').on('click', '#piecep', function(event) {
    $('.indicateRight').remove()
    $('.indicateLeft').remove()
    $('.indicateUp').remove()
    $('.indicateDown').remove()
    $('td').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
    $('td').removeClass('highlightCellPiece').removeClass('highlightCellJump')
    $('.selected').children().addClass('upiecechange')

    if (!$('.selected').prev().find('div').length && !$('.selected').prev().filter('.ywallRyt').length) {
      $('.selected').prev().addClass('highlightCellPiece')
    }

    if ($('.selected').prev().find('.ypiece').length && !$('.selected').prev().filter('.ywallRyt').length && !$('.selected').prev().prev().filter('.ywallRyt').length && !$('.selected').prev().prev().find('div').length) {
      $('.selected').prev().prev().addClass('highlightCellJump')
    }

    if (!$('.selected').next().find('div').length && !$('.selected').filter('.ywallRyt').length) {
      $('.selected').next().addClass('highlightCellPiece')
    }

    if ($('.selected').next().find('.ypiece').length && !$('.selected').filter('.ywallRyt').length && !$('.selected').next().filter('.ywallRyt').length && !$('.selected').next().next().find('div').length) {
      $('.selected').next().next().addClass('highlightCellJump')
    }

    var $id = $('.selected').attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).find('div').length && !$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length) {
      $('.selected').parent().prev().find('#'+$id).addClass('highlightCellPiece')
    }

    var $id = $('.selected').attr('id')
    if ($('.selected').parent().prev().find('#'+$id).find('.ypiece').length && !$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().prev().find('#'+$id).find('div').length) {
      $('.selected').parent().prev().prev().find('#'+$id).addClass('highlightCellJump')
    }

    if (!$('.selected').parent().next().find('#'+$id).find('div').length && !$('.selected').filter('.ywallBot').length) {
      $('.selected').parent().next().find('#'+$id).addClass('highlightCellPiece')
    }

    if ($('.selected').parent().next().find('#'+$id).find('.ypiece').length && !$('.selected').filter('.ywallBot').length && !$('.selected').parent().next().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().next().next().find('#'+$id).find('div').length) {
      $('.selected').parent().next().next().find('#'+$id).addClass('highlightCellJump')
    }
  })

  $('.rulesButton').on('click', function() {
    $('.rulesWindow').show()
  })

  $('.hideButton').on('click', function() {
    $('.rulesWindow').hide()
  })

  $('.winnerButton').on('click', function() {
    if ($('.winnersName').text() === "") {
      $('.warning').fadeIn(1000)
      $('.warning').fadeOut(1000)
    }
    else {

    var load = JSON.stringify({"game_name": "barricade_g43", "player_name":$('.winnersName').text(), "score": parseInt($('.scoreBox').text())})

    $.ajax("https://galvanize-leader-board.herokuapp.com/api/v1/leader-board",
      {contentType: 'application/json', data:load, method:"POST"})
      .then(function(data) {
        console.log(data);
      })
    }
    $('.winnersWindow').hide()
    $(document).empty()
    generateGameBoard()
  })
}


//Highlighted Piece destination.  Moving a peice to that destination.
function movePiece($dest) {
  $('.selected').addClass('.degeneratePiece')
  $('.selected').empty()
  $dest.append($('<div>', {class: 'upiece'}))
  $('td').removeClass('selected').removeClass('highlightCellJump').removeClass('highlightCellPiece').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
  $('.choiceBox').empty()
  scanYPiecesJ()
}

function jumpPiece($dest) {
  $('.selected').addClass('.degeneratePiece')
  $('.selected').empty()
  $dest.append($('<div>', {class: 'upiece'}))
  $('td').removeClass('highlightCellJump').removeClass('highlightCellPiece').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
  $('.choiceBox').empty()
  $dest.addClass('temp')
  addWall($dest)
}

function addWall($dest) {
  if (!$dest.filter('.ywallRyt').length && !$dest.filter('.uwallRyt').length) {
    $dest.append($('<div>', {class: 'indicateRight', id: 'placeWallRight'}))
  }
  if (!$dest.filter('.ywallBot').length && !$dest.filter('.uwallBot').length) {
    $dest.append($('<div>', {class: 'indicateDown', id: 'placeWallBot'}))
  }
  if (!$dest.prev().filter('.ywallRyt').length && !$dest.prev().filter('.uwallRyt').length) {
    $dest.append($('<div>', {class: 'indicateLeft', id: 'placeWallLeft'}))
  }
  var $id = $dest.attr('id')
  if (!$dest.parent().prev().find('#'+$id).filter('.ywallBot').length && !$dest.parent().prev().find('#'+$id).filter('.uwallBot').length) {
    $dest.append($('<div>', {class: 'indicateUp', id: 'placeWallTop'}))
  }
}
