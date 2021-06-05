---
title: Flutter Crash Course
description: We are going to learn by doing and build our very own net worth tracker!
image: /assets/images/flutter_crash_course_thumbnail.webp
youtube: ktDo9wH4W_4
github: https://github.com/Robert-Brunhage-Organization/flutter_crash_course
author: Robert Brunhage
date: 06-05-2021
---

To get started is most of the time the most daunting task so let's do it together, this is what we will build!

![App gif](https://firebasestorage.googleapis.com/v0/b/krossa-prod.appspot.com/o/e3IUXc1BFZTlvvaqD8xjvHlIy2q1%2Farticles%2F2mhEeK0Bnxnc4I9zTC4L%2Fflutter%20crash%20course%20giff.gif?alt=media&token=268b9b28-3267-4cc5-a1c5-7735184dec8c)

I also have a competition for this one with a total of $175 in Amazon gift cards so make sure to check the video to learn more about that!

## The basics

First of we have to first understand two basic concepts which are `StatelessWidget` and `StatefulWidget` and I think the most simple way to explain it is to think of a `StatelessWidget` will just display data and `StatefulWidget` will display data but with it, it's also possible to update and display new data. In the case of Flutter, we have something called a `Widget Tree` where these will be used.

And example could be that you have a parent widget which is `Stateful` and a child widget which is `Stateless`. In the case where you tell the `Stateful` one to rebuild the child/children will also rebuild. So always start with a `StatelessWidget` and convert it to `Stateful` when you find the need for it.

## Set up the basics

**IMPORTANT:** I expect that you have installed Flutter already as this really won't go through the installation steps.

This is how we will start out with the project, we will remove the typical counter application and replace it with pretty much nothing, take a look.

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }
}
```

Let's go over this quickly. First I've added the services import, and you can ignore this for now but we will use that to force the user to only be able to input digits from the keyboard later on.

Right now we have the entry point with is `main` this one sets up our first widget which in this case is called `MyApp` as we are using the `Material` theming we will use a `MaterialApp`, in this we can override the theme which we will do soon.

Our `HomePage` is very simple as well and you may notice that this one is actually a `StatefulWidget` the reason for this is because I want it to manage the "asset amount" and the "liabilities amount". That way, when these change all the children will rebuild and show the new values as well.

Let's go ahead and add some theming, this will just make it a bit easier as I won't have to for example set the background color for every new page that we show and so on.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Color(0xff222747),
        textSelectionTheme: TextSelectionThemeData(
          cursorColor: Colors.grey.shade800,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            padding: EdgeInsets.symmetric(horizontal: 56, vertical: 16),
          ),
        ),
        cardTheme: CardTheme(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        cardColor: Color(0xff444968),
      ),
      home: HomePage(),
    );
  }
}
```

## Start Building

Let's start by making the cards on the main screen, to do this we need to first build out the layout. Now there are multiple widgets to decide how widgets should be layed out such as `Column`, `Row`, `ListView` and so on. We are mostly going to stack out things vertically so in this case it's widgets like `Column` and `ListView` that will be our friends.

Now notice that I may not make everything perfect here and the reason for this is because I want YOU to download this repo, improve on it and learn. There are many, many ways to do the same thing and you will understand it better by testing it out.

