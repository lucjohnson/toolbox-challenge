"use strict";
var gameBoard = $('#game-board');

var shuffled = _.shuffle(images);
var gameSet = shuffled.slice(0,8);
var fullSet = gameSet.concat(gameSet);
var shuffledFullSet = _.shuffle(fullSet);

// console.log(shuffledFullSet);

for (var i = 0; i < shuffledFullSet.length; i++) {
	var newTile = $(document.createElement('img'));
	newTile.attr('src', 'img/tile-back.png')
	var pic = shuffledFullSet[i]["image"];
	newTile.data('frontImage', pic);
	newTile.attr('width', '100px');
	gameBoard.append(newTile);
}

var clickedImages = 0;
var firstImage;
var firstImageData;
var secondImage;
var secondImageData;

$('#game-board img').click(function() {
	// $(this).addClass('clicked');
	clickedImages++;

	if (clickedImages == 1) {
	// var clickedImage = $(this);
	// var tileData = clickedImage.data('frontImage');
	// clickedImage.attr('src', tileData);
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
	console.log(firstImageData);
	console.log(secondImageData);

	if (firstImageData === secondImageData) {
		console.log("match");
		clickedImages = 0;
	} else if (clickedImages == 2) {
		console.log("no match");
		setTimeout(function() {firstImage.attr('src', 'img/tile-back.png')}, 1000);
		setTimeout(function() {secondImage.attr('src', 'img/tile-back.png')}, 1000);
		clickedImages = 0;
	}

});

$(onReady);


