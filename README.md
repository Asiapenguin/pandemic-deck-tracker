# Pandemic Deck Tracker

This app is built for those who play the [Pandemic](https://en.wikipedia.org/wiki/Pandemic_(board_game)) boardgame and are having trouble or too lazy to write things down to track the infect pile. With this app, you can easily tell what is coming up next and plan your moves accordingly

## Tech
- Ionic v4 framework with Angular

## Roadmap
- Undo button

## Notes for development

### Releasing update
```
ionic cordova build --release android
```
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
```
```
cd ~/AppData/Local/Android/sdk/build-tools/30.0.1
```
```
./zipalign -v 4 /c/Projects/pandemic-deck-tracker/app-release-unsigned.a 
pk /c/Projects/pandemic-deck-tracker/app-release.apk
```