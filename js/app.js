"use strict";
var gameBoard = $('#game-board');

var tile = 'img/tile-back.png';

var newTile = $(document.createElement('img'));

newTile.attr('src', 'img/tile-back.png');
newTile.attr('alt', 'back of tile image');
newTile.attr('width', '150px');

newTile.data('assocTile', tile);

gameBoard.append(newTile);