  function getToken(json) {
      if (typeof android !== 'undefined')
          return android.readToken(json);
  }

  function reloadPage(pass) {
	  showProgressBar(true);
      if (typeof android !== 'undefined')
          android.reloadPage(pass);
	  showProgressBar(false);
  }
  
  function showToast(text) {
      if (typeof android !== 'undefined')
          android.showToast(text);
  }

function cancelModal(modalID, textID) {
    $(modalID).modal('hide');
    if (textID != '')
        clearModalContent(textID);
}

  function showProgressBar(show) {
      var overlayDiv = document.createElement("div");
      var loaderDiv = document.createElement("div");
      overlayDiv.id = "overlay";
      loaderDiv.id = "loader";
      overlayDiv.className += "overlay";
      loaderDiv.className += "loader";
      if (show) {
          div1 = document.getElementById(overlayDiv.id)
          div2 = document.getElementById(loaderDiv.id);
          if (!div2) {
              document.body.appendChild(loaderDiv);
          }
          if (!div1) {
              document.body.appendChild(overlayDiv);
          }
      } else {
          overlayDiv = document.getElementById(overlayDiv.id)
          loaderDiv = document.getElementById(loaderDiv.id);
          if (overlayDiv) {
              overlayDiv.remove();
          }
          if (loaderDiv) {
              loaderDiv.remove();
          }
      }
  }