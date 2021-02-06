---
title: Master Documentation in Flutter 
description: Understanding documentation is one of the most important topics of developing any kind of software. Here is a way that I recommend using the documentation in Flutter!
image: /assets/images/master_flutter_documentation_thumbnail.png
youtube: UyYZR1LnqOg
github: https://github.com/RobertBrunhage/master_flutter_documentation
author: Robert Brunhage
date: 02-02-2021
---
# Master Documentation in Flutter

Learning to utilize documentation is key to becoming a great Software Engineer and luckily the Documentation in Flutter is excellent!

## Use the SDK docs

When we write Flutter applications we have access to the full SDK of Flutter, but what does that mean?

Well in simple terms we have access to the whole codebase of Flutter while we are making the app. You have probably done this before but when you go to a definition to a class you will navigate to it, and see the code for it.

Let's give an example... If we have `DetailsPage` that display the user info coming from a `User` class. We can navigate to the `User` class to see all of it's members and methods, such as name, age and so on. Well, we can actually do the same thing but instead of a `User` we could do it on a `ElevatedButton`. This makes it possible to see how **Google** did the implementation of the `ElevatedButton` and from that we can get an understanding of how we can create our **custom** implementation of it.

## How does it look?

Well let's say we have out little own `CustomButton` widget, and we want the basic functionality from the `ElevatedButton`. When we navigate to the `ElevatedButton` we will see a lot of code but the important part here is the constructor.

```dart
  const ElevatedButton({
    Key? key,
    required VoidCallback? onPressed, // We can see here that they use some kind of `VoidCallBack`
    VoidCallback? onLongPress,
    ButtonStyle? style,
    FocusNode? focusNode,
    bool autofocus = false,
    Clip clipBehavior = Clip.none,
    required Widget? child,
  }) : super(
    key: key,
    onPressed: onPressed,
    onLongPress: onLongPress,
    style: style,
    focusNode: focusNode,
    autofocus: autofocus,
    clipBehavior: clipBehavior,
    child: child,
  );
```

Now we can use the same kind of logic to implement our `onPressed` functionality, making our widget reusable.

```Dart
class CustomButton extends StatelessWidget {
  const CustomButton({
    Key key,
    @required this.onPressed, //This is not null safe that is why we have @required and not required
  }) : super(key: key);

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text('Click me!'),
    );
  }
}
```

Now our button enables us to pass the methods that we want to use instead of hardcoding it in the widget. This is all thanks to that documentation we have at our fingertips. If we don't know how to implement something but a already implemented widget has almost the functionality we need, make sure to look at the code for how that widget was implemented in the SDK.

## Website

Now this documentation is great and I use it probably more than any other documentation. But we also have acceess to the Flutter documentation on the Site.

I won't go in to the typical documentation where they have made everything neat with codelabs, videos etc but instead take a look at the docs found <a href="https://api.flutter.dev/" target="_blank" rel="noopener">here</a>.

This is the documentation for what you already found in the SDK and this serves great when you instead want to navigate around on the website which provides a bit more structure (sidebar etc).

## Conclusion

The documentation can be daunting but once you understand the basics, it will be the best tool for your programming journey.

Hope you found this useful, and while you are at it, make sure to check out some of the other posts on the website!