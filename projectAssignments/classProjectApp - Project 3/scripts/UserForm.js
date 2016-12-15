
$("#btnUserClear").click(function () {
  clearUserForm();
});

$("#frmUserForm").submit(function () { //Event : submitting the form
  saveUserForm();
  return true;
});

function checkUserForm() { //Check for empty fields in the form
  //for finding current date 
  var d = new Date();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var year = d.getFullYear();
  var currentDate = year + '/' +
    (('' + month).length < 2 ? '0' : '') +
    month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

  if (($("#gender").val() != "") &&
    ($("#age").val() != "") &&
    ($("#heightFt").val() != "") &&
    ($("#heightIn").val() != "") && ($(
      "#weight").val() <= currentDate) &&
    ($("#act option:selected").val() !=
      "Select Cancer Type")) {
    return true;
  } else {
    return false;
  }
}

function saveUserForm() {
  if (checkUserForm()) {
    var user = {
      "Gender": $("#gender").val(),
      "Age": $("#age").val(),
      "HeightFt": $(
        "#heightFt").val(),
      "HeightIn": $("#heightIn").val(),
      "Weight": $("#weight").val(),
      "Activities": $(
        "#act option:selected").val(),
        
      
    };

    try {
        
    
      localStorage.setItem("user", JSON.stringify(
        user));
      alert("Saving Information");

     // $.mobile.changePage("#results");

      window.location.reload();
        
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }

}

function clearUserForm() {
  localStorage.removeItem("user");
  alert("The stored data have been removed");
  $("#slcCancerStage").val(
    "Select Cancer Stage");
  $('#slcCancerStage').selectmenu('refresh',
    true);
  $("#slcCancerType").val("Select Cancer Type");
  $('#slcCancerType').selectmenu('refresh',
    true);
  $("#slcTSHRange").val("Select TSH Range");
  $('#slcTSHRange').selectmenu('refresh', true);
}

function showUserForm() { //Load the stored values in the form
  try {
    var user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (user != null) {
    $("#gender").val(user.Gender);
    $("#age").val(user.Age);
    $("#heightFt").val(user.HeightFt);
    $("#heightIn").val(user.HeightIn);
    $("#weight").val(user.Weight);
    $('#slcCancerType option[value=' + user.Activities +
      ']').attr('selected', 'selected');
    
  }
}