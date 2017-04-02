---
title: Map SDK
path: /map-sdk/5.0.1/getting-started/
---

The Mapbox Maps SDK is an open source toolset for displaying maps inside of your Android application. [Mapbox's demo app on the Google Play Store](https://play.google.com/store/apps/details?id=com.mapbox.mapboxandroiddemo&hl=en) includes many examples of how to use Mapbox Maps. Various pages in this documentation reference a few of the examples in the demo app.

### Support and contributions

- Reach out through [Stack Overflow](https://stackoverflow.com/questions/tagged/mapbox+android) or through [the Mapbox contact page](https://www.mapbox.com/contact/) if you are looking for support with using this SDK.
- If you have found a bug and can provide steps to reliably reproduce it, open an issue in the [/mapbox-gl-native repository on Github](https://github.com/mapbox/mapbox-gl-native/issues). Make sure to apply the bug label to your issue as well.
- If you have a feature request, open an issue in the /mapbox-gl-native repository on Github and apply the feature label.
- If you want to contribute to this SDK, please read [our contribution guidelines](https://github.com/mapbox/mapbox-gl-native/blob/master/CONTRIBUTING.md) and then open a pull request with your changes.

### API reference
All public methods in the Maps SDK project are well documented and can be either viewed inside of the source code or directly on the Javadoc (linked below). If you are using an older version of the SDK, you can still access the Javadoc by replacing the URL's version number with the one that you are using inside of your application.

- [{mapSdkVersion} Maps SDK Javadoc](https://www.mapbox.com/android-docs/api/map-sdk/5.0.1/index.html)

### Access tokens
An access token is necessary to use the Maps SDK. Manage your access tokens in [your account settings](https://www.mapbox.com/account/apps/) to retrieve current tokens and generate new ones. You should create a new token for each of your apps, which will help you track usage and decrease disruption in the event that a token needs to be revoked.

You'll want to place the access token inside of your application object inside the `onCreate()` method. Read [this document](https://www.mapbox.com/help/create-api-access-token/) to learn more about access tokens.

```java
public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    // Mapbox Access token
    Mapbox.getInstance(getApplicationContext(), "<your access token>");
  }
}
```

## Installation
Several steps must be taken before you start developing your application with the Maps SDK. Note that while we show how to add the stable version of the SDK inside your project, you can also use the nightly build/snapshot or the beta version, if one is available. The dependency given below can be found on MavenCentral.

1. Start Android Studio
2. Open up your application's `build.gradle`
3. Make sure that your project's `minSdkVersion` is at API 15 or higher
4. Under dependencies, add a new build rule for the latest mapbox-android-sdk
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

> **Note:** If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  compile ('com.mapbox.mapboxsdk:mapbox-android-sdk:{mapSdkVersion}@aar'){
      transitive=true
  }
}
```

### Permissions
Starting in 5.0, we are making use of the Manifest merge feature to reduce the need to include any Maps SDK required things inside of your application's manifest file. You'll need to include _either_ the Fine **or** Coarse location permission, if you plan to display a user's location on the map or get the user's location information. The user location permission should also be checked during runtime using the PermissionManager.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
### Lifecycle methods
The MapView contains its own lifecycle methods for managing Android's OpenGL lifecycle, which must be called directly from the containing Activity. In order for your app to correctly call the MapView's lifecycle methods, you must override the following lifecycle methods in the Activity that contains the MapView and call the respective MapView method. For example, your onStart() method should look like this:

```java
@Override
protected void onStart() {
  super.onStart();
  mapView.onStart();
}
```

All the lifecycle methods that need to be overridden:

```java
onCreate();
onStart();
onResume();
onPause();
onStop();
onSaveInstanceState();
onLowMemory();
onDestroy();
```

### Adding MapView
You have the option to include the MapView inside of your layout file **or** build the MapView dynamically inside your application.

```xml
<com.mapbox.mapboxsdk.maps.MapView
  android:id="@+id/mapView"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  mapbox:mapbox_styleUrl="@string/mapbox_style_mapbox_streets" />
```

<!-- TODO link to dynamically add a map example -->


### Fragments

We also provide a MapFragment and SupportMapFragment object which makes dealing with fragments significantly easier

<!-- TODO add fragment example? -->
