// Yes/No Modal
document.body.innerHTML += '<!-- Yes/No Modal -->\
<div class="modal fade" id="yesNoModal" tabindex="-1" role="dialog" aria-labelledby="yesNoModalLabel" aria-hidden="true">\
  <div class="modal-dialog" role="document">\
	<div class="modal-content">\
	  <div class="modal-header">\
		<p class="modal-title" id="yesNoModalLabel">האם אתה בטוח?</p>\
	  </div>\
	  <div class="modal-footer">\
		<button type="button" style="text-align: center;font-size: 16px;" class="btn btn-secondary" onclick="cancelModal(\'#yesNoModal\', \'\');">לא</button>\
		<button id="yesNoOnClick" type="button" style="margin-right:10px;text-align: center;font-size: 16px;" class="btn btn-primary" onclick="">כן</button>\
	  </div>\
	</div>\
  </div>\
</div>\
<!-- Yes/No Modal -->'


// Modal with text-box
document.body.innerHTML += '<!-- Modal -->\
<div class="modal fade" id="homeTextModal" tabindex="-1" role="dialog" aria-labelledby="homeTextModalLabel" aria-hidden="true">\
  <div class="modal-dialog" role="document">\
	<div class="modal-content">\
	  <div class="modal-header">\
		<p class="modal-title" id="homeTextModalLabel">עריכת טקסט</p>\
	  </div>\
	  <div class="modal-body">\
		<form>\
		  <div class="form-group">\
			<label for="home-text" class="col-form-label">תוכן:</label>\
			<textarea class="form-control" id="home-text" style="height: 120px; font-size: 18px;resize: none;"></textarea>\
		  </div>\
		</form>\
	  </div>\
	  <div class="modal-footer">\
		<button type="button" style="text-align: center;font-size: 16px;" class="btn btn-secondary" onclick="cancelModal(\'#homeTextModal\', \'home-text\');">ביטול</button>\
		<button id="textBoxOnClick" type="button" style="margin-right:10px;text-align: center;font-size: 16px;" class="btn btn-primary">אישור</button>\
	  </div>\
	</div>\
  </div>\
</div>'


// Password Modal
document.body.innerHTML += '<!-- Password Modal -->\
<div class="modal fade" id="signInModal" tabindex="-1" role="dialog" aria-labelledby="signInModalLabel" aria-hidden="true">\
  <div class="modal-dialog" role="document">\
	<div class="modal-content">\
	  <div class="modal-header">\
		<p class="modal-title" id="signInModalLabel">הזדהות באמצעות סיסמא</p>\
	  </div>\
	  <div class="modal-body">\
		<form>\
		  <div class="form-group">\
			<label for="signIn-text" class="col-form-label">סיסמא:</label>\
			<input type="password" class="form-control" id="signIn-text" style="height: 40px; font-size: 18px;">\
		  </div>\
		</form>\
	  </div>\
	  <div class="modal-footer">\
		<button type="button" style="text-align: center;font-size: 16px;" class="btn btn-secondary" onclick="cancelModal(\'#signInModal\', \'signIn-text\');">ביטול</button>\
		<button type="button" style="margin-right:10px;text-align: center;font-size: 16px;" class="btn btn-primary" onclick="signInWithPassword(document.getElementById(\'signIn-text\').value);">אישור</button>\
	  </div>\
	</div>\
  </div>\
</div>\
<!-- Password Modal -->'

// Add/Edit person modal
document.body.innerHTML += '<!-- Modal -->\
<div class="modal fade" id="addEditPerson" tabindex="-1" role="dialog" aria-labelledby="addEditPersonModalLabel1" aria-hidden="true">\
  <div class="modal-dialog" role="document">\
	<div class="modal-content">\
	  <div class="modal-header">\
		<p class="modal-title" id="addEditPersonModalLabel1"></p>\
	  </div>\
	  <div class="modal-body">\
		<form>\
		  <div class="form-group">\
		    <label for="gender_text" class="col-form-label">מין:</label>\
		    <select name="gender" id="gender_text" style="width: 200px; height: 40px;font-size: 20px;">\
				<option value="female">נקבה</option>\
				<option value="male">זכר</option>\
			</select>\
			<br>\
			<br>\
			<label for="name_text" class="col-form-label">שם:</label>\
			<textarea class="form-control" id="name_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<br>\
			<label for="age_text" class="col-form-label">גיל:</label>\
			<textarea class="form-control" id="age_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<br>\
			<label for="height_text" class="col-form-label">גובה:</label>\
			<textarea class="form-control" id="height_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<label for="body_text" class="col-form-label">מבנה גוף:</label>\
			<textarea class="form-control" id="body_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<label for="religious_text" class="col-form-label">זיקה לדת:</label>\
			<textarea class="form-control" id="religious_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<label for="educ_text" class="col-form-label">השכלה:</label>\
			<textarea class="form-control" id="educ_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<label for="prof_text" class="col-form-label">מקצוע:</label>\
			<textarea class="form-control" id="prof_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<label for="city_text" class="col-form-label">עיר מגורים:</label>\
			<textarea class="form-control" id="city_text" style="height: 35px; font-size: 18px;resize: none;"></textarea>\
			<div style="padding: 15px 50px 15px 100px;"></div>\
			<div>\
				<label for="person_image">בחר תמונה להעלאה:</label>\
				<input type="file" id="person_image" name="person_image"><br><br>\
			</div>\
		  </div>\
		</form>\
	  </div>\
	  <div class="modal-footer">\
		<button type="button" style="text-align: center;font-size: 16px;" class="btn btn-secondary" onclick="cancelModal(\'#addEditPerson\', \'\');">ביטול</button>\
		<button type="button" style="margin-right:10px;text-align: center;font-size: 16px;" class="btn btn-primary" onclick="addEditPerson();">אישור</button>\
	  </div>\
	</div>\
  </div>\
</div>'
