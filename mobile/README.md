# Champions Team Builder — Android wrapper (Capacitor)

Packages the self-contained offline PWA (`champions-team-building/app`) as an
Android app. The app already runs the full Champions sim in-browser (Web Worker),
so the APK is fully offline — Battle Lab, Arena, matrix and optimizer all work
with no server.

The APK is built in CI (`.github/workflows/android-apk.yml`) — download it from
the workflow run's artifacts. To build locally you need Android Studio / SDK:

```
cd mobile
npm install
rm -rf www && mkdir www && cp -r ../champions-team-building/app/. www/
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
# -> android/app/build/outputs/apk/debug/app-debug.apk
```
