---
title: 10 Flutter Tips to Be More Productive
description: Getting to know small (and big) tips can often times make us see things we didn't think of. This one will boost your productivity and make a lot of things easier!
image: /assets/images/10_flutter_tips_to_be_more_productive_thumbnail.png
youtube: 14VtPQ1aoaU
github: https://github.com/RobertBrunhage/10_flutter_tips_2021
author: Robert Brunhage
date: 01-23-2021
---

Here are some of the tips and tricks I found along my 3 years of making Flutter applications and content. I am positive that this will improve your workflow if you don't already know about them.


### Tip number 1: Use a lot of packages

This may seem to be counterintuitive for many but for a lot of people, just being done with a project is the first step so that you get actual users testing out your application. Over time when the application is published and you are getting feedback that is the time my recommendation is to look over the packages and replace it with your own code to have more control. You can find all the packages over at Pub.dev.

### Tip number 2: Utilize Snippets

Now to be fair, a while back I only used the provided snippets for things like StatelessWidget but when you actually make custom snippets for tasks you do over and over again you will save a ton of time! I will show an example of snippets and these originally came from FilledStacks and been using them since!

If you are using VSCode you can just hit F1 and search for Snippets and  you should find the "Configure user snippets", add a file to your liking and the snippet code of your choice. Below is my testing snippet so if you want, you can use that!
```
{
  "Main Test Suite Setup": {
		"prefix": "testm",
		"body": [
			"import 'package:flutter_test/flutter_test.dart';",
			"",
			"void main() {",
			" group('${1:${TM_FILENAME_BASE/(.*)/${1:/pascalcase}/g}} -', (){",
			"",
			" });",
			"}"
		],
		"description": "Main Test Suite Setup"
	},
	"Test Group Setup": {
		"prefix": "testg",
		"description": "Creates a Test group with a test",
		"body": [
			"group('${1} -', () {",
			" test('${2}', () {",
			"",
			" });",
			"});",
		]
	},
	"Single Test Setup": {
		"prefix": "tests",
		"description": "Creates a single test",
		"body": [
			" test('${1}', () {",
			"",
			" });",
		]
	},
}
```

### Tip number 3: Use linting early

There are a bunch of different ways to set up linting but I would just recommend setting up the <a href="https://pub.dev/packages/lint" target="_blank">lint</a> package which is super easy!

* Add the package to your `pubspec.yaml` file.
* Create a `analysis_options.yaml` file.
* Add the include line described in the package.
* Profit????


### Tip number 4: Use the tooling

This you probably already do but is more of a make it simpler way for the upcomming Tip 5. By using the tooling you will simplify a lot in your life. `Extract Widget` is probably my favorite and for good reasons.

### Tip number 5: Multiple Private Widgets

Now this one can be controversal but my approach for keeping code clean and easy to navigate is very simple. Let's say we have a big widget with a lot of nesting. Well go ahead now and try taking a piece out of that by using `Extract Widget` make it private by prefixing with an underscore aswell as a good name. What you have done now is effectively just moved the code below the public version of that widget and everything has just become a lot more easy to read and change. You don't need to try and figure out what that specific `Container` is for as it now has a good name!

### Tip number 6: App icon and Splash Screen

There are two packages that are a huge timesaver for your projects and that is <a href="https://pub.dev/packages/flutter_launcher_icons" target="_blank">Flutter launcher icons</a> and <a href="https://pub.dev/packages/flutter_native_splash" target="_blank">Flutter Native Splash</a>. I recommend checking these out, and they have great documentation for how to get started, and for me has saved an incredible amount of time.

### Tip number 7: Null aware operators

There are a bunch of different null aware operators such as `??` `??=` and more. Learning these will not only make your code cleaner and easier now but it will also simplify a lot when null safety hits stable in Flutter.

### Tip number 8: reuse x.of(context)

As you know when you want to use theming in Flutter you need to write things like `Theme.of(context).textTheme.bodyText1`. Well that is fine but if you have to do it multiple times in the same widget I recommend moving it to the top of the build method. You can do that easy by just copy the line I wrote and putting it in a variable like this `final theme = Theme.of(context).textTheme`. Now in your widget, every time you need the theme you would just write `theme.bodyText1`.

### Tip number 9: debugPrint

Sometimes we just need more information when we are debugging, and this can happen especially for network requests. So instead of using a normal `print(myNetworkData)` you can use `debugPrint(myNetworkData)`. This will yield a lot more metadata for you in case you need it!

### Tip number 10: Single Responsibility Widget

If you know about the SOLID principles then this may already sound very familiar. Well that is because it is. With Single Responsibility we mean that a widget is only supposed to do one thing. Do NOT make mega widgets that do a bunch of different things. For example if you noticed that you have a Widget and inside there have a other widgets that make up your custom button, break that out! Extract it and make it its own separate widget. This will make it a lot more manageable as well as you now know that that specific widget has as its only rule to serve and handle that button.
