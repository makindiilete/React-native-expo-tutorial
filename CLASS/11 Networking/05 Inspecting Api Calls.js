/*
Sometimes when we make network requests, things dont go the way we expect and we might the inspect the api call first to check if the call was made, to check the request and response object...
To do this, we will be using the react-native-debugger which is a standalone app that combines the react-native official debugger, redux debugger etc

1.  Download your os version of the debuuger from https://github.com/jhen0409/react-native-debugger/releases/tag/v0.11.7
2.  Install and launch it
3.  Debugger tab >> New Window >> Enter 19001 >> Bring up the emulator and enable remote debugging...
4.  To hide any of the tabs : chrome dev, Redux, React, right click anywhere in the debugger window and toggle the specific tab to hide

ENABLE NETWORK REQUEST
1.  Right click anywhere in d debugger window >> Select 'Enable Network Requests'

NOTE : - Remote debugging makes your app slow so when you are done with your debugging session, bring up the debugger menu in your simulator and stop remote debugging
*/
