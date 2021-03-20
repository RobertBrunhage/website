---
title: Flutter Basics Updating the UI
description: What are the fundamental ways of updating the UI? And how come the UI is not updating unless I run a Hot Reload? Fear not we will look in to both of these and you will get a solid understanding of it!
image: /assets/images/flutter_basics_update_ui_thumbnail.webp
youtube: Ot7hIAzxj4o
github: https://github.com/Robert-Brunhage-Organization/flutter_basics_update_ui
author: Robert Brunhage
date: 03-20-2021
---

# There are three fundamentals ways

We are going to cover all of them and the reason your UI may not update when you make changes inside the application!

## SetState

This is the most simple one but just to reiterate, it will trigger a rebuild of the `StatefulWidget` and it's children!

Here is an example:

```dart
class HomeWithSetStatePage extends StatefulWidget {
  @override
  _HomeWithSetStatePageState createState() => _HomeWithSetStatePageState();
}

class _HomeWithSetStatePageState extends State<HomeWithSetStatePage> {
  String name = 'Robert';

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            SizedBox(height: 108),
            Text('My name is', style: textTheme.headline1),
            Text(name, style: textTheme.headline2),
            Spacer(),
            TextField(
              onSubmitted: (value) {
                // We want to update the name
                // WE NEED TO CALL SETSTATE TO TRIGGER A REBUILD
                setState(() {
                  name = value;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

## Doing the same with ValueNotifier

To do the same with a `ValueNotifier` we actually don't need a `StatefulWidget` but instead we can just use a `ValueListnableBuilder`. So everytime the `ValueNotifier` has a new value the `ValueListnableBuilder` will listen to this change and update it's children similar to how `StreamBuilder` works!

Here is an example:

```dart
class HomePage extends StatelessWidget {
  // All properties of a StatelessWidget needs to be immutable so we make this final
  // But the value inside the ValueNotifier can still change!
  final ValueNotifier<String> nameNotifier = ValueNotifier('Robert');

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            SizedBox(height: 108),
            Text('My name is', style: textTheme.headline1),
            // Here we must use a ValueListnableBuilder to know when the value of nameNotifier updates
            ValueListenableBuilder(
              valueListenable: nameNotifier,
              builder: (context, name, child) {
                return Text(name, style: textTheme.headline2);
              },
            ),
            Spacer(),
            TextField(
              onSubmitted: (value) {
                // We want to update the name
                // So we set the value of the nameNotifier to the value coming from the TextField
                nameNotifier.value = value;
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

## ChangeNotifier

First we add Provider to our `pubspec.yaml`, just make sure you always use the latest version!

Keep in mind that `ChangeNotifier` is actually part of Flutter and not `Provider` but with `Provider` we get simpler ways to listen to the changes as well as other nice things on top!

```dart
class MyChangeNotifier extends ChangeNotifier {
  String _name = 'Robert';
  String get name => _name;

  set name(String newName) {
    _name = newName;
    notifyListeners();
  }
}
```

This is the `ChangeNotifier` we created. We have to have the real field to private. The reason for this is because when we change it (using the setter) we MUST call `notifyListeners()`. If we don't call it the UI will NOT update, the same way as if we don't call `SetState` or use a `ValueListnableBuilder` in the previous example!

So first of at the top we just provide the `ChangeNotifier` class we just created

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // Here we provide it with a ChangeNotifierProvider
        ChangeNotifierProvider(
          create: (context) => MyChangeNotifier(),
        ),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: HomeChangeNotifierPage(),
      ),
    );
  }
}
```

Now in any child widget and in this case the `HomeChangeNotifierPage` we can listen to this value similar to with a `ValueListnableBuilder` or a `StreamBuilder`, take a look!

```dart
class HomeChangeNotifierPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            SizedBox(height: 108),
            Text('My name is', style: textTheme.headline1),
            // We use a Consumer and look for the MyChangeNotifier class that we created in the MultiProvider on the previous example
            Consumer<MyChangeNotifier>(
              builder: (context, myChangeNotifier, child) {
                return Text(myChangeNotifier.name, style: textTheme.headline2);
              },
            ),
            Spacer(),
            TextField(
              onSubmitted: (value) {
                // We want to update the name
                context.read<MyChangeNotifier>().name = value;
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

## Summary

That is all and in all of these cases if you forget either

* SetState
* ValueListnableBuilder
* notifyListeners()

Your UI will not update with the changes!