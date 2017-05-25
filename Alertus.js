/*
  Alertus Shared Library
  
  A simple shared library for activating an alert to Alertus
  
  Exposed Methods:
    activateAlert - Acitvate an Alertus alert. Accepts the payload to pass to Alertus in the following format:
       text                - The text to send
       durationSeconds     - The duration of the alert
       sender              - A text field representing where the alert came from
       clientName          - Name of the client that is dispatching the message
       clientName          - Version of the client used to send the alert
       addressMode         - The Address Mode of the alert that determines how recipients will be 
                             targetted. Valid values are 'All', 'Group', 'Unit', 'Location' and 'User'
       groupNameRecipients - Array of Group Names to target (used only when addressMode = 'Group')   
       alertProfileId - This is the Alert Profile ID in Alertus
  
  
  Example usage:
  
  var Alertus = require( 'Alertus' );
  
  // Only fire if we are initiating an event
  if ( callback.status != 'active' )
    return;

  // Making a call to the GET /events api to retrieve the event recipients is probably 
  // the best way to get the targets, but this is the format they should be in. 
  var groupRecipients = [ 'North Facility 1', 'North Facility 2' ];
  
  var payload = {
    "text"                : "This is my text",
    "durationSeconds"     : 300,
    "sender"              : "xMatters",
    "clientName"          : "xMatters IB",
    "clientVersion"       : "1.0",
    "addressMode"         : "Group",
    "groupNameRecipients" : groupRecipients,
    "alertProfileId"      : 1
  };
  
  Alertus.activateAlert( payload );
   
*/

exports.activateAlert = function( payload ) {
    
   if (!payload) {
       console.log( 'No payload passed, exiting' );
       return;
   }
   
   var alertusPost = http.request({
      "endpoint": "Alertus",
      "path": "/alertusmw/services/rest/activation/custom",
      "method": "POST",
      "headers": {
        "Content-Type": "application/com.alertus-v1.0+json"
      }
   });

   // We have to do an explicity stringify here because otherwise the .write method
   // will "helpfully" change the Content-Type to "application/json" because we are
   // sending a JS object. 
   var alertusRespRaw = alertusPost.write( JSON.stringify( payload ) );
   var alertusResp    = JSON.parse(  alertusRespRaw.body );

   console.log("Response: " + alertusResp );
   
   
};




