---
title: Mapbox Services
path: /mapbox-services/2.0.1/getting-started/
---

Mapbox Java is an open source toolset for building applications that need navigation, directions, geocoding, static map imagery, etc. It conveniently wraps Mapbox APIs and builds off of them with tools which are useful for your applications. This SDK consist of two parts:

1. **Mapbox-Java-Services:** Has no dependency on the Android API and can be used in any of your Java projects.
2. **Mapbox-Android-Services:** Contains specific code for Android applications such as widgets and UI elements.

### Support and contributions

- If you are looking for support using this SDK, either reach out through [Stack Overflow](https://stackoverflow.com/questions/tagged/mapbox+android) or through our [contact page](https://www.mapbox.com/contact/).
- If you have found a bug, and can provide steps to reliably reproduce it, open an issue in the /mapbox-java repository on Github and apply the bug label.
- If you have a feature request, open an issue in the /mapbox-java repository on Github, and apply the enhancement label.
- If you want to contribute, look over our contribution guild lines and open a pull request with your changes.

### API reference
All public methods in all the project modules are well documented and even include a since tag so you can find when an API was first added. A link for all the module javadoc pages can be found in the list below:

- [mapbox-java-core](https://www.mapbox.com/android-docs/api/mapbox-java/libjava-core/{masVersion}/index.html)
- [mapbox-java-geojson](https://www.mapbox.com/android-docs/api/mapbox-java/libjava-geojson/{masVersion}/index.html)
- [mapbox-java-services](https://www.mapbox.com/android-docs/api/mapbox-java/libjava-services/{masVersion}/index.html)
- [mapbox-java-services-rx](https://www.mapbox.com/android-docs/api/mapbox-java/libjava-services-rx/{masVersion}/index.html)
- [mapbox-android-services](https://www.mapbox.com/android-docs/api/mapbox-java/libandroid-services/{masVersion}/index.html)
- [mapbox-android-telemetry](https://www.mapbox.com/android-docs/api/mapbox-java/libandroid-telemetry/{masVersion}/index.html)
- [mapbox-android-ui](https://www.mapbox.com/android-docs/api/mapbox-java/libandroid-ui/{masVersion}/index.html)

### Access tokens
If you plan to use any of our APIs such as directions, geocoding, navigation, etc. you'll need to have a Mapbox access token which you'll pass in as a parameter. An access token isn't needed if you plan to use Mapbox Java only for GeoJSON parsing or Turf calculations. Read [this document](https://www.mapbox.com/help/create-api-access-token/) to learn more about access tokens.

### Position and Point objects
Throughout the APIs exposed within Mapbox-Java, you'll notice the Position object's used heavily representing a coordinate. The order in which the coordinate pair are longitude followed by latitude. Creating a new Position is fairly straightforward and can be converted from a LatLng object if you are using our Maps SDK.

The SDK will try to detect if your coordinates are outside the excepted range and log a warning. This range is between -180 to 180 for longitudes and -90 to 90 for latitude.

> **Note:** if you happen to be using our Maps SDK with this SDK, you'll notice that the LatLng object has the reverse order, latitude comes before the longitude value.

Point will also be found in this SDK which is used specifically for GeoJSON objects. You can create a Point either directly from a Position object or passing in a longitude, latitude double array.

```java
// Position representing The White House
Position position = Position.fromCoordinates(-77.03655, 38.89770);
```

## Installation
To start developing your application using Mapbox Java, you'll need to first decide which installation method works best for you. The SDK is fully compatible with Android using Gradle and most of the project (besides the Android dependent modules) can also be included in a generic Java project using either Gradle or Maven. All dependencies given below can be found on MavenCentral.

### Gradle

1. Start Android Studio
2. Open up your applications `build.gradle`
3. Make sure your projects `minSdkVersion` is at API 15 or higher
4. Under dependencies add a new build rule for the latest mapbox-android-services
5. Click the Sync Project with Gradle Files near the toolbar in Studio

> **Note:** If your application is close or exceeds the 65k method count limit, you can mitigate this problem by specifying only the specific Mapbox Android Service APIs. See the selectively compiling APIs section below.

```groovy
compile 'com.mapbox.mapboxsdk:mapbox-android-services:{masVersion}'
```

### Maven

If your project's using Maven instead of Gradle, you can add the dependency inside your projects `POM.xml` file.

```xml
<dependency>
    <groupId>com.mapbox.mapboxsdk</groupId>
    <artifactId>mapbox-java-services</artifactId>
    <version>{masVersion}</version>
</dependency>
```

### Selectively compiling APIs

In earlier versions of Mapbox Java before to 2.0, you would have to compile the entire package of APIs. This in some cases, could cause Android applications to go over the 65,536 method count limit.

Starting with 2.0, you now have the option to include either the entire package of APIs (using the dependencies listed above) or you can now selectively choose which specific APIs your application needs. For example, if you only need to handle GeoJSON serialization or deserialization inside your application you only need to include the GeoJSON dependency in your project.

The list below shows all the current separated dependencies you can use in your Android application.

```groovy
compile 'com.mapbox.mapboxsdk:mapbox-java-core:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-java-geojson:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-java-services:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-java-services-rx:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-android-services:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-android-telemetry:{masVersion}'
compile 'com.mapbox.mapboxsdk:mapbox-android-ui:{masVersion}'
```

- Mapbox Java core
- GeoJSON
- Mapbox Java Services
- Mapbox Java Services for RxJava projects
- Mapbox Android Services
- Telemetry
- Mapbox Android UI

> **Note:** ProGuard directives are included in the Android dependencies to preserve the required classes.