```dart
class _HomePageState extends State<HomePage> {
  // These two will hold the values that we will change later
  var assetAmount = 0;
  var liabilitiesAmount = 0;

  // The method that is responsible for setting the Asset variable as well as updating the UI.
  void setAssetAmount(int asset) {
    setState(() {
      assetAmount = asset;
    });
  }

  // The method that is responsible for setting the Liabilities variable as well as updating the UI.
  void setLiabilitiesAmount(int liabilities) {
    setState(() {
      liabilitiesAmount = liabilities;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Center(
            child: Column(
              children: [
                SizedBox(height: 48),
                Text(
                  'Add your assets and liabilities',
                  style: theme.textTheme.headline5,
                ),
                SizedBox(height: 102),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

As you can see here we have done some very basic building blocks and I will comment the code to make it simpler to understand, but we will see a lot of widgets we have no idea on what they are doing...

Just to throw it out there, you will be confused in the beginning, there are a lot of widgets for a lot of things but over time you will understand and it will feel like second nature!

I will give a quick overview here on what the widgets are and what they do:

`Scaffold`: Implements the basic Material design layout, with things like `AppBar`, `Body`, `BottomNavigationBar` etc.
`SafeArea`: The children will not be hidden behing things like the statusbar.
`SingleChildScrollView`: A scrollable widget that will take only 1 child.
`Center`: Will center a widget
`Column`: A layout widget that will stack items vertically, we use the center widget to force this to take the entire width.
`SizedBox`: a simple box.
`Text`: The widget that lets us have text.

We are going to use these to pretty much build everything here so let's see what we can do...

Below the last `SizedBox` we will add the following

```dart
	AmountCard(
	title: 'Assets',
	amount: assetAmount,
	onTap: () => showDialog(
		context: context,
		builder: (context) {
			return NumberInputDialog(
				onTap: setAssetAmount,
				title: 'Assets',
				amount: assetAmount,
			);
		},
	),
),
SizedBox(height: 16),
	AmountCard(
	title: 'Liabilities',
	amount: liabilitiesAmount,
	onTap: () => showDialog(
		context: context,
		builder: (context) {
			return NumberInputDialog(
				onTap: setLiabilitiesAmount,
				title: 'Liabilities',
				amount: liabilitiesAmount,
			);
		},
	),
),
SizedBox(height: 102),
	ElevatedButton(
		style: ElevatedButton.styleFrom(
			primary: Colors.white,
		),
		onPressed: () {},
	),
	child: Text(
		'Calculate',
		style: theme.textTheme.button!.copyWith(
			color: Colors.grey.shade800,
			fontWeight: FontWeight.bold,
		),
	),
),
```

Now the application won't work ad we need 2 main things that we are missing which are the `AmountCard` as well as the `NumberInputDialog`. Let's head over to the next section and build those two!

## Building your own widgets

You may have noticed already and that is that there are **A LOT** of widgets. Now this is both powerful and daunting for sure, so lets tackle building our own ones.

Let's start with the `AmountCard`

```dart
class AmountCard extends StatelessWidget {
  const AmountCard({
    Key? key,
    required this.title,
    required this.amount,
    this.onTap,
  }) : super(key: key);

  final String title;
  final int amount;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      height: 148,
      width: size.width * 0.8,
      child: Card(
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(8),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(title, style: Theme.of(context).textTheme.bodyText1),
              SizedBox(height: 4),
              Text(amount.toString(), style: Theme.of(context).textTheme.headline6),
            ],
          ),
        ),
      ),
    );
  }
}
```

As you can see this is just a `StatelessWidget` that takes some argument in the constructor. in the `build` method we decide how this widget will look and behave!

Now as much as I would love to go over every single widget, that will take a bit of extra time so I urge you to look at the documentation for all of the widgets that you don't understand over on the [widget catalog](https://flutter.dev/docs/development/ui/widgets).

One thing I may note here is that we use this weird thing: `final size = MediaQuery.of(context).size;`. This is to access the size of our device, that way we can set sizes for widgets depending on the size of the device, which is SUPER powerful!

Let us now build the `NumberInputDialog`

```dart
class NumberInputDialog extends StatefulWidget {
  const NumberInputDialog({
    Key? key,
    required this.onTap,
    required this.title,
    required this.amount,
  }) : super(key: key);

  final Function(int) onTap;
  final String title;
  final int amount;

  @override
  _NumberInputDialogState createState() => _NumberInputDialogState();
}

