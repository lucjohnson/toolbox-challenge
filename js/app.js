"use strict";
var gameBoard = $('#game-board');

// var tile1x1 = $(document.createElement('img'));
// var tile1x2 = $(document.createElement('img'));
// var tile1x3 = $(document.createElement('img'));
// var tile1x4 = $(document.createElement('img'));

// var tile2x1 = $(document.createElement('img'));
// var tile2x2 = $(document.createElement('img'));
// var tile2x3 = $(document.createElement('img'));
// var tile2x4 = $(document.createElement('img'));

// var tile3x1 = $(document.createElement('img'));
// var tile3x2 = $(document.createElement('img'));
// var tile3x3 = $(document.createElement('img'));
// var tile3x4 = $(document.createElement('img'));

// var tile4x1 = $(document.createElement('img'));
// var tile4x2 = $(document.createElement('img'));
// var tile4x3 = $(document.createElement('img'));
// var tile4x4 = $(document.createElement('img'));


// tile1x1.attr('src', 'img/tile-back.png');
// tile1x1.attr('width', '250px');
// tile1x2.attr('src', 'img/tile-back.png');
// tile1x2.attr('width', '250px');
// tile1x3.attr('src', 'img/tile-back.png');
// tile1x3.attr('width', '250px');
// tile1x4.attr('src', 'img/tile-back.png');
// tile1x4.attr('width', '250px');

// tile2x1.attr('src', 'img/tile-back.png');
// tile2x1.attr('width', '250px');
// tile2x2.attr('src', 'img/tile-back.png');
// tile2x2.attr('width', '250px');
// tile2x3.attr('src', 'img/tile-back.png');
// tile2x3.attr('width', '250px');
// tile2x4.attr('src', 'img/tile-back.png');
// tile2x4.attr('width', '250px');

// tile3x1.attr('src', 'img/tile-back.png');
// tile3x1.attr('width', '250px');
// tile3x2.attr('src', 'img/tile-back.png');
// tile3x2.attr('width', '250px');
// tile3x3.attr('src', 'img/tile-back.png');
// tile3x3.attr('width', '250px');
// tile3x4.attr('src', 'img/tile-back.png');
// tile3x4.attr('width', '250px');

// tile4x1.attr('src', 'img/tile-back.png');
// tile4x1.attr('width', '250px');
// tile4x2.attr('src', 'img/tile-back.png');
// tile4x2.attr('width', '250px');
// tile4x3.attr('src', 'img/tile-back.png');
// tile4x3.attr('width', '250px');
// tile4x4.attr('src', 'img/tile-back.png');
// tile4x4.attr('width', '250px');

// gameBoard.append(tile1x1);
// gameBoard.append(tile1x2);
// gameBoard.append(tile1x3);
// gameBoard.append(tile1x4);

// gameBoard.append(tile2x1);
// gameBoard.append(tile2x2);
// gameBoard.append(tile2x3);
// gameBoard.append(tile2x4);

// gameBoard.append(tile3x1);
// gameBoard.append(tile3x2);
// gameBoard.append(tile3x3);
// gameBoard.append(tile3x4);

// gameBoard.append(tile4x1);
// gameBoard.append(tile4x2);
// gameBoard.append(tile4x3);
// gameBoard.append(tile4x4);

var shuffled = _.shuffle(images);
var gameSet = shuffled.slice(0,8);
var fullSet = gameSet.concat(gameSet);
var shuffledFullSet = _.shuffle(fullSet);

console.log(shuffledFullSet);

for (var i = 0; i < shuffledFullSet.length; i++) {
	var newTile = $(document.createElement('img'));
	newTile.attr('src', shuffledFullSet[i]["image"]);
	newTile.attr('width', '230px');
	gameBoard.append(newTile);
}

$('#game-board img').click(function() {
	$(this).addClass('clicked');
});