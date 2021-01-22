---
title: Create Your Very Own Twitter App
description: I figured that it would be fun to make an app that lets me tweet without using the real twitter app. Learn API, Riverpod, Hooks, error handling and much more!
image: /assets/images/twitter_app_thumbnail.png
youtube: 3eOn4CtO5hg
github: https://github.com/RobertBrunhage/flutter_twitter_app_tutorial
author: Robert Brunhage
date: 05-12-2020
---

Twitter is one of the biggest social media platforms, and in this blog we are going to go over how we can make our own app that will utalize the Twitter API to make our own tweets.

# Initial Setup
    
- Get your API tokens from developer.twitter.com
- Create a Flutter Project

We are going to depend on 5 different packages, make sure to use the latest versions.

```yaml
dart_twitter_api: any
dartz: any
flutter_hooks: any
hooks_riverpod: any
http: any
```

### Setting up the environment_config.dart

This will be responsible to pass the API key's we got from the Twitter Developer portal to our Repository. 

import 'package:hooks_riverpod/hooks_riverpod.dart';

```dart
class EnvironmentConfig {
  // We add the api key by running 'flutter run --dart-define=apiKey=MYKEY`
  final apiKey = const String.fromEnvironment("apiKey");
  final apiKeySecret = const String.fromEnvironment("apiKeySecret");
  final accessToken = const String.fromEnvironment("accessToken");
  final accessTokenSecret = const String.fromEnvironment("accessTokenSecret");
}

final environmentConfigProvider = Provider<EnvironmentConfig>((ref) {
  return EnvironmentConfig();
});
```

If you are completely new to this I recommend another video regarding <a href="https://www.youtube.com/watch?v=BbRBV6MvLqE" target="_blank">--dart-define</a>


### twitter_repository.dart

This class will be responsible to make the actual requests to the Twitter API. In this case it will make a request for adding a tweet on our profile. One note here is that we do a couple of things and I will add comments to the code to make it more clear.

```dart
import 'dart:io';

import 'package:dart_twitter_api/twitter_api.dart';
import 'package:flutter_twitter_api/environment_config.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:dartz/dartz.dart';
import 'package:http/http.dart';

// Here we provide the TwitterApi that we got from the Package we added in the beginning
final twitterApiProvider = Provider<TwitterApi>((ref) {
  final config = ref.watch(environmentConfigProvider);
  print(config.apiKey);
  print(config.apiKeySecret);
  print(config.accessToken);
  print(config.accessTokenSecret);

  final twitterApi = TwitterApi(
    client: TwitterClient(
      consumerKey: config.apiKey,
      consumerSecret: config.apiKeySecret,
      token: config.accessToken,
      secret: config.accessTokenSecret,
    ),
  );

  return twitterApi;
});

// Providing our Repository to later on be accessible to the Controller (the class that the UI will use)
final twitterRepositoryProvider = Provider<TwitterRepository>((ref) {
  final twitterApi = ref.watch(twitterApiProvider);

  return TwitterRepository(twitterApi);
});

class TwitterRepository {
  TwitterRepository(this._twitterApi);
  final TwitterApi _twitterApi;

  Future<Either<Failure, String>> post(String status) async {
    try {
      Tweet tweet = await _twitterApi.tweetService.update(status: status);
      return Right(tweet.fullText);
    } on Response catch (response) {
      return Left(Failure(response.reasonPhrase));
    } on SocketException catch (_) {
      return Left(Failure('No internect connection'));
    }
  }
}

// This class doesn't have to be in this file but done so to make it simpler in this example. 
// We are going to use this to have our custom failure making our error decoupled and easier to manage.
class Failure {
  Failure(this.message);

  final String message;
}
```

### twitter_controller.dart

The controller will be responsible of making the requests to the repository coming from the UI. It will make use of `StateNotifier` and also `AsyncValue` where the latter one makes it easy to handle the three different states of `loading`, `data` and `error`.

We first provide the Controller so it is accessible to the UI (here you can also see that we watch the repository so the controller can access it). Our method just as in the repository uses the `Either` type so depending on our different states can return different results. We use this later in the UI so that we can clear the `TextEditingController` only if we actually have success when we post the actual tweet.

```
import 'package:dartz/dartz.dart';
import 'package:flutter_twitter_api/twitter_repository.dart';
import 'package:hooks_riverpod/all.dart';

