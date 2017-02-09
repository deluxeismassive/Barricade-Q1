// $(document).ready(function() {
//   scanYPieces();
//
// })


function scanYPieces() {
  var yPieceArr = []
  $('td').each(function(index) {
    if ($(this).find('.ypiece').length) {
      yPieceArr.push($(this)[0]);
    }
  })
  return yPieceArr;
}

function scanYPiecesJ() {
  var count = parseInt($('.scoreBox').text())
  count++
  $('.scoreBox').text(count)
  var yPieceArr = []
  $('td').each(function(index) {
    if ($(this).find('.ypiece').length) {
      yPieceArr.push($(this)[0]);
    }
  })
  uPiecesAdjecnt(yPieceArr);
}

function scanYWalls() {
  var yWallArr = []
  $('td').each(function(index) {
    if ($(this).hasClass('ywallBot') || $(this).hasClass('ywallRyt')) {
      yWallArr.push($(this)[0]);
    }
  })
  return yWallArr;
}



function uPiecesAdjecnt(array) {
  var filteredArr = array.filter(function(index) {
    var $id = $(index).attr('id')
    if ($(index).next().find('.upiece').length) {
      return $(index).addClass('R')
    } else if ($(index).prev().find('.upiece').length ) {
      return $(index).addClass('L')
    } else if ($(index).parent().prev().find('#'+$id).find('.upiece').length) {
      return $(index).addClass('U')
    } else if ($(index).parent().next().find('#'+$id).find('.upiece').length) {
      return $(index).addClass('B')
    }
  })
  console.log('uPiecesAdjecnt:');
  console.log(filteredArr);
  if (filteredArr.length <1) {
    moveY()
  }  else {
    canJump(filteredArr)
  }
}

function canJump(array) {
  var filteredArr = array.filter(function(index) {
    var $id = $(index).attr('id')
    if ($(index).hasClass('R') && !$(index).next().filter('.uwallRyt').length && !$(index).next().next().find('div').length && !$(index).filter('.uwallRyt').length && !$(index).is('#td3') && !$(index).is('#td4')) {
      return $(index)
    }
    if ($(index).hasClass('L') && !$(index).prev().filter('.uwallRyt').length && !$(index).prev().prev().filter('.uwallRyt').length && !$(index).prev().prev().find('div').length && !$(index).is('#td0') && !$(index).is('#td1')) {
      return $(index)
    }
    if ($(index).hasClass('U') && !$(index).parent().prev().find('#'+$id).filter('.uwallBot').length && !$(index).parent().prev().prev().find('#'+$id).filter('.uwallBot').length &&
    !$(index).parent().prev().prev().find('#'+$id).find('div').length && !$(index).parent().is('#tr0') && !$(index).parent().is('#tr1')) {
      return $(index)
    }
    if ($(index).hasClass('B') && !$(index).filter('.uwallBot').length && !$(index).parent().next().find('#'+$id).filter('.uwallBot').length &&
    !$(index).parent().next().next().find('#'+$id).find('div').length && !$(index).parent().is('#tr4') && !$(index).parent().is('#tr3')) {
      return $(index)
    }
  })
  console.log('canJump:');
  console.log(filteredArr);
  if (filteredArr.length <1) {
    moveY()
  } else if (filteredArr.length === 1) {
    jumpPieceY(filteredArr)
  } else {
    shouldJump(filteredArr)
  };
}

function shouldJump(array) {
  var filteredArr = array.filter(function(index) {
    var $id = $(index).attr('id')
    if ($(index).hasClass('R') && !$(index).next().next().filter('.uwallBot').length && !$(index).next().next().filter('.uwallRyt').length) {
      return $(index)
    } else if ($(index).hasClass('L') && !$(index).prev().prev().filter('.uwallBot').length && !$(index).prev().prev().filter('.uwallRyt').length) {
      return $(index)
    } else if ($(index).hasClass('U') && !$(index).parent().prev().prev().find('#'+$id).filter('.uwallBot').length && !$(index).parent().prev().prev().find('#'+$id).filter('.uwallRyt').length) {
      return $(index)
    } else if ($(index).hasClass('B') && !$(index).parent().next().next().find('#'+$id).filter('.uwallBot').length && !$(index).parent().next().next().find('#'+$id).filter('.uwallRyt').length) {
      return $(index)
    }
  })
  console.log('shouldJump:');
  console.log(filteredArr);
  if (filteredArr.length < 1) {
    moveY()
  } else {
    jumpPieceY(filteredArr);
  }
}

