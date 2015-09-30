for (var key in validation_messages) {
   if (validation_messages.hasOwnProperty(key)) {
       var obj = validation_messages[key];
        for (var prop in obj) {
          // important check that this is objects own property 
          // not from prototype prop inherited
          if(obj.hasOwnProperty(prop)){
            alert(prop + " = " + obj[prop]);
          }
       }
    }
}