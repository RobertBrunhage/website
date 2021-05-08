---
title: Flutter Producivity beast - FVM
description: FVM is a great tool to handle your versions in Flutter and to me has become a no brainer to use
image: /assets/images/flutter_fvm_thumbnail.webp
youtube: l5HsXg5KlYE
author: Robert Brunhage
date: 05-08-2021
---

FVM is a great tool to handle your versions in Flutter and to me has become a no brainer to use!

## What is FVM?

You probably already know what FVM stands for now (if you notice my keyword building 😎). I will give you an example why it's amazing, and maybe why you should consider using it!

Let's say we have the following two projects:

- Project 1
	- Using Stable Channel

- Project 2
	- Using Dev Channel
	
Now everytime we want to switch between these two channels we have to manually change the flutter channel from stable to dev and vise verse. If you have done this before you are now probably getting nightmares of the dreaded download that will have to be done...

With FVM that will be no more as it works by downloading the channels you are using once, and then you will be able to just switch between them. Such a simple and powerful thing to actually do!

## Installing

Go ahead and navigate to [fvm.app](https://fvm.app), here you should be able to find the getting started button and head in to how to actually download and set it up!

There are a few ways to actually install it and in my video I had done `dart pub global activate fvm` but feel free to pick any of the other ways to install it.

## Configuring

Now it's actually time to do some downloading (yes, you will have to initially download the channels or versions). To do that, head to a terminal ad start writing `fvm install stable`. With `fvm install stable` you will start downloading the stable Flutter sdk and when that is done you will be able to do `fvm list` which should show you that stable version!

Now you need to set that to the global version, meaning the one we will use when we are not specifying anything else. To do that you just write `fvm global stable`. 

**You may get this kind of message** and if you get that just point the path that was initially on your Flutter SDK to the SDK downloaded by FVM.

![Alt Text](https://firebasestorage.googleapis.com/v0/b/krossa-prod.appspot.com/o/e3IUXc1BFZTlvvaqD8xjvHlIy2q1%2Farticles%2FmOX4F2eTQFXttsu9x7kA%2FScreenshot%202021-05-08%20072641.png?alt=media&token=0dc36eb5-1f2b-4b53-a551-ee84a4fcd042)

Now when that is done, you can write `fvm list` again and it should have a (global) tag on it.

Now repeat the process for another channel such as dev or beta.

## Usage

Now if you write `Flutter --version` you should notice that the version will be the same as the sdk that we set fvm to have as "global". So if you try to do `fvm global beta` for example that one will be displayed when you run `flutter --version`.

Now it's time to create some projects!

Go ahead and create two projects, one where you have the global version as **Stable** and one where you have it as **Beta**, remember to give them good names so that you remember. After that open the **Stable** project in whichever editor you use (In this case I will use VSCode) and execute the command `fvm use stable` in the terminal for that project. Do the same for the other project as well so that is using `fvm use beta`.

Now you should see a folder called `.fvm` in the root of your project, something like this (make sure to add the flutter_sdk to `.gitignore`.

![Alt Text](https://firebasestorage.googleapis.com/v0/b/krossa-prod.appspot.com/o/e3IUXc1BFZTlvvaqD8xjvHlIy2q1%2Farticles%2FmOX4F2eTQFXttsu9x7kA%2FScreenshot%202021-05-08%20073442.png?alt=media&token=aaf411d8-5a45-408d-b8bc-64c06ae88313)

Now depending on your editor follow the instructions on https://fvm.app/docs/getting_started/configuration for your editor to get the wanted behaviour.

## Run it

Head in to the **Stable** project and when you run it, it will automagically use the **Stable** channel. Doing the same for the **Beta** project it will run with the **Beta** channel.

Mind blowing, right? 🤯

## Summary

With FVM you don't need to redownload a Flutter SDK each time you want to switch between channels or versions. Download it once with FVM and just switch between them with no delay at all! After you use this, I promise you will have a hard time going back 😎