"use strict";
var gameBoard = $('#game-board');

var shuffled = _.shuffle(images);
var gameSet = shuffled.slice(0,8);
var fullSet = gameSet.concat(gameSet);
var shuffledFullSet = _.shuffle(fullSet);

// console.log(shuffledFullSet);
function populateRow(start, end) {
	for (var i = start; i < end; i++) {
		var newTile = $(document.createElement('img'));
		var tileNumber = i;
		newTile.data('tileNumber', tileNumber);
		var back = 'img/tile-back.png';
		newTile.data('backImage', back);
		newTile.attr('src', 'img/tile-back.png')
		var front = shuffledFullSet[i]["image"];
		newTile.data('frontImage', front);
		newTile.attr('width', '210px');
		// newTile.attr('width', $('#game-board').width() / 4 - 30);
		// newTile.attr('height', $(document).height() / 4 - 30);
		gameBoard.append(newTile);
	}
}

// var gameWidth = $('#game-board').width();
// console.log(gameWidth);
// $('#game-board img').css("width", gameWidth);

console.log(shuffledFullSet.length);
console.log(shuffledFullSet);

populateRow(0, 4);
populateRow(4, 8);
populateRow(8, 12);
populateRow(12, 16);

var clickedImages = 0;
var firstImage;
var firstImageData;
var secondImage;
var secondImageData;

$('#game-board img').click(function() {
	// $(this).addClass('clicked');
	clickedImages++;

	if (clickedImages == 1) {
		firstImage = $(this);
		firstImageData = firstImage.data('frontImage');
		firstImage.attr('src', firstImageData);
		console.log(firstImageData);
	} else if (clickedImages == 2) {
		secondImage = $(this);
		secondImageData = secondImage.data('frontImage');
		secondImage.attr('src', secondImageData);
		console.log(secondImageData);
	}

	if (firstImage.data('frontImage') === secondImage.data('frontImage') 
		&& firstImage.data('tileNumber') != secondImage.data('tileNumber')) {
		console.log("match");
		clickedImages = 0;
		firstImage.addClass('matched');
		secondImage.addClass('matched');
	} else if (clickedImages == 2) {
		console.log("no match");
		setTimeout(function() {firstImage.attr('src', 'img/tile-back.png')}, 1000);
		setTimeout(function() {secondImage.attr('src', 'img/tile-back.png')}, 1000);
		firstImageData = firstImage.data('backImage');
		secondImageData = secondImage.data('backImage');
		clickedImages = 0;
	}
});

// $(onReady);


