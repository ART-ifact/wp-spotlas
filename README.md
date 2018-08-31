![image](https://www.spotlas.de/wp-content/uploads/2018/01/de-ipad-map-1024x768.jpg)

# Spotlas
A vueJS photolocationmanager on head of the Wordpress API.  

**Who's this for?** When I started diving into using Vue in WordPress I found plenty of great starters for headless WordPress, but I had the added constraint of needing to run the front and backend on the same host, thus this project was created.

## Features
- Authentification and Usermanagement integrated
- Gridview
- Mapview
- Locationdetailview
- Locationsharing with a special generated link the location can be accessed with
- responsive on every Device
- WebApp capabilities
- GPX, KML import functionality

## Technical specifications

Spotlas is an enhanced WordPress-Theme and needs an own wordpress instance where it's installed to.

WordPress needs at serverside:

-    PHP version 7.0 or higher
-    MySQL version 5.6 or higher OR MariaDB version 10.0 or higher

## Installation

   1. First you have to install a wordpress instance
   2. When logged in on www.yourdomain.de/wp-admin you have to navigate to design/themes
   3. Click on "add" and then on "Upload Theme" and upload the zip file of the theme
   4. When the upload has finished you can activate the theme
   5. After you activated the theme you have to install some neccesary plugins to do this just click on the message which appears on the top.
   6. When the plugins are installed and activated you are ready to start.
   7. At design/theme options you can set up the theme settings.
        7.1 Language
            - Here you can set up the application / theme language
        7.2 Standard Map center
            - Enter the Location for default map center here.
        7.3. Map center Longitude & Map center latitude
            - These fields will be set automaticly from point 7.2
        7.4. The location basepath
            - If yout Wordpress instance don't runs on www.yourdomain.de but in something like www.yourdomain.de/spotlas  you have to enter it here for a working theme
        7.5. Logo
            - Here you can add you own logo which will be showed instead of the default one.
        7.6. You are ready to go.