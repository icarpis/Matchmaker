var MenuElem = {"Add":1, "EditFemale":2, "EditMale":3, "DelFemale":4, "DelMale":5, "MAX":6};
var ModalTopic = {1:"הוספה למאגר", 2:"עריכת פרטי האשה", 3:"עריכת פרטי הגבר", 4:"מחיקת אשה נוכחית", 5:"מחיקת גבר נוכחי", 6:""};

var lastMenuClick = MenuElem.MAX;

function updateModalFields()
{
	var info;
	if (lastMenuClick == MenuElem.EditFemale)
	{
		info = femalesInfo[lastFemaleIndex];
	}
	else
	{
		info = malesInfo[lastMaleIndex];
	}
	
	if (info == undefined)
	{
		showToast("הרשימה ריקה");
		return false;
	}
	
	resetModalFields();
	document.getElementById('name_text').value= info["name"];
	document.getElementById('gender_text').value= info["gender"];
	document.getElementById('age_text').value= info["age"];
	document.getElementById('height_text').value= info["height"];
	document.getElementById('body_text').value= info["body"];
	document.getElementById('religious_text').value= info["religious"];
	document.getElementById('educ_text').value= info["educ"];
	document.getElementById('prof_text').value= info["prof"];
	document.getElementById('city_text').value= info["city"];
	
	return true;
}

function resetModalFields()
{
	document.getElementById('name_text').value= "";
	document.getElementById('age_text').value= "";
	document.getElementById('height_text').value= "";
	document.getElementById('body_text').value= "";
	document.getElementById('religious_text').value= "";
	document.getElementById('educ_text').value= "";
	document.getElementById('prof_text').value= "";
	document.getElementById('city_text').value= "";
	document.getElementById("person_image").value = "";
}

function deleteDbEntry()
{
	var info;
	if (lastMenuClick == MenuElem.DelFemale)
	{
		index = lastFemaleIndex;
		info = femalesInfo[lastFemaleIndex];
	}
	else
	{
		index = lastMaleIndex;
		info = malesInfo[lastMaleIndex];
	}

	if (index == -1)
	{
		cancelModal('#delPerson', '');
		showToast("שגיאה");
		return;
	}

	showProgressBar(true);	
	
	var id = info["id"];
	
	var dbRoot;
	if (info["gender"] == "female")
	{
		dbRoot = femaleDbRoot;
	}
	else if (info["gender"] == "male")
	{
		dbRoot = maleDbRoot;
	}
	
	var dbEntry = dbRoot + id;
	var imageFileName = info["imageFileName"];
	
	var dataRef = firebase.database().ref(dbEntry);
	dataRef.remove()
	.then(function(){
		var desertRef = firebase.storage().ref().child(imageFileName);

		// Delete the file
		desertRef.delete().then(() => {
			cancelModal('#delPerson', '');
			showProgressBar(false);
			showToast("רשומה נמחקה בהצלחה");
		}).catch((error) => {
			cancelModal('#delPerson', '');
			showProgressBar(false);
			showToast("שגיאה במחיקת רשומה!");
		});
	})
	.catch(function(error){
		cancelModal('#delPerson', '');
		showProgressBar(false);
		showToast("שגיאה במחיקת רשומה!");
	});
}

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
	var imageUrl = document.getElementById('person_image').value;
	
	if ((name == '') ||
        (gender == '') ||
        (age == '') ||
        (height == '') ||
        (body == '') ||
        (religious == '') ||
        (educ == '') ||
        (prof == '') ||
        (city == '') ||
        ((lastMenuClick == MenuElem.Add) && (imageUrl == '')))
		{
			showProgressBar(false);
			showToast("אחד או יותר מהשדות אינם מלאים!");
			return;
		}
		

	var info;
	var id = "";
	if (lastMenuClick == MenuElem.EditFemale)
	{
		info = femalesInfo[lastFemaleIndex];
		if (info != undefined)
		{
			id = femaleDbRoot + femalesInfo[lastFemaleIndex]["id"];
		}
	}
	else
	{
		info = malesInfo[lastMaleIndex];
		if (info != undefined)
		{
			id = maleDbRoot + malesInfo[lastMaleIndex]["id"];
		}
	}
		
	var updates = {};
	if ((lastMenuClick != MenuElem.Add) && (imageUrl == ''))
	{
		dbEntries = { name: name,
			 age: age,
			 height: height,
			 body: body,
			 religious: religious,
			 educ: educ,
			 prof: prof,
			 city: city,
			 imageUrl: info["imagePath"],
			 imageFileName: info["imageFileName"]};
		updates[id] = dbEntries;
		firebase.database().ref().update(updates).then(() => {
																cancelModal('#addEditPerson', '');
																resetModalFields();
																showProgressBar(false);
																showToast("נשמר בהצלחה");
															}).catch((error) => {
																var desertRef = ref.child(fileName);
																desertRef.delete().then(() => {
																	showProgressBar(false);
																	showToast("שמירה נכשלה!");
																}).catch((error) => {
																	showProgressBar(false);
																	showToast("שמירה נכשלה!");
																});
															});
	}
	else
	{
		const ref = firebase.storage().ref();
		const file = document.querySelector("#person_image").files[0];
		const fileName = + new Date() + "-" + file.name;
		const metadata = {
			contentType: file.type
		};
		
		const task = ref.child(fileName).put(file, metadata);
		task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
			try {
				document.querySelector("#person_image").src = url;
				var dbRoot;
				if (gender == "female")
				{
					dbRoot = femaleDbRoot;
				}
				else if (gender == "male")
				{
					dbRoot = maleDbRoot;
				}
				
				dbEntries = { name: name,
							 age: age,
							 height: height,
							 body: body,
							 religious: religious,
							 educ: educ,
							 prof: prof,
							 city: city,
							 imageUrl: url,
							 imageFileName: fileName}
		
				if (lastMenuClick == MenuElem.Add)
				{
				firebase.database().ref(dbRoot + new Date()).set(dbEntries).then(() => {
																						cancelModal('#addEditPerson', '');
																						resetModalFields();
																						showProgressBar(false);
																						showToast("נשמר בהצלחה");
																						}).catch((error) => {
																							var desertRef = ref.child(fileName);
																							desertRef.delete().then(() => {
																								showProgressBar(false);
																								showToast("שמירה נכשלה!");
																							}).catch((error) => {
																								showProgressBar(false);
																								showToast("שמירה נכשלה!");
																							});
																						});
				}
				else
				{
					updates[id] = dbEntries;
					firebase.database().ref().update(updates).then(() => {
														cancelModal('#addEditPerson', '');
														resetModalFields();
														showProgressBar(false);
														showToast("עודכן בהצלחה");
													}).catch((error) => {
														var desertRef = ref.child(fileName);
														desertRef.delete().then(() => {
															showProgressBar(false);
															showToast("שמירה נכשלה!");
														}).catch((error) => {
															showProgressBar(false);
															showToast("שמירה נכשלה!");
														});
													});
				}
			} catch(error) {
				var desertRef = ref.child(fileName);
				desertRef.delete().then(() => {
					showProgressBar(false);
					showToast("שמירה נכשלה!");
				}).catch((error) => {
					showProgressBar(false);
					showToast("שמירה נכשלה!");
				});
			}
		}).catch(err => {
			showProgressBar(false);
			showToast("שמירה נכשלה - נכשל בהעלאת תמונה!");
		});
	}
}