final twitterControllerProvider = StateNotifierProvider<TwitterController>((ref) {
  final twitterRepository = ref.watch(twitterRepositoryProvider);

  return TwitterController(twitterRepository);
});

class TwitterController extends StateNotifier<AsyncValue<String>> {
  TwitterController(
    this._twitterRepository, [
    AsyncValue<String> state,
  ]) : super(state ?? AsyncValue.data(''));
  final TwitterRepository _twitterRepository;

  Future<Either<Failure, String>> postTweet(String tweetMessage) async {
    state = AsyncValue.loading();
    final result = await _twitterRepository.post(tweetMessage);

    result.fold(
      (failure) => state = AsyncValue.error(failure),
      (message) => state = AsyncValue.data(message),
    );

    return result;
  }
}
```


### main.dart

The UI is pretty standard the only thing taking note here is that we have to wrap `MyApp` with a `ProviderScope` so that `Riverpod` actually works.

The other thing is that in the `MyhHomePage` we are actually using a `HookWidget` instead of a normal `Stateless` or `Stateful` widget. The reason for this is because we get access to things that will make it more readable and easier to manage IMO, such as the TextEditingController (We don't have to dispose it etc).

The `TweetResponse` makes use of the `AsyncValue<String>` coming from our controller and uses the `when` keyword to display the appropriate state!

```
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'twitter_controller.dart';
import 'twitter_repository.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

// We are using a HookWidget
class MyHomePage extends HookWidget {
  @override
  Widget build(BuildContext context) {
    // The hook will make sure to dispose the TextEditingController and other nice things.
    final textEditingController = useTextEditingController();

    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          Container(
            color: const Color(0xffE9EFFD),
            padding: const EdgeInsets.only(top: kToolbarHeight),
            child: Align(
              alignment: Alignment.topCenter,
              child: Text(
                'Calm tweeter',
                style: Theme.of(context).textTheme.headline4,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12.0),
            margin: const EdgeInsets.only(top: kToolbarHeight * 2),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(42),
                topRight: Radius.circular(42),
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                Spacer(),
                TweetResponse(),
                Spacer(),
                CustomInputField(
                  onPressed: () => postTweet(context, textEditingController),
                  textEditingController: textEditingController,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void postTweet(BuildContext context, TextEditingController tweetTextEditingController) async {
    // We add a early guard clause
    if (tweetTextEditingController.text.isEmpty) return;

    // Make the request and if it works we will clear the Input field, if not the input field will not be cleared.
    final result = await context.read(twitterControllerProvider).postTweet(tweetTextEditingController.text);
    if (result.isRight()) {
      tweetTextEditingController.clear();
    }
  }
}

class CustomInputField extends StatelessWidget {
  const CustomInputField({
    Key key,
    @required this.textEditingController,
    @required this.onPressed,
  }) : super(key: key);

  final TextEditingController textEditingController;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: textEditingController,
      keyboardType: TextInputType.multiline,
      minLines: 1,
      maxLines: 4,
      maxLength: 280,
      maxLengthEnforced: true,
      decoration: InputDecoration(
        hintText: 'How are you all doing?',
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
        suffixIcon: ClipOval(
          child: Material(
            color: Colors.white.withOpacity(0.0),
            child: IconButton(
              onPressed: onPressed,
              icon: Icon(Icons.send),
            ),
          ),
        ),
        filled: true,
        fillColor: const Color(0xffF6F8FD),
      ),
    );
  }
}

class TweetResponse extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final tweetControllerState = useProvider(twitterControllerProvider.state);
    final theme = Theme.of(context).textTheme.headline6.copyWith(color: const Color(0xff2F3A5D));
    return tweetControllerState.when(
      data: (data) => Text(data.isEmpty ? 'Write a tweet 😊' : 'Tweet: $data', style: theme),
      loading: () => CircularProgressIndicator(),
      error: (err, sr) {
        if (err is Failure) {
          return Text(err.message, style: theme);
        }
        return Text('An unexpected error occurred 😢', style: theme);
      },
    );
  }
}


