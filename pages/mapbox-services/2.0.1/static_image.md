---
title: Static Image
path: "/mapbox-services/2.0.1/static-image/"
---
The Mapbox Static API returns static maps and raster tiles from styles in the Mapbox Style Specification. Static maps are standalone images that can be displayed in an `ImageView` without the aid of a mapping library or API. They look like an embedded map without interactivity or controls. Specific to the Java API, it builds the request URL for you.

## Building the URL
To begin with you'll need to create a new instance of the `MapboxStaticImage` object and use it's builder to customize your image request. The options offered in the builder include anything from setting the latitude and longitude to adding markers and other annotations. the image width and height are important parameters for displaying the correct aspect ratio inside your applications image view, and in many cases, you will want to check if your users device supports retina or not by using `getResources().getDisplayMetrics().density`.

```java
MapboxStaticImage staticImage = new MapboxStaticImage.Builder()
  .setAccessToken(getString(R.string.access_token))
  .setStyleId(Constants.MAPBOX_STYLE_LIGHT)
  .setLat(45.4338) // Image center Latitude
  .setLon(12.3378) // Image center longitude
  .setZoom(13)
  .setWidth(320) // Image width
  .setHeight(320) // Image height
  .setRetina(true) // Retina 2x image will be returned
  .build();
```

### Downloading the image
After creating the `MapboxStaticImage` instance with all your customization parameters, you'll need to handle downloading the image directly into your application so it is displayed properly to the user. The Mapbox Services SDK doesn't offer any sort of image downloading/loading APIs but we highly recommend using a third party library such as [Picasso](http://square.github.io/picasso/) or [Glide](https://github.com/bumptech/glide) rather then an asynchronous task. Using Picasso, you can downloading the static map image with only a few lines of code.

```java
String imageUrl = staticImage.getUrl().toString();
Picasso.with(this).load(imageUrl).into(imageView);
```

<!-- ## Overlaying annotations
An overlay is data that can be applied on top of the map image at request time. these can be a mix of valid GeoJSON, a marker, a custom marker or path. Overlays cannot consist of more than 100 features. The maximum overlay length is 2083 characters.

While building your request, you can choose to auto position the camera so that all your annotations fit within the viewport. To do this, remove the `setLat()` and `setLon()` and instead use `auto()`. `beforeLayer()` can be used to specify where in the map layer stack you'd like your annotations to appear. A marker overlay can be applied to the static map by providing a position, a name `pin-s`, `pin-m`, or `pin-l`, label and a color.

```java
Marker marker = new Marker()
  .setName("pin-m")
  .setLabel("a")
  .setColor("50667f")
  .setLat(45.4338)
  .setLon(12.3378);

MapboxStaticImage staticImage = new MapboxStaticImage.Builder()
  .setMarker(marker)
  ...
``` -->
