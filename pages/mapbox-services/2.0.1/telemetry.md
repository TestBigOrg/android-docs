---
title: Telemetry
path: /mapbox-services/2.0.1/telemetry/
---

The telemetry library includes many utilities, such as `locationEngine` or `permissionManager`, that you can use in your projects. The Telemetry module has no dependencies on any of the other Mapbox-Java modules and only depends on having the Android API plugin inside your project.

> Find out more about telemetry on [our website](https://www.mapbox.com/telemetry/)

## PermissionsManager
Your application will need to request permission during runtime, if your Android project is built targeting API level 23 or higher. Handling this directly in your activity produces a bunch of boilerplate and can oftentimes be hard to get correct. That's where the PermissionsManager comes into play. With the PermissionsManager, you can check whether the user has granted location permission and request permissions if the user hasn't granted them yet.

You'll notice that once you have set up your permission manager, you will still need to override your activity's `onRequestPermissionsResult` and call the permissionsManagers same method.

> **Note:** The PermissionsManager can be used for requesting additional permissions and not only location.

```java
permissionsManager = new PermissionsManager(<a new PermissionsListener>);
if (!permissionsManager.areLocationPermissionsGranted(this)) {
  permissionsManager.requestLocationPermissions(this);
}

@Override
public void onRequestPermissionsResult(
int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
  permissionsManager.onRequestPermissionsResult(requestCode, permissions, grantResults);
}
```

### PermissionsListener
The permissionsListener needs to also be set up and passed into the PermissionsManager constructor. You'll notice that it overrides two methods, `onExplanationNeeded` and `onPermissionResult`. An explanation isn't required but strongly encouraged to allow the user to understand why you are requesting this permission.

The permission result is invoked once the user decides whether to allow or deny the permission. A boolean value is given, which you can use to write an if statement. Both cases should be handled correctly. Continue with your permission sensitive logic if the user approves. Otherwise, if the user denies, it's good to display a message which tells the user that permission is required for your application to work.

```java
PermissionsListener permissionsListener = new PermissionsListener() {
  @Override
  public void onExplanationNeeded(List<String> permissionsToExplain) {

  }

  @Override
  public void onPermissionResult(boolean granted) {
    if (granted) {
      // Permission sensitive logic called here
    } else {
      // User denied the permission
    }
  }
};
```

## LocationEngine
If your application needs location information, the `locationEngine` can help you get this information while also simplifying the process and being flexible enough to use different services. The LocationEngine found in the telemetry module now supports the following location providers:

- [LOST](https://github.com/mapzen/lost/)
- Google Play Services
- Android Location
- Mock Location Engine

> **Note:** if you are using our Android Maps SDK, you can also set the locationEngine equal to the `LocationSource.getLocationEngine(this);` and it will use the same location engine used by the maps SDK. This eliminates the need to create a new locationEngine from scratch.

### Getting location updates
To start off, it's required to either include the mapbox-android-services or copy over the [LostLocationEngine class](https://github.com/mapbox/mapbox-java/blob/master/mapbox/libandroid-services/src/main/java/com/mapbox/services/android/location/LostLocationEngine.java) into your project. You'll then want to initialize a new instance of LocationEngine, activate it, and optionally add a location listener. Inside the `onConnected` you can begin requesting for location updates or wait for the proper time to do so.

```java
LocationEngine locationEngine = LostLocationEngine.getLocationEngine(this);
locationEngine.activate();
locationEngine.addLocationEngineListener(new LocationEngineListener() {
  @Override
  public void onConnected() {
    locationEngine.requestLocationUpdates();
  }

  @Override
  public void onLocationChanged(Location location) {

  }
});
```

To prevent your application from having a memory leak, it is a good idea to stop requesting location updated inside your activity's `onStop` method and continue requesting them in `onStart`.

### Last location
If your application needs to quickly get a user location, you can call the `getLastLocation` which will return the user's last position. You can then use the location object returned to decide the timing the location was given.

> **Note:** Careful with requesting the users last location since the location has the possibility of being null.

```java
Location lastLocation = locationEngine.getLastLocation();
if (lastLocation != null) {
  // Location logic here
}
```

### Mock Location Engine

<!-- preview -->

Not implemented in SDK yet.
