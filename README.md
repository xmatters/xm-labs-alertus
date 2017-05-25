# Alertus Desktop Notifications
[Alertus Technologies](https://www.alertus.com/) provides unified mass notification across several different platforms including outdoor speakers, beacons and, relevant here, desktops. This integration to the Alertus platform provides xMatters a way to make limited desktop notifications. 

**Note**: This integration does not use Alertus as a "device" in xMatters and instead will target a group or organizational unit in Alertus. 


# Pre-Requisites
* Alertus server
* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!

# Files
* [Alertus.js](Alertus.js)

# Installation
## Alertus
Verify the Group names match the groups in xMatters and the message template is as desired. Note the Alert Pofile ID you wish to use. 

## xMatters
1. Log in to your xMatters instance as a user with the Developer role (or anyone with access to the target communication plan). On the Developer tab, click Edit > Integration Builder for the target communication plan. 
2. Click 'Edit Endpoints', and then click `Add Endpoint` to add an endpoint for Alertus; fill out the following details:

   | Item | Selection |
   | ---- | --------- |
   | Name | Alertus |
   | Base URL | `alertus host name and port` |
   | Authorization | Basic |
   | Username | Username xMatters will authenitcate with |
   | Password | The password xMatters will authenticate with |

   
3. Click Save and Close.
5. Click `Save Changes` and `Close`.
6. Expand the Shared libraries section (if necessary) and click the `+ Add` button
7. Update the name at the top from `My Shared Library` to `Alertus`, then paste in the contents of the [Alertus.js](Alertus.js) file and hit `Save`.

   
# Testing
Initiate the call to Alertus. Generally the code will be fired from the Outbound Integration Event Status script. A successfull call to Alertus will return an ID:

```
Executing outbound integration for xMatters event ID: 3666002
> POST http://alertus.server.com/alertusmw/services/rest/activation/custom HTTP/1.1
> Accept: text/plain, application/json, application/*+json, */*
> User-Agent: Xerus (EndpointClient)
> Content-Type: application/com.alertus-v1.0+json; charset=UTF-8
> X-Trace: 8405ed28-85a3-49a0-be8b-2e54ee35d048,c7ded404-489b-4867-bd25-22a27d0ce28b
> Content-Length: 191
{
  "addressMode": "Group",
  "alertProfileId": 1,
  "clientName": "xMatters IB",
  "clientVersion": "1.0",
  "durationSeconds": 300,
  "groupNameRecipients": [
    "Facilities North"
  ],
  "sender": "xMatters",
  "text": "This is my text"
}

< HTTP/1.1 200 200
< Date: Mon, 22 May 2017 21:20:49 GMT
< Server: Apache
< X-Frame-Options: SAMEORIGIN
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Keep-Alive: timeout=5, max=100
< Connection: Keep-Alive
< Transfer-Encoding: chunked
< Content-Type: application/json;charset=UTF-8
3023

```

If the recipients don't exist, the call will fail with a funny looking message:

```
Executing outbound integration for xMatters event ID: 3666001
> POST http://sensor.alertus.com/alertusmw/services/rest/activation/custom HTTP/1.1
> Accept: text/plain, application/json, application/*+json, */*
> User-Agent: Xerus (EndpointClient)
> Content-Type: application/com.alertus-v1.0+json; charset=UTF-8
> X-Trace: e948cdaf-148c-46c7-855b-75a7169480a8,135b490d-1f4d-4906-ae49-49b982c348bb
> Content-Length: 220
{
  "addressMode": "Group",
  "alertProfileId": 1,
  "clientName": "xMatters IB",
  "clientVersion": "1.0",
  "durationSeconds": 300,
  "groupNameRecipients": [
    "THIS GROUP DOES NOT EXIST"
  ],
  "sender": "xMatters",
  "text": "This is my text"
}

< HTTP/1.1 400 400
< Date: Mon, 22 May 2017 21:18:03 GMT
< Server: Apache
< X-Frame-Options: SAMEORIGIN
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Connection: close
< Transfer-Encoding: chunked
< Content-Type: application/json;charset=UTF-8
{
  "data": null,
  "errorCode": 400,
  "message": "Server was unable to process invalid custom alert: AlertusValidationException: The list of Address Mode Recipients is either empty or null"
}
```


# Troubleshooting
The activity stream in xMatters will be the best place to check for any errors. 