class _NumberInputDialogState extends State<NumberInputDialog> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.amount == 0 ? '' : widget.amount.toString());
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final outlineInputBorder = OutlineInputBorder(
      borderSide: BorderSide(color: Colors.grey.shade600, width: 1),
    );

    return Dialog(
      backgroundColor: Colors.white,
      child: Container(
        padding: EdgeInsets.all(20),
        width: screenSize.width * 0.7,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              widget.title,
              style: Theme.of(context).accentTextTheme.headline6?.copyWith(color: Colors.grey.shade800),
            ),
            SizedBox(height: 24),
            TextField(
              controller: _controller,
              keyboardType: TextInputType.number,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly],
              style: TextStyle(color: Colors.grey.shade900),
              autofocus: true,
              decoration: InputDecoration(
                contentPadding: EdgeInsets.symmetric(vertical: 8, horizontal: 8),
                labelStyle: TextStyle(color: Colors.grey.shade600),
                focusedBorder: outlineInputBorder,
                enabledBorder: outlineInputBorder,
                labelText: 'Write amount',
              ),
            ),
            SizedBox(height: 24),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                primary: Theme.of(context).cardColor,
                padding: EdgeInsets.symmetric(horizontal: 56),
              ),
              onPressed: () {
                widget.onTap(int.parse(_controller.text));
                Navigator.of(context).pop();
              },
              child: Text(
                'Done',
                style: Theme.of(context).textTheme.button!.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

Now this one is a bit tricky as a lot of the code here is basically just designing and making it look nice, the most important part here is that the first widget is a `Dialog` in the `build` method. The reason for this is because we are showing this widget with a `showDialog` method. This just handles a lot of things for us such as making the background a dark tint and so on.

Another thing we do is setting up something called a `TextEditingController`, this is so that we can get the text value to be used when we click the **Done** button. One important part here is the `InitState` and `Dispose`.

Short explaination of these two:
`InitState`: Called when the widget is inserted to the tree, so right before the `build` method is called, it will call this only **ONCE**.
`Dispose`: Called when the widget is removed from the tree permantently. Make sure to dispose things that needs it here to avoid memory leaks.

With all this implemented you should be able to click on cards, add values and that will be displayed in the app, so on to showing the net worth page with an animation!

## Building the net worth page

The UI will be **VERY** simple here as we will only show a text in the middle of the screen with the net worth value passed from the previous screen. The majority of code comes from setting up an animation so let's take a look!

```dart
class NetworthPage extends StatefulWidget {
  const NetworthPage({
    Key? key,
    required this.amount,
  }) : super(key: key);

  final amount;

  @override
  _NetworthPageState createState() => _NetworthPageState();
}

class _NetworthPageState extends State<NetworthPage> with SingleTickerProviderStateMixin {
  // This will be responsible for driving the animation and the vsync comes from our SingleTickerProviderStateMixin.
  late final AnimationController _animationController = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1500),
  );

  // We create a animation object to customize our animation, this is done in initState.
  late final Animation<int> _animation;

  @override
  void initState() {
    super.initState();
		// With IntTween we can set a begin and end value as well as adding a CurvedAnimation.
    _animation = IntTween(begin: 0, end: widget.amount).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );

    // Here we start the animation.
    _animationController.forward();
  }

  @override
  void dispose() {
	  // Dispose it so we don't get memory leaks.
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ValueListenableBuilder<int>(
              valueListenable: _animation,
              builder: (context, value, child) {
                return Text(
                  'Your total net worth is $value',
                  style: Theme.of(context).textTheme.headline5,
                  textAlign: TextAlign.center,
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
```

As you can see I also added some comments to break it down a bit, but in essence we start an animation that will animate from 0 to our net worth value. In the `build` method we listen to this animation with a `ValueListnableBuilder` which will rebuild everytime the animation changes. With this approach we don't have to call `setState` over and over again to actually see anything!

So now we only need to push to this page when we are in the `HomePage` which is quite simple. Here is the button we used and I've gone a head and added the code for actually navigating.

```dart
ElevatedButton(
	style: ElevatedButton.styleFrom(
		primary: Colors.white,
	),
	onPressed: () => Navigator.of(context).push(
		MaterialPageRoute(
			builder: (context) => NetworthPage(amount: assetAmount - liabilitiesAmount),
			fullscreenDialog: true,
		),
	),
	child: Text(
		'Calculate',
		style: theme.textTheme.button!.copyWith(
			color: Colors.grey.shade800,
			fontWeight: FontWeight.bold,
		),
	),
),
```

In the `OnPressed` call we call the `Navigator` to push a new page. Using the `MaterialPageRoute` we can define what page we want to push as well as if we want it to be a `fullScreenDialog` or not, in this case I want that as it makes a bit more sense in this case, but you can leave it out if you want.

It will push to the `NetworthPage` with the `assetAmmount` - `liabilitiesAmount` which will sum up to the net worth!

There we have it, if you want to take a look at the full code, you can find it over on [GitHub](https://github.com/Robert-Brunhage-Organization/flutter_crash_course)

You can also find a PDF with Flutter tips if you sign up on [robertbrunhage.com](https://robertbrunhage.com)!

### Summary

By just using the basics we can come up with quite cool apps and my real goal for you is to check out the code, improve on it or just build something similar! The best way to learn is to build something 😊
