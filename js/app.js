/* app.js
	main script file for 'Memory Game' application
*/

"use strict";

$(document).ready(function () {
	var gameBoard = $('#game-board');
	var row1 = $('#row1');
	var row2 = $('#row2');
	var row3 = $('#row3');
	var row4 = $('#row4');

	// selects pictures for the gameBoard
	var shuffled = _.shuffle(images);
	var gameSet = shuffled.slice(0,8);
	var fullSet = gameSet.concat(gameSet);
	var shuffledFullSet = _.shuffle(fullSet);

	// sizes board based on current window dimensions and finds proper image sizes
	function setBoard() {
		var gameWidth = $('#game-board').width();
		var windowHeight = $(window).height();
		$('#game-board').css('height', windowHeight);
		if ($(window).width() > $(window).height()) {
			imgSideLength = gameWidth / 4 - 40;
		} else if ($(window).height() > $(window).width()) {
			imgSideLength = windowHeight / 4 -30;
		}
	}

	// builds board of images in multiple rows
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
			newTile.attr('width', imgSideLength);
			newTile.attr('height', imgSideLength);
			row.append(newTile);
		}
	}
	
	var imgSideLength;
	
	// resizes the board and images when the window is resized
	$(window).resize(function() {
		setBoard();
		$('img').css('width', imgSideLength);
		$('img').css('height', imgSideLength);
	})

	setBoard();

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

	// defines gameplay and tile reaction based on user clicks
	if (clickedImages <= 2) { // if statement to prevent clicking more than two tiles per turn
		$('#game-board img').click(function() {
			clickedImages++;

			// "flips" tiles 
			if (clickedImages == 1) {
				firstImage = $(this);
				if (firstImage.hasClass('matched')) { // game does not count clicks on matched tiles
					clickedImages--;
				} else {
					firstImageData = firstImage.data('frontImage');
					firstImage.attr('src', firstImageData);
				}
			} else if (clickedImages == 2) {
				secondImage = $(this);
				if (secondImage.hasClass('matched') 
					|| firstImage.data('tileNumber') == secondImage.data('tileNumber')) {
					clickedImages--;
				} else {
					secondImageData = secondImage.data('frontImage');
					secondImage.attr('src', secondImageData);
				}
			}

			// defines behavior for matches and non-matches
			if (firstImageData == secondImageData 
				&& firstImage.data('tileNumber') != secondImage.data('tileNumber')
				&& clickedImages == 2) {
				clickedImages = 0;
				matches++;
				remaining--;
				firstImage.addClass('matched');
				secondImage.addClass('matched');
			} else if (clickedImages == 2 && !firstImage.hasClass('matched')
					&& !secondImage.hasClass('matched')) {
				setTimeout(function() {
					firstImage.attr('src', 'img/tile-back.png');
					secondImage.attr('src', 'img/tile-back.png');
					clickedImages = 0;
				}, 1000);
				firstImageData = firstImage.data('backImage');
				secondImageData = secondImage.data('backImage');
				incorrect++;
			} 
			
			// updates stats to the user
			$('#matches').text(matches);
			$('#remaining').text(remaining);
			$('#incorrect').text(incorrect);
			
			// game behavior when user wins
			if (remaining == 0) {
				clearInterval(time);
				$('#game-board img').solitaireVictory();
				setTimeout(function() {$('#winner-modal').modal()}, 3000);
			}		
		});
	}

	var time;

	// starts the timer after user clicks on board once
	$('#game-board').one("click", function () {
		var startTime = _.now();
		time = setInterval(function() {
			$('#timer').text(Math.floor((_.now() - startTime) / 1000));
		}, 1000);
	});

	// starts a new game by refreshing page
	$('#startOver').click(function() {
		location.reload(true);
	});

	// activates how to play popover
	$('#rules').click(function() {
		$('#rules').popover('show');
	});

	// button for winner modal
	$('#celebrate-button').click(function() {
		window.location.href = 'http://www.youtube.com/watch?v=djV11Xbc914';
	});

	// button for winner modal
	$('#play-again').click(function() {
		location.reload(true);
	});

}); // $(document).ready();


