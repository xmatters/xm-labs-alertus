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
Be specific. What should happen to make sure this code works? What would a user expect to see?

# Troubleshooting
Optional section for how to troubleshoot. Especially anything in the source application that an xMatters developer might not know about. 