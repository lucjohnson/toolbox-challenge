"use strict";
var gameBoard = $('#game-board');
var row1 = $('#row1');
var row2 = $('#row2');
var row3 = $('#row3');
var row4 = $('#row4');

var shuffled = _.shuffle(images);
var gameSet = shuffled.slice(0,8);
var fullSet = gameSet.concat(gameSet);
var shuffledFullSet = _.shuffle(fullSet);

// function setHeight () {
// 	var windowHeight = $(window).height();
// 	$('body').css('height', windowHeight);
// }

// function setWidth () {
// 	var gameWidth = $('#game-board').width();
// 	$('#game-board img').css('width', gameWidth / 4);
// }

// setHeight();
// setWidth();

// console.log(shuffledFullSet);

//maybe add image size param, and size based on window size
//remember the gameBoard is a square so consider that when sizing 
function populateRow(start, end, row) {
	for (var i = start; i < end; i++) {
		var newTile = $(document.createElement('img'));
		var tileNumber = i;
		newTile.data('tileNumber', tileNumber);
		var back = 'img/tile-back.png';
		newTile.data('backImage', back);
		newTile.attr('src', 'img/tile-back.png')
		var front = shuffledFullSet[i]["image"];
		newTile.data('frontImage', front);
		newTile.attr('width', '175px');
		// newTile.attr('width', $('#game-board').width() / 4 - 30);
		// newTile.attr('height', $('body').height() / 4 - $('#header').height());
		row.append(newTile);
	}
}

// var gameWidth = $('#game-board').width();
// console.log(gameWidth);
// $('#game-board img').css("width", gameWidth);

console.log(shuffledFullSet.length);
console.log(shuffledFullSet);

populateRow(0, 4, row1);
populateRow(4, 8, row2);
populateRow(8, 12, row3);
populateRow(12, 16, row4);

var clickedImages = 0;
var firstImage;
var firstImageData;
var secondImage;
var secondImageData;
var matches = 0;
var remaining = 8;
var incorrect = 0;

if (clickedImages <= 2) {
	$('#game-board img').click(function() {
		clickedImages++;

		if (clickedImages == 1) {
			firstImage = $(this);
			if (firstImage.hasClass('matched')) {
				clickedImages--;
			} //else?
			firstImageData = firstImage.data('frontImage');
			firstImage.attr('src', firstImageData);
		} else if (clickedImages == 2) {
			secondImage = $(this);
			if (secondImage.hasClass('matched') 
				|| firstImage.data('tileNumber') == secondImage.data('tileNumber')) {
				clickedImages--;
			} //else?
			secondImageData = secondImage.data('frontImage');
			secondImage.attr('src', secondImageData);
		}

		if (firstImageData == secondImageData 
			&& firstImage.data('tileNumber') != secondImage.data('tileNumber')
			&& clickedImages == 2) {
			clickedImages = 0;
			//might be able to get rid of this if statement
			if (!firstImage.hasClass('matched') 
				&& !secondImage.hasClass('matched')) {
				matches++;
				remaining--;
				firstImage.addClass('matched');
				secondImage.addClass('matched');
			}
		} else if (clickedImages == 2 && !firstImage.hasClass('matched')
				&& !secondImage.hasClass('matched')) {
			// combine setTimeout functions
			setTimeout(function() {firstImage.attr('src', 'img/tile-back.png')}, 1000);
			setTimeout(function() {secondImage.attr('src', 'img/tile-back.png')}, 1000);
			firstImageData = firstImage.data('backImage');
			secondImageData = secondImage.data('backImage');
			setTimeout(function() {clickedImages = 0;}, 1000);
			incorrect++;
		//might be able to get rid of this if statement too	
		} else if (clickedImages == 2 && (firstImage.hasClass('matched') || secondImage.hasClass('matched'))) {
			clickedImages = 0;
		}
		$('#matches').text(matches);
		$('#remaining').text(remaining);
		$('#incorrect').text(incorrect);		
	});
}

var startTime = _.now();
setInterval(function() {
	$('#timer').text(Math.floor((_.now() - startTime) / 1000));
}, 1000);

// $(onReady);


