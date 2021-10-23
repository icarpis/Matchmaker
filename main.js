var images = ["https://picsum.photos/720/540/?image=517",
              "https://picsum.photos/540/720/?image=696", 
              "https://picsum.photos/720/540/?image=56",
              "https://picsum.photos/720/540/?image=1084",
              "https://picsum.photos/720/540/?image=1080",
              "https://picsum.photos/720/540/?image=1074"]

showProgressBar(true);
var loadedImages = 0;


function Cells() {
	cells = [];
  for (imagePath of images)
  {
	var cell = document.createElement('div');
	cell.className = 'carousel-cell';

	var image = document.createElement('img')
	image.className = 'carousel-cell-image';
	image.onload = function () {
		loadedImages++;
		if (loadedImages == 12)
		{
			showProgressBar(false);
		}
	};
	image.src  = imagePath;
	image.style="max-width: 100%; max-height: 100%;"
  
	cell.appendChild(image);
	cells.push(cell);
  }
  
  return cells;
}




var femaleCarousel = document.getElementById('FemaleCarousel');

var flktyFemale = new Flickity( femaleCarousel, {
	fullscreen: true,
	pageDots: false,
  on: {
    ready: function() {
      console.log('Flickity is ready');
    },
    change: function( index ) {
      console.log( 'Female Slide changed to' + index );
    }
  }
});

flktyFemale.append( Cells() );



var maleCarousel = document.getElementById('MaleCarousel');

var flktyMale = new Flickity( maleCarousel, {
	fullscreen: true,
	pageDots: false,
  on: {
    ready: function() {
      console.log('Flickity is ready');
    },
    change: function( index ) {
      console.log( 'Male Slide changed to' + index );
    }
  }
});

flktyMale.append( Cells() );