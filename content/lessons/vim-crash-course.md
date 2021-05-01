---
title: Vim Crash Course
description: Time to learn Vim, and the basics to become proficient in editing with it! I have been using it for the past 6 months and personally love using it!
image: /assets/images/vim_crash_course_thumbnail.webp
youtube: auhZ5t4WX7g
author: Robert Brunhage
date: 05-01-2021
---

## It's time to take the step in to the Vim world

Time to learn Vim, and the basics to become proficient in editing with it! I have been using it for the past 6 months and personally love using it!

### Opening a file

To open a file you need to navigate to the correct project directory in the terminal, and when you are in the right directory you simply write `nvim .`. This is if you are using NeoVim and if you are using regular vim this would just be `vim .`. Most of the time you will open the project directory as the search plugins will search from the root of the project, but we will get to that later!

### Movement

When you open your first directory in NeoVim you will be greeted with the in built file explorer. Use the `h` and `j` keys to navigate up and down and press `Enter` on the file you want to open.

The basic movement keys are `h j k l` these will be your "arrow keys" from now on. Try to not use the arrow keys as much as possible as in the end they will slow you down compared to the vim movement.

Here is every direction the keys will have!
* h = left
* j = down
* k = up
* l = right

### Modes

Vim is what we call a modal editor. In normal editors you are always in what we would call "insert mode" or writing mode. In Vim this is a bit different!

We have **three** main modes which are the following
* Normal mode: navigate edit code with keybinds
* Insert mode: similar to any editor, you can just write
* Visual mode: Here you can highlight parts of code to for example copy & paste later

There are different ways to get in and out of modes but the most simple ones that you will need for now is
* Normal mode = `Esc`
* Insert mode = `i`
* Visual mode =  `y`

So for example when you first open the editor you will be in `Normal mode` and if you click `i` you will be in `Insert mode` where you can actually type. To get back in to `Normal mode` you simply press `Esc`

### Saving

Now you have probably made some changes in a file and need to save. To do this you start writing `:w` the `:` in this case will make it possible to write a command and the `w` in that case will be "write" which pretty much means "save".

### Exit

As you have learnt how to save we can now learn how to exit! This in itself is kind of a meme but I will show you why.

When you are in the file you just saved from the previous step you can now write `:q` this will initialize the quit command, that's it! Now you are outside vim again and need to navigate in to a file once more.

But now if you notice that you write something in a file and try doing `:q` again you will probably see a red message. The reason for this is that you either have to save the file before **or** force quit the file and not save the changes.
* Save: `:w`
* Save and quite: `:wq`
* Quit: `:q`
* Force quite without saving: `:q!`

### Normal mode magic

Now with just these learnings you will be able to do the bare minimum which is editing a file. Now I will just show you some of the reasons why `Normal mode` is so powerful.

When you are in normal mode try some of the following:
* Delete one line: `dd`
* Move one word forward: `w` or `e`
* Move one word backwords: `b`
* Delete one word: `dw` or `de`
* Undo: `u`
* Redo: `ctrl+r`

Make sure to follow someone to see this in action, I highly recommend [ThePrimieagen](https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw) he has tons of videos about Vim and is also streaming when he uses it.

### Copy & Pasting

This is the reason we are developers so of course I will show you how to do this in Vim!

Start in normal mode and do the following!
1. Press `v` or `shift+V` to highlight some code or text.
2. Press `y` to "yank" it, also meaning copy it.
3. Move to the place you want to paste it and press `p`.

### More editing tips

Most of the time using `i` to go in to insert mode is great. But sometimes you want to be a bit fancy and start editing on the line above or below the current line your cursor is on. Well time to meet `o` and `shift+o`!

* Edit below: `o`
* Edit above: `shift+o`

of course to undo that just press `u`.

### Edit other files

Now we have just been in the same file over and over so time to navigate to another file. To do this you will use the `:e` command.

Here is an example on how to edit the `main.dart` file in the lib folder of the project.
`:e lib\main.dart`

Personally I usually have plugins to move to different files but we will get to that!

### Navigate back and forth between files / buffers

When you learned how to use `:e` command and you now want to move back to the previous file you can do `ctrl+o` and to navigate forward again to the file you were just in, you can do `ctrl+i`.

Hopefully you are starting to get a feel of the possibilities but we are not done!

### Search

Something basic we do a lot is searching in the file we are in. To do this you would type `/theWordIWantToFind` press `Enter` and navigate between the searched word with `n` and `shift-n`, for forward and backwords.

### Documentation

I want to just give a little heads up here. If you want to learn some specific command you can write `:h theCommand` and you will get to the help documentation of that. That will open in a new split with your cursor focused on it, so to quit it just do `:q`.

For example we could do `:h scroll` and we will see that they reference `ctrl+d` and `ctrl+u` which will scroll down and up in the file you are in. Which  just means some faster vertical nagivation!

### Plugins

Personally I use plugins which in simple terms are like extensions in VSCode. I will not go over how to add plugins as that is quite straight forward when you search for it.

Here are some plugins I use that makes things a lot easier.
* telescope/fzf/ctrlp: These are fuzzy finders that will let you easily search for files in your project (telescope can do a lot more though)
* coc: which adds all the language features I use, such as dart and flutter support.
* NERDTree: This will open a file tree which you can navigate to much like any other file explorer, you can also add folders and files etc.

### Summary

With this you will have gone even further than the basics and when you have grasped these you will become quite proficient in using Vim.

But here are the main takeaways in cases where you just need to edit a file.
* Movement: `h j k l`
* Save and exit file: `:wq`
* Change mode: `i` for insert, `Esc` to go back to normal and `v` for visual
* Copy & Paste: `v` to highlight the text and `y` to yank/copy it. Press `p` to paste.



