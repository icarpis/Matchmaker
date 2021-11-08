var DEBUG = false;

var femaleDbRoot = 'female/';
var maleDbRoot =  'male/';

if (DEBUG)
{
	femaleDbRoot = 'femaleDebug/';
	maleDbRoot =  'maleDebug/';
}


const firebaseConfig = {
  apiKey: "AIzaSyAQPyo406YGSeUCmqQc0MSIzTVFVylm7Xo",
  authDomain: "matchmaker-453d0.firebaseapp.com",
  databaseURL: "https://matchmaker-453d0-default-rtdb.firebaseio.com",
  projectId: "matchmaker-453d0",
  storageBucket: "matchmaker-453d0.appspot.com",
  messagingSenderId: "1073107618361",
  appId: "1:1073107618361:web:fe160008591d4c0965dbe8"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().signOut();

window.addEventListener("load", function(){
    if (typeof android !== 'undefined')
	{
		android.pageIsReady();
	}
});


function ShowSignInModal()
{
	$('#signInModal').modal();
	$('#signIn-text').focus();
}

var signedIn = false;
ShowSignInModal();
function SignIn(passw) {
	showProgressBar(true);
	firebase.auth().onAuthStateChanged(function(user) {
		if (!signedIn && user)
		{
			cancelModal('#signInModal', 'signIn-text');
			signedIn = true;
			buildFemaleCarousel();
			buildMaleCarousel();
		}
	});
	
	firebase.auth().signInWithEmailAndPassword("itay.carpis@gmail.com", passw).catch(function(error) {
			// Handle Errors here.
			showProgressBar(false);
			showToast("הסיסמא שגויה!");
			clearModalContent('signIn-text');
			$('#signIn-text').focus();
		}); 
}


$(function() {
    var hash = window.location.hash;	
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');
    $(".navbar").affix({
        offset: {
            top: $("header").outerHeight(true)
        }
    });
});

var maxImages = 2;
var loadedImages = 0;

function GenCell(imagePath, id) {
	var cell = document.createElement('div');
	cell.className = 'carousel-cell';
	cell.id = id;

	var image = document.createElement('img')
	image.className = 'carousel-cell-image';
	image.onload = function () {
		if (loadedImages == maxImages)
		{
			showProgressBar(false);
			loadedImages = 0;
			maxImages = 1;
		}
	};
	image.src  = imagePath;
	image.style="max-width: 100%; max-height: 100%;"

	cell.appendChild(image);
 
	return cell;
}

function resetTableFields(gender)
{
	document.getElementById(gender + 'Name').innerText = "";
	document.getElementById(gender + 'Age').innerText = "";
	document.getElementById(gender + 'Height').innerText = "";
	document.getElementById(gender + 'Body').innerText = "";
	document.getElementById(gender + 'Religious').innerText = "";
	document.getElementById(gender + 'Education').innerText = "";
	document.getElementById(gender + 'Job').innerText = "";
	document.getElementById(gender + 'City').innerText = "";
}


var femalesInfo = [];
var lastFemaleIndex = -1;

var malesInfo = [];
var lastMaleIndex = -1;


function updateFemaleTable(femaleInfo) {
	if (femaleInfo == undefined)
	{
		resetTableFields("female");
		showProgressBar(false);
		return;
	}
	
	document.getElementById('femaleName').innerText = femaleInfo["name"];
	document.getElementById('femaleAge').innerText = femaleInfo["age"];
	document.getElementById('femaleHeight').innerText = femaleInfo["height"];
	document.getElementById('femaleBody').innerText = femaleInfo["body"];
	document.getElementById('femaleReligious').innerText = femaleInfo["religious"];
	document.getElementById('femaleEducation').innerText = femaleInfo["educ"];
	document.getElementById('femaleJob').innerText = femaleInfo["prof"];
	document.getElementById('femaleCity').innerText = femaleInfo["city"];
}

var femaleCarousel = document.getElementById('FemaleCarousel');

var flktyFemale = undefined;
function buildFemaleCarousel()
{
		var femaleRef = firebase.database().ref(femaleDbRoot);
		femaleRef.on('value', (snapshot) => {
			showProgressBar(true);
			if (flktyFemale != undefined)
			{
				for (info of femalesInfo)
				{
					document.getElementById(info["id"]).outerHTML = "";
				}

				flktyFemale.destroy();
				femalesInfo = [];
			}
			cells = [];
			snapshot.forEach(function(data) {
				var entry = data.val();
				var cell = GenCell(entry["imageUrl"], data.key);
				femalesInfo.push({ name: entry["name"],
								   age: entry["age"],
								   gender: "female",
								   height: entry["height"],
								   body: entry["body"],
								   religious: entry["religious"],
								   educ: entry["educ"],
								   prof: entry["prof"],
								   city: entry["city"],
								   imagePath: entry["imageUrl"],
								   imageFileName: entry["imageFileName"],
								   id: data.key });
				cells.push(cell);
			});

			lastFemaleIndex = 0;
			var femaleInfo = femalesInfo[0];
			updateFemaleTable(femaleInfo);	
			if (cells.length != 0)
			{
				flktyFemale = new Flickity( femaleCarousel, {
					fullscreen: true,
					pageDots: false,
				  on: {
					ready: function() {
						loadedImages++;	
					},
					change: function( index ) {
						lastFemaleIndex = index;
						var femaleInfo = femalesInfo[index];
						updateFemaleTable(femaleInfo);
					}
				  }
					});			
				flktyFemale.append(cells);
			}
			else
			{
				maxImages--;
				showProgressBar(false);
			}
		});
}



function updateMaleTable(maleInfo) {
	if (maleInfo == undefined)
	{
		resetTableFields("male");
		showProgressBar(false);
		return;
	}
	
	document.getElementById('maleName').innerText = maleInfo["name"];
	document.getElementById('maleAge').innerText = maleInfo["age"];
	document.getElementById('maleHeight').innerText = maleInfo["height"];
	document.getElementById('maleBody').innerText = maleInfo["body"];
	document.getElementById('maleReligious').innerText = maleInfo["religious"];
	document.getElementById('maleEducation').innerText = maleInfo["educ"];
	document.getElementById('maleJob').innerText = maleInfo["prof"];
	document.getElementById('maleCity').innerText = maleInfo["city"];
}

var maleCarousel = document.getElementById('MaleCarousel');

var flktyMale = undefined;
function buildMaleCarousel()
{
		var maleRef = firebase.database().ref(maleDbRoot);
		maleRef.on('value', (snapshot) => {
			showProgressBar(true);
			if (flktyMale != undefined)
			{
				for (info of malesInfo)
				{
					document.getElementById(info["id"]).outerHTML = "";
				}

				flktyMale.destroy();
				malesInfo = [];
			}
			cells = [];
			snapshot.forEach(function(data) {
				var entry = data.val();
				var cell = GenCell(entry["imageUrl"], data.key);
				malesInfo.push({ name: entry["name"],
								 age: entry["age"],
								 gender: "male",
								 height: entry["height"],
								 body: entry["body"],
								 religious: entry["religious"],
								 educ: entry["educ"],
								 prof: entry["prof"],
								 city: entry["city"],
								 imageFileName: entry["imageFileName"],
								 imagePath: entry["imageUrl"],
								 id: data.key });
				cells.push(cell);
			});

			lastMaleIndex = 0;
			var maleInfo = malesInfo[0];
			updateMaleTable(maleInfo);	
			if (cells.length != 0)
			{
				flktyMale = new Flickity( maleCarousel, {
				fullscreen: true,
				pageDots: false,
			  on: {
				ready: function() {
					loadedImages++;
				},
				change: function( index ) {
					lastMaleIndex = index;
					var maleInfo = malesInfo[index];
					updateMaleTable(maleInfo);
				}
			  }
				});			
				flktyMale.append(cells);			
			}
			else
			{
				maxImages--;
				showProgressBar(false);
			}
		});
}
