---
title: My 10 Most Favorite Flutter Widgets
description: Learning new widgets can make your life a lot easier when working with Flutter. In This one we are going to take a look at my favorite ones!
image: /assets/images/favorite_flutter_widgets.webp
youtube: ILATAD57gIc
github: https://github.com/Robert-Brunhage-Organization/favorite_flutter_widgets
author: Robert Brunhage
date: 02-20-2021
---

# Top 10 Favorite Flutter Widgets

Over the past 3 years these are my favorite 10 widgets, outside of the normal widgets such as Text, Scaffold etc 😂

## Widget number 1: FittedBox

FittedBox is great for making things feel more responsive. An example of this is if you want text to grow to always fit a certain parent such as a `Container`

```dart
Container(
	color: Colors.red,
	width: 300,
	height: 300,
	child: FittedBox(
		child: Text('Please fit'), // This `Text` will always grow to fit the Container.
	),
),
```

## Widget number 2: Placeholder

The `Placeholder` widget is great when you are starting to block out your design and don't have access to the images yet or you are too lazy to add the images right away 😅. To use it, it's rather simple, take a look!

```dart
Container(
	height: 300,
	width: 300,
	child: Placeholder(),
)
```

And that is about it, all you need to do is instantiate it and it will cover the parents `width` and `height`!

## Widget number 3: Wrap

You have probably used `Column` or `Row` before, well this is pretty much a combination of both. It will instead of ending in only 1 direction, instead wrap the items that overflow to a new line. much like how this text is wrappen to the next line!

```dart
Wrap(
  children: List.generate(
    10,
    (index) => Container(
      margin: const EdgeInsets.all(10),
      color: Colors.red,
      height: 100,
      width: 100,
    ),
  ),
)
```

This will create 10 square containers with a red color, and when there is no more horizontal space, it will wrap and continue below it.

## Widget number 4: LayoutBuilder

This is great if you want something to be responsive depending on the parent widget. This will get the constrains from the parent and make it possible to display something depending on that size.

```dart
LayoutBuilder(
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
```

Sometimes though you don't want it to be reliant on the parent widget, and we will get to that!

## Widget number 5 and 6: InkWell and AnimatedIcon

I added these two together as it will make it easier to see both in acion! To put it simply the `InkWell` will make anything it wraps clickable while also adding that wave effect that you can see in `Material Design`, if you don't want that effect consider `GestureDetector` instead. 

The `AnimatedIcon` will let you animate between two different icons and it already has some of these out of the box, let us look at an example!

```dart
class InkWellWithAnimatedIconExample extends StatefulWidget {
  @override
  _InkWellWithAnimatedIconExampleState createState() => _InkWellWithAnimatedIconExampleState();
}

class _InkWellWithAnimatedIconExampleState extends State<InkWellWithAnimatedIconExample> with SingleTickerProviderStateMixin {
  AnimationController myAnimation; // animation object to decide when to start and reverse the animation.

  @override
  void initState() {
    super.initState();
	// We need to initialize this animation, we will do that with a duration of 500 milliseconds.
    myAnimation = AnimationController(vsync: this, duration: Duration(milliseconds: 500));
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        if (myAnimation.isCompleted) {
          myAnimation.reverse();
        } else {
          myAnimation.forward();
        }
      },
      child: Center(
        // We are using the `AnimatedIcons.add_event` Icon but there are many more so try it out!
        child: AnimatedIcon(icon: AnimatedIcons.add_event, size: 52, progress: myAnimation),
      ),
    );
  }
}
```

## Widget number 7: MediaQuery

This is an InheritedWidget which will let you get the size of the full window size instead of the `LayoutBuilder` which will get the constraints from the parent widget.

The following example will display the `AppBar` depending on if your window is small or big in width.

```dart
class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final totalWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: totalWidth <= 600 ? AppBar() : null,
      body: Center(),
  }
}
```

## Widget number 8: SnackBar

I love using `SnackBar` and the way we use it is not yet in the `Stable` channel but will probably be that soon!

```dart
ElevatedButton(
  onPressed(
	onPressed: (){
   	  ScaffoldMessenger.of(context).showSnackBar(
	    SnackBar(
	      content: Text('Hello from Snackbar'),
	      behavior: SnackBarBehavior.floating,
	    )
	  );
	}
  ),
  child: Text('open snackbar'),
),
```

## Widget number 9: SizedBox

I don't need to say much about this one, more than it's a simplified `Container` widget. Do you want some spacing between widgets or just have a parent widget with a specified size? Consider using `SizedBox` instead of things like `Container`. It will make the code a lot more clear which is great with not much to change!

## Widget number 10: Hero

The `Hero` widget is great if you want to add a transition on things like an Image that should move over to the next page when you navigate for example.

You can find a great video made by the Flutter team: <a href="https://www.youtube.com/watch?v=Be9UH1kXFDw" target="_blank" rel="noopener">Hero video</a>
