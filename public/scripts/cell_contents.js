('td').click(function(event) {
  var $tar = $(event.target);
  if ($tar.is('div')) {
    $('.choiceBox').text('Ping')
  };
  if ($tar.is('.uwallBot')) {
    $('.choiceBox').text('Pong')
  }
})

// function displayCellContents() {
//   number = 0;
//   if ()
// }
