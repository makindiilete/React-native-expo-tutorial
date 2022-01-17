/*
1.  Install Android Studio >> Follow the guide at https://docs.expo.io/workflow/android-studio-emulator/
2.  Getting 'Cannot locate adb' error ? Try the solution below

I started getting this error after updating Android Studio from version 3.6.3 to 4.0. It didn't stop the emulator working, but it was vaguely annoying.

I checked that adb.exe was in the folder C:\Users[username]\AppData\Local\Android\Sdk\platform-tools. I also ran it in a command-line to prove that the exe worked OK.

Finally after a bit of a struggle I found a solution:

Start the SDK Manager, File menu -> Settings -> Appearance & Behavior -> System Settings -> Android SDK, SDK Tools tab (Or click the cube with blue down arrow icon in the toolbar).

Firstly I updated the Android SDK Platform-Tools (now v30.0.2). This didn't fix the problem. I also tried manually deleting the platform tools folder and reinstalling.

Eventually I decided to click the "Edit" link next to the "Android SDK Location" box. This opens a new dialog for SDK Components Setup. How well hidden is that?!?! I had always assumed it was to edit the SDK path!

You should now see that Android SDK - (installed) has a tick in the checkbox, as do any SDK Platforms you have. Click on the Next button and your SDK will update. Problem solved.

Close and re-open the terminal and run 'adb version'

3.  Start the android emulator >> On Expo interface, >> Click 'Run on Android device/emulator

Android Emulator developer menu : - cmd + M
*/
