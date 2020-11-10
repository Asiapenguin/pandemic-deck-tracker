# Pandemic Deck Tracker

This app is built for those who play the [Pandemic](https://en.wikipedia.org/wiki/Pandemic_(board_game)) boardgame and are having trouble or too lazy to write things down to track the infect pile. With this app, you can easily tell what is coming up next and plan your moves accordingly

## Tech
- Ionic v4 framework with Angular

## Roadmap
- Graphical updates (make everything look prettier)
- Testing app on different phone sizes
- Releasing onto Google Play Store and App Store

## Notes for development

### Releasing update
```
ionic cordova build --release android
```
Move new unsigned apk from platforms/android/app/build/outputs/apk/release into project root directory.
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
```
```
C:/Users/NK/AppData/Local/Android/sdk/build-tools/30.0.1/zipalign.exe -v 4 app-release-unsigned.apk app-release.apk
```