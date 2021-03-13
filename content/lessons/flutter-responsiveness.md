---
title: Flutter Responsive Design Guide
description: Learning responsiveness will be a cruicial part now that flutter is a portable framework. Because of that we are going to learn some tips and tricks on how to approach it!
image: /assets/images/flutter_responsive_layout_tips.webp
youtube: EH92XnCU1Cc
author: Robert Brunhage
date: 03-13-2021
---

# Flutter Responsiveness

This can be tricky but also very simple. We are going to look in to different approaches that I use to have an responsive design!

## LayoutBuilder

The `LayoutBuilder` will let use be aware of the constraints coming from the parent widget. This is great if we want to change or hide something depending on the parent size. Here is an example usage:

```dart
class LayoutBuilderExample extends StatelessWidget {
  const LayoutBuilderExample({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 600) {
          return Container(
            color: Colors.red,
            height: 100,
            width: 100,
          );
        } else {
          return Container(
            color: Colors.blue,
            height: 100,
            width: 100,
          );
        }
      },
    );
  }
}
```

Now the `Container` will be red or blue depending if the parent widget size is larger or equal to 600.

## MediaQuery

This is another example of how to be aware of different constraints. This one will not take from the parent widget though, but instead take it from the whole layout. Here is an example of how we can hide the `NavBar` when we have a certain width on the screen.

```dart
class MediaQueryExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: screenWidth <= 1200 ? AppBar() : null,
      body: Center(),
    );
  }
}
```

## Breakpoints and constants

One thing we haven't done on the examples above is to define specific breakpoints or also constants. To do this we can have a file containing the different constants we want to use to make a responsive design. Here are some examples

```dart
const kTabletBreakpoint = 768.0;
const kDesktopBreakPoint = 1440.0;

const kSideMenuWidth = 300.0;
const kNavigationRailWidth = 72.0;

const kMaxWidth = 1180.0;
```

Now anytime you need to specify these you just import the file and write the variable as these are all globals. And no, it's no worries that they are global as they are constants!

## Build a responsive widget

So with these fundamentals we are able to compose more complex widgets that will make it easier to adhere to the responsive layouts. Here is a widget that will make us pass a mobile, tablet and desktop body/layout. It will only require the mobile though so if you don't pass anything else it will default to that!

```dart
class ResponsiveLayout extends StatelessWidget {
  const ResponsiveLayout({
    Key? key,
    required this.mobileBody,
    this.tabletBody,
    this.desktopBody,
  }) : super(key: key);

  final Widget mobileBody;
  final Widget? tabletBody;
  final Widget? desktopBody;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, dimens) {
        if (dimens.maxWidth < kTabletBreakpoint) {
          return mobileBody;
        } else if (dimens.maxWidth >= kTabletBreakpoint && dimens.maxWidth < kDesktopBreakPoint) {
          return tabletBody ?? mobileBody;
        } else {
          return desktopBody ?? mobileBody;
        }
      },
    );
  }
}
```

We can also see that we used the different constants that we defines before, which makes this a lot easier to manage!

## Max Width widget

One normal thing you will see of websites is that they force the content to be a max width and also centered. This is super easy to do in Flutter. 

```dart
class MaxWidthContainer extends StatelessWidget {
  const MaxWidthContainer({
    Key? key,
    required this.child,
  }) : super(key: key);
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: kMaxWidth),
        child: child,
      ),
    );
  }
}
```

This will take a widget and that widget will take the space it needs but will have the maxwidth of `kMaxWidth` coming from our constants. On top of this the content will always be centered, giving us that good web look if we deploy with Flutter web.

## Summary

The main ways to have a responsive layout is

* LayoutBuilder
* MediaQuery
* Custom Widgets

These are just my opinion and have worked great so far!