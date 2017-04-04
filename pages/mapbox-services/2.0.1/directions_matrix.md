---
title: Directions Matrix
path: /mapbox-services/2.0.1/directions-matrix/
---
The Directions Matrix API returns all travel times between many points. The Matrix API will always return the duration on the fastest route. Durations between points may not be symmetric (for example A to B may have a different duration than B to A), as the routes may differ by direction due to one-way streets or turn restrictions. The Matrix API returns durations in seconds. It does not return route geometries or distances. Make sure to have a look at the API documentation if you want [more information](https://www.mapbox.com/api-documentation/#directions-matrix).

This API allows you to build tools that efficiently check the reachability of coordinates from each other, filter points by travel time, or run your own algorithms for solving optimization problems.

The standard limit for request are a maximum 60 requests per minute and maximum 25 input coordinates. For example you can request a symmetric 25x25 matrix, an asymmetric 1x24 matrix with distinct coordinates or a 12x24 where sources and destinations share some coordinates. For higher volumes contact us.

> **Note:** This replace the distance.v1 API which will be removed when `3.0.0` of Mapbox Services is released.

## Building and making requests
Before requesting and receiving the Directions Matrix response, you'll need to use the `MapboxDirectionsMatrix` builder to set the request parameters. The most basic request passes in a `List` of coordinates, sets the directions profile and provides an access token.

```java
MapboxDirectionsMatrix client = new MapboxDirectionsMatrix.Builder()
  .setAccessToken(ACCESS_TOKEN)
  .setProfile(DirectionsCriteria.PROFILE_WALKING)
  .setCoordinates(positions)
  .build();
```

## API response
Like all API calls inside Mapbox Services, the response will come inside a retrofit callback. inside the onResponse, you can access the APIs returned response if successful.

```java
client.enqueueCall(new Callback<DirectionsMatrixResponse>() {
  @Override
  public void onResponse(Call<DirectionsMatrixResponse> call, Response<DirectionsMatrixResponse> response) {

  }

  @Override
  public void onFailure(Call<DirectionsMatrixResponse> call, Throwable t) {

  }
});
```
