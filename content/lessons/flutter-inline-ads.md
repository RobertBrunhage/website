---
title: Add Inline Ads to Your Flutter App
description: Having ads can be super important for your apps, so let's take a look how we have use inline ads in our application
image: /assets/images/flutter_inline_ads_thumbnail.webp
youtube: 4mJQQmjnL3Q
github: https://github.com/Robert-Brunhage-Organization/flutter_inline_ads
author: Robert Brunhage
date: 04-10-2021
---

## Initial setup

To first get started we need 2 packages, in this case it will be <a href="https://pub.dev/packages/google_mobile_ads" target="_blank" rel="noopener">Google mobile ads</a> and then we will use <a href="https://pub.dev/packages/flutter_riverpod" target="_blank" rel="noopener">Riverpod</a> to provide that to the rest of our application!

Of course I recommend reading the setup guide for the Google mobile ads as you need to do some platform specific tasks. To keep this as updated as possible I will not add those steps here but they will be outlined in the readme of the package!

## The simple beginning

Now we need to create a class that will contain the data for our ads. This is the class we will provide to the rest of our application. You can see it as a kind of helper class just to make the handling of ads a bit easier!

```dart
class AdState {
  AdState({
    required this.initialization,
  });
  Future<InitializationStatus> initialization;

  String get bannerAdUnitId {
    if (Platform.isAndroid) {
      return 'ca-app-pub-3940256099942544/6300978111';
    } else {
      return 'ca-app-pub-3940256099942544/2934735716';
    }
  }

  AdListener get adListener => _adListener;

  AdListener _adListener = AdListener(
    // Called when an ad is successfully received.
    onAdLoaded: (Ad ad) => print('Ad loaded.'),
    // Called when an ad request failed.
    onAdFailedToLoad: (Ad ad, LoadAdError error) {
      ad.dispose();
      print('Ad failed to load: $error');
    },
    // Called when an ad opens an overlay that covers the screen.
    onAdOpened: (Ad ad) => print('Ad opened.'),
    // Called when an ad removes an overlay that covers the screen.
    onAdClosed: (Ad ad) => print('Ad closed.'),
    // Called when an ad is in the process of leaving the application.
    onApplicationExit: (Ad ad) => print('Left application.'),
  );
}
```

The `bannerAdUnitId` here represents some test IDs to show banners for Android and iOS. If you want your real ads you need to replace those with the ones you have!

## Providing

So now we want to somehow create an instance of the `AdState` class to provide that with it's data. To do that is rather simple take a look at the code.

```dart
// The value here will be overridden in main
final adStateProvider = ScopedProvider<AdState>(null);

void main() {
  // Ensure that we have the binding setup to the platforms
  WidgetsFlutterBinding.ensureInitialized();
  final adsInitialization = MobileAds.instance.initialize();
  final adState = AdState(initialization: adsInitialization);
  runApp(
    ProviderScope(
      overrides: [
        adStateProvider.overrideWithValue(adState),
      ],
      child: MyApp(),
    ),
  );
}
```

So what we do here is that we `initialize` the ads to then get a `Future` back for when the ads are `initialized`. We take this value, add to the instance of our class and provide that class. Now we will be able to use this class throughout the application!

## Provide a list

So what we will do here is that we want the application to display a list on countries and this list will then have some ads between, let's say every 5 items. To do this we first have to create out `Country` class.

```dart
class Country {
  Country(this.name, this.dialingCode);
  final String name;
  final String dialingCode;
}
```

Then in our application where we show the page we can for now just generate a dummy list, but of course this would be the real list that you would have.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter inline ads',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ListPage(
        // Generate a list of 50 countries
        countries: List.generate(50, (index) => Country('Sweden', '+46')),
      ),
    );
  }
}
```

Now we just have to make sure that our `ListPage` that we are going to create can take in this list and display it!

```dart
class ListPage extends StatefulWidget {
  ListPage({
    Key? key,
    required this.countries,
  }) : super(key: key);

  final List<Country> countries;
  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Inline Ads'),
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          final item = widget.countries[index];

          return Card(
            child: ListTile(
              title: Text(item.name),
              trailing: Text(item.dialingCode),
            ),
          );
        },
        itemCount: widget.countries.length,
      ),
    );
  }
}
```

Now we will display a list of countries but we won't really use the ads we provided yet, so let us see how we can do that!

## Use the Ads

We need to do a couple of things and I will first list them up and then show the implementation!

- Have a state object (list) that we can add our ads into but also have the countries in it.
- Copy of list into this state object.
- Add our ads in to the list and also make sure that everytime the list changes we redo it.
- Depending if we have an ad or a country in the list we display that one.

Now when we have that out of the way, let's see how that is implemented!

```dart
class ListPage extends StatefulWidget {
  ListPage({
    Key? key,
    required this.countries,
  }) : super(key: key);

  final List<Country> countries;
  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  late List<Object> countriesWithAds;

  @override
  void initState() {
    super.initState();
    countriesWithAds = List.from(widget.countries);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final adState = context.read(adStateProvider);
    adState.initialization.then((value) {
      insertAdsToCountriesList(adState);
    });
  }

  void insertAdsToCountriesList(AdState adState) {
    setState(() {
      for (var i = countriesWithAds.length - 5; i >= 1; i -= 10) {
        countriesWithAds.insert(
          i,
          BannerAd(
            size: AdSize.banner,
            adUnitId: adState.bannerAdUnitId,
            listener: adState.adListener,
            request: AdRequest(),
          )..load(),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Inline Ads'),
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          final item = countriesWithAds[index];
          if (item is Country) {
            return Card(
              child: ListTile(
                title: Text(item.name),
                trailing: Text(item.dialingCode),
              ),
            );
          } else {
            return Container(
              height: 50,
              child: AdWidget(ad: item as BannerAd),
            );
          }
        },
        itemCount: countriesWithAds.length,
      ),
    );
  }
}
```

## Summary

So all we have to do was initialize the ads, provide them in out application, ad the number of ads we wanted in out list and check if the list item is either a `Country` or `BannerAd` to display it!