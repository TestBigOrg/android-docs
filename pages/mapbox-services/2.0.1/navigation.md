---
title: Navigation
path: /mapbox-services/2.0.1/navigation/
---

<!-- preview -->
> Navigation is still in beta, there is currently a chance API breaking changes might occur without a major release.

The navigation part of Mapbox Services is built on top of our Directions API and contains logic needed to get timed navigation instructions. The calculations use the user's current location and compare it to the current route that the user's traversing to provide critical information at any given moment.

Much of the navigation APIs require being inside an Android application but we do expose some of the lower level logic inside the [RouteUtils class](#routeutils).

Make sure your Android project includes the `mapbox-android-ui` dependency to gain full access to the navigation APIs. Much of the navigation logic is handled in an Android service meaning you'll be able to continue tracking the users progress along the navigation route even when your application is not in the foreground. A few permissions are added into your application. There's no need to add the permissions by default due to manifest merging. The permissions in use are the Internet permission and the access fine location which are required.

## MapboxNavigation object

<!-- preview -->

Most of the navigation options are found inside the MapboxNavigation class including fetching the route, starting and ending the navigation session, and attaching listeners for events that you'd like to handle. Assign and initialize a new instance of MapboxNavigation inside your Navigation activity. When initializing, you'll need to pass in a `Context` and your Mapbox access token. Read the access token section in the [getting started](/mapbox-services/2.0.1/getting-started/#access-tokens) document to learn how to get a free access token.

```java
MapboxNavigation navigation = new MapboxNavigation(this, MAPBOX_ACCESS_TOKEN);
```

### LocationEngine

<!-- preview -->

Navigation requires the user's location to run. This is done using the LocationEngine class introduced in 2.0. Visit the [LocationEngine](/mapbox-services/2.0.1/telemetry/#locationengine) documentation for detailed instructions on how to use this class. You'll need to set up an instance of a location engine and pass it into the MapboxNavigation object.

```java
LocationEngine locationEngine = LostLocationEngine.getLocationEngine(this);
navigation.setLocationEngine(locationEngine);
```

### Requesting a route

<!-- preview -->

Now that you have set up a way for the MapboxNavigation object to get the user's location, the other thing it will need is a route. this is done by calling `getRoute` passing in a origin, destination, and a callback to handle the response. If you've ever worked with [Retrofit](http://square.github.io/retrofit/), the callback here will look familiar since this is what we are using under the hood. Inside the onResponse, you can draw the directions route on a map or present time and distance since the full directions response is provided.

```java
navigation.getRoute(new Callback<DirectionsResponse>() {
  @Override
  public void onResponse(
    Call<DirectionsResponse> call, Response<DirectionsResponse> response) {

  }

  @Override
  public void onFailure(Call<DirectionsResponse> call, Throwable t) {

  }
});
```

## RouteProgress object

<!-- preview -->

The RouteProgress class contains all of the user's progress information along the route, including leg and steps. This object's provided inside `AlertLevelChangeListener` and `ProgressChangeListener`, allowing you to get distance measurements, the percentage of route complete, current step index, and much more.

`RouteProgress` contains two subclasses for leg and step information, the tables below provide a full list of the APIs exposed.

| RouteProgress APIs          | Description           |
| --------------------------- |:---------------------:|
| getAlertUserLevel           | The most recent alert level provided by the AlertLevelChangeListener. |
| getRoute                    | The route acquired from the directions API and being used for navigation. |
| getDistanceRemaining        | The total distance the user has traveled along the route.   |
| usersCurrentSnappedPosition | Provides the users location snapped to the current route they are navigating on. |
| getLegIndex                 | The route's current leg index that the user's on.      |
| getCurrentLeg               | The route's current leg as a `routeLeg` object.    |
| getDistanceTraveled         | Total distance the user has traveled along the entire route. |
| getDurationRemaining        | The estimated duration remaining till the user arrives at their destination. |
| getFractionTraveled         | A `float` value between 0 and 1 giving the total percentage the user has completed in the navigation session.
| getCurrentLegProgress | returns the `LegProgress` object with information specific to the current route leg. You can also access step information through this object. |




















| LegProgress APIs          | Description           |
| --------------------------- |:---------------------:|
 | getFractionTraveledOnRoute  | A `float` value between 0 and 1 giving the total percentage the user has completed in the navigation session. |
 | getDistanceRemainingOnRoute | The distance between the user's current location and the next maneuver.      |
| getUpComingStep             | The next step the user will be on from their current location.      |
| getStepIndex                | The route's current step index the user's on.      |
| getCurrentStep              | The current step that the user's on.       |
| getDistanceTraveledOnStep   | Measures from the current steps maneuver to the user's snapped position.      |
| getDurationRemainingOnStep  | The estimated time remaining until the user reaches end of current step.      |
| getDistanceRemainingOnStep  | Measures from the user's current snapped position to the last coordinate in the step.       |

## Listeners

<!-- preview -->

Chances are, if you are using the navigation SDK, you'll want to listen in to events such as when the user makes progress along the route or when the user goes off route. By listening into these events, you are able to provide the user with instructions at the proper times. At the bare minimum, it is strongly encouraged to use the `OnProgressChange` listener, which is called every time the user's locations updated.

### NavigationRunning

<!-- preview -->

The event callback is handy for being notified when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you are able to decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and much more.

```java
navigation.setNavigationEventListener(new NavigationEventListener() {
  @Override
  public void onRunning(boolean running) {

  }
});
```

### AlertLevelChange

<!-- preview -->

Listening in to the alertLevelChange is useful for correctly getting the timing of user notifications while the user is traversing along the route. The listener's invoked only when the user's reached a specific point along the current step that they are on. The alert thresholds can be adjusted within the constants file while developing and are based on time (in seconds) until the user reaches the next maneuver.

| Alert level                         | Description           |
| --------------------------- |:-------------:|
| `DEPART_ALERT_LEVEL` | Occurs when the user first leaves the origin and shouldn't be invoked again for the rest of the navigation session. |
| `LOW_ALERT_LEVEL` | Invoked right after the user does a maneuver and they have started traversing along a new step. |
| `MEDIUM_ALERT_LEVEL` | Occurs when the user's x seconds away from their next maneuver. This is 70 seconds from next maneuver by default. |
| `HIGH_ALERT_LEVEL` | Useful to know when the user's about to do the next maneuver on the route. This is 15 seconds by default. |
| `ARRIVE_ALERT_LEVEL` | Occurs when the user has performed the last maneuver along the route and reached their final destination. |
| `NONE_ALERT_LEVEL` | This might be invoked in a rare case when the alert level can not be determined. |

> While the AlertLevelChange listener can help you correctly tell your users to do an action, it relies heavily on the user's current position. This means that the alert is rarely changed exactly at the correct time and might be delayed until a new location update occurs and the user is within the alerts threshold.

```java
navigation.setAlertLevelChangeListener(new AlertLevelChangeListener() {
  @Override
  public void onAlertLevelChange(int alertLevel, RouteProgress routeProgress) {
    switch (alertLevel) {
      case HIGH_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "HIGH", Toast.LENGTH_LONG).show();
        break;
      case MEDIUM_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "MEDIUM", Toast.LENGTH_LONG).show();
        break;
      case LOW_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "LOW", Toast.LENGTH_LONG).show();
        break;
      case ARRIVE_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "ARRIVE", Toast.LENGTH_LONG).show();
        break;
      case NONE_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "NONE", Toast.LENGTH_LONG).show();
        break;
      case DEPART_ALERT_LEVEL:
        Toast.makeText(MainActivity.this, "DEPART", Toast.LENGTH_LONG).show();
        break;
    }
  }
});
```

### OnProgressChange

<!-- preview -->

Like listening into user location changes, this listener's invoked every time the user's location changes but provides an updated RouteProgress object. The use of this listener is strongly encouraged, because you can typically update most of your application's user interface. An example of this would be if you are displaying the user's current progress until the user needs to do the next maneuver. Every time this listener's invoked, you are able to update your view with the new information from RouteProgress.

Besides receiving information about the route progress, the callback also provides you with the user's current location which can provide their current speed, bearing, etc. If you have snapping to the route enabled, the location object will be updated to provide the snapped coordinates.

```java
navigation.setProgressChangeListener(new ProgressChangeListener() {
      @Override
      public void onProgressChange(Location location, RouteProgress routeProgress) {

      }
    });
```

### OffRoute

<!-- preview -->

Not implemented in the SDK yet.

## RouteUtils

<!-- preview -->

The RouteUtils class can be found in the mapbox-java-services module and provides many of the methods used for calculations done in the RouteProgress object. An example of this is getting the total route distance left until the user reaches their destination. If you would like to do these calculations on your own or would like the change the behavior of navigation, you can directly call these methods and handle the calculations yourself.