function jumpPieceY(array) {
  if (array > 1) {
    jumper = array[array.length-1]
  } else {
    jumper = array[0]
  }
  if ($(jumper).hasClass('R')) {
    $(jumper).addClass('.degeneratePiece')
    $(jumper).empty()
    $(jumper).next().next().append($('<div>', {class: 'ypiece'}))
    if ($(jumper).next().next().filter('.ywallRyt').length) {
      $(jumper).next().next().addClass('ywallBot')
    } else  {
      $(jumper).next().next().addClass('ywallRyt')
    }
    changeTurn()
    console.log('Right Jump');
    console.log(jumper);
  }
  if ($(jumper).hasClass('L')) {
    $(jumper).addClass('.degeneratePiece')
    $(jumper).empty()
    $(jumper).prev().prev().append($('<div>', {class: 'ypiece'}))
    if ($(jumper).prev().prev().filter('.ywallRyt').length) {
      $(jumper).prev().prev().addClass('ywallBot')
    } else {
      $(jumper).prev().prev().addClass('ywallRyt')
    }
    changeTurn()
    console.log('Left Jump');
    console.log(jumper);
  }
  if ($(jumper).hasClass('B')) {
    var $id = $(jumper).attr('id')
    $(jumper).addClass('.degeneratePiece')
    $(jumper).empty()
    $(jumper).parent().next().next().find('#'+$id).append($('<div>', {class: 'ypiece'}))
    if ($(jumper).parent().next().next().find('#'+$id).filter('.ywallRyt').length) {
      $(jumper).parent().next().next().find('#'+$id).addClass('ywallBot')
    } else  {
      $(jumper).parent().next().next().find('#'+$id).addClass('ywallRyt')
    }
    changeTurn()
    console.log('Down Jump');
    console.log(jumper);
  }
  if ($(jumper).hasClass('U')) {
    var $id = $(jumper).attr('id')
    $(jumper).addClass('.degeneratePiece')
    $(jumper).empty()
    $(jumper).parent().prev().prev().find('#'+$id).append($('<div>', {class: 'ypiece'}))
    if ($(jumper).parent().prev().prev().find('#'+$id).filter('.ywallRyt').length) {
      $(jumper).parent().prev().prev().find('#'+$id).addClass('ywallBot')
    } else  {
      $(jumper).parent().prev().prev().find('#'+$id).addClass('ywallRyt')
    }
    changeTurn()
    console.log('Up Jump');
    console.log(jumper);
  }
}

function moveY() {
  var choice = Math.floor((Math.random() * 2) + 1)
  if (choice === 1) {
    console.log('Wall Move:');
    var wallArray = scanYWalls()
    var item = wallArray[Math.floor(Math.random()*wallArray.length)];
    console.log(item);
    if ($(item).filter('.ywallRyt').length) {
      $(item).removeClass('ywallRyt')
      var $id = $(item).attr('id')
      var $nid = $(item).next().attr('id')
      if (!$(item).filter('.ywallBot').length) {
        $(item).addClass('ywallBot')
        console.log('Right to LeftBot');
      } else
      if (!$(item).parent().prev().find('#'+$id).filter('.ywallBot').length) {
        $(item).parent().prev().find('#'+$id).addClass('ywallBot')
        console.log('Right to LeftTop');
      } else
      if (!$(item).next().filter('.ywallBot').length) {
        $(item).next().addClass('ywallBot')
        console.log('Right to RightBot');
      } else
      if (!$(item).parent().prev().find('#'+$nid).filter('.ywallBot').length) {
        $(item).parent().prev().find('#'+$nid).addClass('ywallBot')
        console.log('Right to RightTop');
      }
      changeTurn()
    } else if ($(item).filter('.ywallBot').length) {
      console.log('BtWall');
      $(item).removeClass('ywallBot')
      var $id = $(item).attr('id')
      var $pid = $(item).prev().attr('id')
      if (!$(item).parent().next().find('#'+$id).filter('.ywallRyt').length) {
        $(item).parent().next().find('#'+$id).addClass('ywallRyt')
        console.log('Bot to BotRight');
      } else
      if (!$(item).parent().next().find('#'+$pid).filter('.ywallRyt').length) {
        $(item).parent().next().find('#'+$pid).addClass('ywallRyt')
        console.log('Bot to BotLeft');
      } else
      if (!$(item).filter('.ywallRyt').length) {
        $(item).addClass('ywallRyt')
        console.log('Bot to TopRight');
      } else
      if (!$(item).prev().filter('.ywallRyt').length) {
        $(item).prev().addClass('ywallRyt')
        console.log('Bot to TopLeft');
      }
      changeTurn()
    }
  } else {
    var pieceArray = scanYPieces()
    var itemP = pieceArray[Math.floor(Math.random()*pieceArray.length)];
    console.log(itemP);
    var $id = $(itemP).attr('id')
    var $nid = $(itemP).next().attr('id')
    var $pid = $(itemP).prev().attr('id')
    $(itemP).empty()
    if (!$(itemP).parent().next().find('#'+$id).find('div').length) {
      console.log('Moved Bottom');
      $(itemP).parent().next().find('#'+$id).append($('<div>', {class: 'ypiece'}))
    } else if (!$(itemP).next().find('div').length) {
      console.log('Moved right');
      $(itemP).next().append($('<div>', {class: 'ypiece'}))
    } else if (!$(itemP).prev().find('div').length) {
      console.log('Moved left');
      $(itemP).prev().append($('<div>', {class: 'ypiece'}))
    } else if (!$(itemP).parent().prev().find('#'+$id).find('div').length) {
      console.log('Moved up');
      $(itemP).parent().prev().find('#'+$id).append($('<div>', {class: 'ypiece'}))
    }
    changeTurn()
  }
}

function changeTurn() {
  $('td').removeClass('R')
  $('td').removeClass('L')
  $('td').removeClass('U')
  $('td').removeClass('B')
}
