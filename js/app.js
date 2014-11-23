"use strict";
$(document).ready(function () {
	var gameBoard = $('#game-board');
	var row1 = $('#row1');
	var row2 = $('#row2');
	var row3 = $('#row3');
	var row4 = $('#row4');

	var shuffled = _.shuffle(images);
	var gameSet = shuffled.slice(0,8);
	var fullSet = gameSet.concat(gameSet);
	var shuffledFullSet = _.shuffle(fullSet);

	$('#celebrate-button').click(function() {
		window.location.href = 'http://www.youtube.com/watch?v=djV11Xbc914';
	});

	$('#play-again').click(function() {
		location.reload(true);
	});

	var imgWidth;
	var imgHeight;

	function setWidth() {
		var gameWidth = $('#game-board').width();
		imgWidth = gameWidth / 4 - 40;
	}

	function setHeight() {
		var windowHeight = $(window).height();
		$('#game-board').css('height', windowHeight);
		imgHeight = windowHeight / 4 - 30;
	}

	setWidth();
	setHeight();

	$(window).resize(function() {
		setWidth();
		setHeight();
		if ($(window).width() > $(window).height()) {
			$('img').css('width', imgWidth);
			$('img').css('height', auto);
		} else if ($(window).height() > $(window).width()) {
			$('img').css('height', imgHeight);
			$('img').css('width', auto);
		}
	})

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
			if ($(window).width() > $(window).height()) {
				newTile.attr('width', imgWidth);
			} else {
				newTile.attr('height', imgHeight);
			}
			row.append(newTile);
		}
	}

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
			$('#matches').text(matches);
			$('#remaining').text(remaining);
			$('#incorrect').text(incorrect);
			if (remaining == 0) {
				clearInterval(time);
				$('#game-board img').solitaireVictory();
				setTimeout(function() {$('#winner-modal').modal()}, 3000);
			}		
		});
	}

	var time;

	$('#game-board').one("click", function () {
		var startTime = _.now();
		time = setInterval(function() {
			$('#timer').text(Math.floor((_.now() - startTime) / 1000));
		}, 1000);
	});

	$('#startOver').click(function() {
		location.reload(true);
	});

	$('#rules').click(function() {
		$('#rules').popover('show');
	});
}); // $(onReady);


