var MenuElem = {"Add":1, "EditFemale":2, "EditMale":3, "MAX":4};
var ModalTopic = {1:"הוספה למאגר", 2:"עריכת פרטי האשה", 3:"עריכת פרטי הגבר", 4:""};

var lastMenuClick = MenuElem.MAX;


function addEditPerson()
{
	showProgressBar(true);
	var name = document.getElementById('name_text').value;
	var gender = document.getElementById('gender_text').value;
	var age = document.getElementById('age_text').value;
	var height = document.getElementById('height_text').value;
	var body = document.getElementById('body_text').value;
	var religious = document.getElementById('religious_text').value;
	var educ = document.getElementById('educ_text').value;
	var prof = document.getElementById('prof_text').value;
	var city = document.getElementById('city_text').value;
	var imagePath = document.getElementById('person_image').value;
	
	// if ((name == '') ||
        // (gender == '') ||
        // (age == '') ||
        // (height == '') ||
        // (body == '') ||
        // (religious == '') ||
        // (educ == '') ||
        // (prof == '') ||
        // (city == '') ||
        // (imagePath == ''))
		// {
			// showToast("אחד או יותר מהשדות אינם מלאים!");
			// return;
		// }
		
	const ref = firebase.storage().ref();
	const file = document.querySelector("#person_image").files[0];
	const fileName = + new Date() + "-" + file.name;
	const metadata = {
		contentType: file.type
	};
	
	const task = ref.child(fileName).put(file, metadata);
	task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
		console.log(url);
		document.querySelector("#person_image").src = url;
		
		// TODO: On success, write a DB entry
		
		cancelModal('#addEditPerson', '');
		showProgressBar(false);
	}).catch(err => {
		showProgressBar(false);
		showToast("נכשל בהעלאת תמונה!");
	});
}
