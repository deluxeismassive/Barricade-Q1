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

function placeTest() {
  $('#tr3 > #td2').addClass('uwallBot')
  $('#tr1 > #td0').append($('<div>', {class: 'upiece'}))
  $('#tr1 > #td1').append($('<div>', {class: 'upiece'}))
  $('#tr3 > #td2').append($('<div>', {class: 'upiece'}))
  $('#tr0 > #td1').addClass('uwallBot')
  $('#tr4 > #td3').addClass('uwallRyt')
  $('#tr3 > #td0').append($('<div>', {class: 'ypiece'}))
  $('#tr3 > #td1').append($('<div>', {class: 'ypiece'}))
  $('#tr3 > #td1').addClass('ywallRyt')
  //$('#tr1 > #td0').addClass('ywallBot')
}

placeTest();

//Click handlers for placing a wall after jump.
function attachListeners() {
  $(document).on('click', '#placeWallRight', function (event) {
    $('.temp').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
  })
  $(document).on('click', '#placeWallLeft', function (event) {
    if ($('.temp').find('#td0')) {
      $('.temp').addClass('uwallLft')
    } else {
    $('.temp').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
  })
  $(document).on('click', '#placeWallBot', function (event) {
    $('.temp').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
  })
  $(document).on('click', '#placeWallTop', function (event) {
    var $id = $('.temp').attr('id')
    if ($('.temp').parent().find('#tr0')) {
      $('.temp').addClass('uwallTop')
    } else {
      $('.temp').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
    $('.temp').removeClass('temp')
  })

  //TopWall Movement Handlers
  $(document).on('click', '#TlowerRight', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#TlowerLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    if ($('.selected').find('#td0')) {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#TupperRight', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    $('.selected').removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#TupperLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if ($('.selected').find('#td0')) {
      $('.selected').removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })

  //RightWall event Handlers

  $(document).on('click', '#RupperLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0')) {
      $('.selected').removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#RupperRight', function (event) {
    console.log('ping');
    var $nid = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0')) {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$nid).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#RlowerLeft', function (event) {
    console.log('ping');
    $('.selected').removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#RlowerRight', function (event) {
    console.log('ping');
    $('.selected').prev().removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })

  //LeftWall movement event Handlers

  $(document).on('click', '#LupperLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0')) {
      $('.selected').removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$id).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#LupperRight', function (event) {
    console.log('ping');
    var $nid = $('.selected').attr('id')
    if ($('.selected').parent().find('#tr0')) {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').addClass('uwallTop')
    } else {
      $('.selected').prev().removeClass('uwallRyt')
      $('.selected').parent().prev().find('#'+$nid).addClass('uwallBot')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#LlowerLeft', function (event) {
    console.log('ping');
    $('.selected').removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#LlowerRight', function (event) {
    console.log('ping');
    $('.selected').prev().removeClass('uwallRyt')
    $('.selected').addClass('uwallBot')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })


  //BottomWall movement event Handlers

  $(document).on('click', '#BlowerRight', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#BlowerLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    if ($('.selected').find('#td0')) {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
      $('.selected').parent().prev().find('#'+$id).removeClass('uwallBot')
      $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#BupperRight', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    $('.selected').removeClass('uwallBot')
    $('.selected').addClass('uwallRyt')
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })
  $(document).on('click', '#BupperLeft', function (event) {
    console.log('ping');
    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if ($('.selected').find('#td0')) {
      $('.selected').removeClass('uwallBot')
      $('.selected').addClass('uwallLft')
    } else {
    $('.selected').removeClass('uwallBot')
    $('.selected').prev().addClass('uwallRyt')
    }
    event.stopImmediatePropagation()
    $('.choiceBox').empty()
  })

  //Generates the choices in the ChoiceBox

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
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateRight', id: 'TlowerRight'}))
    }

    if (!$('.selected').prev().filter('.ywallRyt').length && !$('.selected').prev().filter('.uwallRyt').length) {
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateLeft', id: 'TlowerLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $idp = $('.selected').prev().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallRyt').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallRyt').length) {
      console.log('pong');
      $('.selected').parent().prev().find('#'+$id).append($('<div>', {class: 'indicateRight', id: 'TupperRight'}))
    }
    if (!$('.selected').parent().prev().find('#'+$idp).filter('.ywallRyt').length && !$('.selected').parent().prev().find('#'+$idp).filter('.uwallRyt').length) {
      console.log('pongpong');
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
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateDown', id: 'RlowerLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $nid = $('.selected').next().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallBot').length) {
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateUp', id: 'RupperLeft'}))
    }

    if (!$('.selected').parent().prev().find('#'+$nid).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$nid).filter('.uwallBot').length) {
      console.log('ping');
      $('.selected').next().append($('<div>', {class: 'indicateUp', id: 'RupperRight'}))
    }

    if (!$('.selected').next().filter('.ywallBot').length && !$('.selected').next().filter('.uwallBot').length) {
      console.log('ping');
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
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateDown', id: 'LlowerRight'}))
    }

    var $id = $('.selected').attr('id')
    var $pid = $('.selected').prev().attr('id')
    if (!$('.selected').parent().prev().find('#'+$id).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$id).filter('.uwallBot').length) {
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateUp', id: 'LupperRight'}))
    }

    if (!$('.selected').parent().prev().find('#'+$pid).filter('.ywallBot').length && !$('.selected').parent().prev().find('#'+$pid).filter('.uwallBot').length) {
      console.log('ping');
      $('.selected').prev().append($('<div>', {class: 'indicateUp', id: 'LupperLeft'}))
    }

    if (!$('.selected').prev().filter('.ywallBot').length && !$('.selected').prev().filter('.uwallBot').length) {
      console.log('ping');
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
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateRight', id: 'BupperRight'}))
    }

    if (!$('.selected').prev().filter('.ywallRyt').length && !$('.selected').prev().filter('.uwallRyt').length) {
      console.log('ping');
      $('.selected').append($('<div>', {class: 'indicateLeft', id: 'BupperLeft'}))
    }

    var $id = $('.selected').attr('id')
    var $idp = $('.selected').prev().attr('id')
    if (!$('.selected').parent().next().find('#'+$id).filter('.ywallRyt').length && !$('.selected').parent().next().find('#'+$id).filter('.uwallRyt').length) {
      console.log('pong');
      $('.selected').parent().next().find('#'+$id).append($('<div>', {class: 'indicateRight', id: 'BlowerRight'}))
    }
    if (!$('.selected').parent().next().find('#'+$idp).filter('.ywallRyt').length && !$('.selected').parent().next().find('#'+$idp).filter('.uwallRyt').length) {
      console.log('pongpong');
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
}


//Highlighted Piece destination.  Moving a peice to that destination.
function movePiece($dest) {
  $('.selected').addClass('.degeneratePiece')
  $('.selected').empty()
  console.log($dest);
  $dest.append($('<div>', {class: 'upiece'}))
  $('td').removeClass('selected').removeClass('highlightCellJump').removeClass('highlightCellPiece').removeClass('botwallchange').removeClass('rytwallchange').children().removeClass('upiecechange')
  $('.choiceBox').empty()
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
  console.log($dest);
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
