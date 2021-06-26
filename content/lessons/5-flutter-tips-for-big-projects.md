---
title: 5 Flutter Tips for Large Projects
description: Learn these 5 tips and you can apply them INSTANTLY in your project. I promise you will not regret doing it!
image: /assets/images/5_flutter_tips_thumbnail.webp
youtube: 1_W03XANLWY
github: https://github.com/Robert-Brunhage-Organization/five_flutter_tips
author: Robert Brunhage
date: 06-26-2021
---

Projects always starts out small but they usually **grow** tremendously fast!

Now in my opinion the greatest tip you could get is to keep refactoring to heart. Though that is a complete topic in itself so now I instead want to teach you 5 tips that you can apply **instantly** in your projects!

## Linting

One thing that will happen in **any project** but of course will be more **obvious** is that being consistent in how you code is **HARD**. Let's say we want to always write `const` wherever possible, like the following.

```dart
// I sometimes do this
Dog dog = Dog();

// But I want to always do this when possible
Dog dog = const Dog();
```

Well there is a lint rule for that, which is called **perfer_const_constructors**.

### How to set up linting

We will use the easiest approach which is just using an existing package in [pub.dev](https://pub.dev). Searching for "lint" should give us a ton of different packages, in this example we will just use the [lint package](https://pub.dev/packages/lint).

1. Add the package to `pubspec.yaml`
2. Create a `analysis_options.yaml` file at the root of your application
3. import the package

That is all, this package already had the **prefer_const_constructors** enabled for us!

```dart
// This will now have a warning
Dog dog = Dog();

// This will have no warning
Dog dog = const Dog();
```

## Flutter/Dart Packages

Something we just did with the lint package was just importing it and we could start using it. We can do this with **our own code** as well!

This code we could have in our project in a folder called **packages** but we could also host it in services like **GitHub**, **GitLab** and so on. That means we could even reuse code between projects 🧠.

### How to set up a package

1. Create a folder in the **root** of your application
2. Create a folder inside root with the functionality you want, let's say we create a **authentication** folder
3. Create a **pubspec.yaml** file with the following

```dart
name: authentication
description: All authentication shared logic

publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ">=2.12.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

When you run `flutter packages get` it will generate the files to make this in to a custom **package**. Be aware that if you don't need Flutter functionality in the package you can simply remove all the dependencies to flutter!

Now we can use it like normal!

1. Create a lib folder in the authentication package
2. Create files with the logic you want
3. Import the package in your root projects **pubspec.yaml**

The difference when importing this package **compared** to a package found in pub.dev is that we have to define the **path**.

To install the package we add the following

```yaml
// The name of the package
authentication:
    // The path to our package, this can also be pointing to GitHub and so on.
    path: ./packages/authentication
```

Now we just import it as any other package and enjoy the **modular** code 😊

## CI/CD

This is probably my favorite and is of course like all the other tips useful is smaller projects as well. That is, setting up a CI/CD workflow. I won't really go in to how you can do it as you can learn that [here](https://www.youtube.com/watch?v=rpQKpXjH5vs).

But some of the **benefits** of setting this up

- Code will be **analyzed** everytime you push a change
- Code will be **tested** everytime you push a change
- Code will be **built** everytime you push a change
- Code can be **deployed** whenever you want

## Testing

So **CI/CD** will become the most powerful tool you have when you start **testing**. This is just the notion of writing some code that will be executed as a "test", which will test the production code if it does what it is supposed to!

If you are new to this, let's take a look at an example!

```dart
int sum(int num, int num2) {
	return num + num2;
}
```

This is a super simple example, but in this case we will have a method that simply just give us the sum of two values. Now let's **imagine** that anytime in the project lifetime, you accidentaly change something in this method to not use **+** but instead **-**. This will break your application and not something you want.

Let's make sure that doesn't happen and write a simple test!

```dart
test('two numbers should add to the correct sum', () {
	// execute method with two numbers
	final sumAOfValues = sum(5,2);

	// validate that the result is correct
	expect(sumOfValues, 7);
});
```

**That is all!** Now our test makes sure that it will actually add the numbers together and not do something else. If you followed the step before which was **CI/CD** you would have this test run **everytime you push changes**. Now that method will never break 😎

## Theming

Imagine you have a project that has grown **a ton** and you have colors scattered around the entire codebase. Now imagine if you want to add **dark theme**! This means that you have to go through your entire application to find the colors and make the correct changes to support this. Well there is a **better** way!

### Set up theming

Flutter has something build in called `ThemeData`, with this we can define colors once in the theme and use it everywhere. When we later want to change colors, we can do it in one spot and it will work **everywhere**.

```dart
class MyAwesomeApplication extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Awesome Application',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        cardColor: Colors.red.shade200,
      ),
      home: const HomePage(),
    );
  }
}
```

This will make all our **cards** in our application to have a light shade of red. What if now we want to add a **dark theme** and make that color a darker shade of red. Well it's simple!

```dart
darkTheme: ThemeData.dark().copyWith(
	cardColor: Colors.red.shade800,
),
```

This can be defined below the current `theme`, and voilà we have **dark mode** support 🎨!

## Summary

We covered **5 tips** which were the following

- Linting
- Packages
- CI/CD
- Testing
- Theming

Like any other tip, these can be applied in **any** sized project from small to big, but of course the **bigger** a project gets the more obvious things like these will become!
