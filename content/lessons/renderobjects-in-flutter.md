---
title: Make Anything in Flutter using RenderObjects
description: RenderObjects gives you the power to create anything in Flutter. Learning this you will get a deeper understanding and also a feeling that you can accomplish anything
image: /assets/images/render_object_thumbnail.webp
youtube: uC3sL5SmizM
github: https://github.com/Robert-Brunhage/flutter-render-objects-tutorial
author: Robert Brunhage
date: 02-27-2021
---
# Learn the basics of RenderObjects

RenderObjects are very powerful and a lot of the times what the Flutter teams uses when they build all the widgets that you use. You can see this by going to the documentation of the widget and see how some extend things like the `LeadRenderObjectWidget`. Time to learn how we can do this ourselves!

## There are three types

First we must understand the different types of classes that we can extend to create RenderObjects and those are the following:

* LeafRenderObjectWidget
* SingleChildRenderObjectWidget
* MultiChildRenderObjectWidget

Single and multiChild is very understandable, it's when you want to create a `RenderObject` that can have one or multiple children. `LeafRenderObjectWidget` though is when you don't want to have any child what so ever. But instead just want to draw.

In this specific example we are going to use a LeafRenderObjectWidget.

## Let's start!

Here we have our normal `MyApp` widget and we have created a `ProgressBar` now be aware that this will be red in the compiler as we haven't done the implementation yet!

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Center(
        child: Container(
          width: 400,
          //color: Colors.brown,
          child: ProgressBar(
            dotColor: Colors.blue,
            thumbColor: Colors.blue,
            thumbSize: 24,
          ),
        ),
      ),
    );
  }
}
```

First of we have to create our class which will extend the `LeafRenderObjectWidget` together with initializing the properties.

```dart
class ProgressBar extends LeafRenderObjectWidget {
  const ProgressBar({
    Key key,
    this.dotColor,
    this.thumbColor,
    this.thumbSize,
  }) : super(key: key);

  final Color dotColor;
  final Color thumbColor;
  final double thumbSize;
}
```

Some things are missing though and that is the override for `createRenderObject` `updateRenderObject` and `debugFillProperties` so let's add those!

```dart
class ProgressBar extends LeafRenderObjectWidget {
  const ProgressBar({
    Key key,
    this.dotColor,
    this.thumbColor,
    this.thumbSize,
  }) : super(key: key);

  final Color dotColor;
  final Color thumbColor;
  final double thumbSize;

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderProgressBar(
      dotColor: dotColor,
      thumbColor: thumbColor,
      thumbSize: thumbSize,
    );
  }

  @override
  void updateRenderObject(BuildContext context, covariant RenderProgressBar renderObject) {
    renderObject
      ..dotColor = dotColor
      ..thumbColor = thumbColor
      ..thumbSize = thumbSize;
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(ColorProperty('dotColor', dotColor));
    properties.add(ColorProperty('thumbColor', thumbColor));
    properties.add(DoubleProperty('thumbSize', thumbSize));
  }
}
```

Be aware that the `RenderProgressBar` is not created yet and we will do that next!

## RenderBox

Now as this progress bar we are going to create is just paint that is going to render on a 2D cartesian coordinate system we are going to use the `RenderBox` so let's create that class!

```dart
class RenderProgressBar extends RenderBox {
  RenderProgressBar({
    Color dotColor,
    Color thumbColor,
    double thumbSize,
  })  : _dotColor = dotColor,
        _thumbColor = thumbColor,
        _thumbSize = thumbSize;
}
```

Now a lot of things are missing but we will cover that. So first thing first we can see that the variables we are trying to initialize is private. And there is a reason for that! When these values are set we need to call some methods, similar to how you call `NotifyListeners` in a `ChangeNotifier` so let's do that.

```dart
class RenderProgressBar extends RenderBox {
  RenderProgressBar({
    Color dotColor,
    Color thumbColor,
    double thumbSize,
  })  : _dotColor = dotColor,
        _thumbColor = thumbColor,
        _thumbSize = thumbSize;

  Color get dotColor => _dotColor;
  Color _dotColor;
  set dotColor(Color value) {
    if (_dotColor == value) {
      return;
    }
    _dotColor = value;
    markNeedsPaint();
  }

  Color get thumbColor => _thumbColor;
  Color _thumbColor;
  set thumbColor(Color value) {
    if (_thumbColor == value) {
      return;
    }
    _thumbColor = value;
    markNeedsPaint();
  }

  double get thumbSize => _thumbSize;
  double _thumbSize;
  set thumbSize(double value) {
    if (_thumbSize == value) {
      return;
    }
    _thumbSize = value;
    markNeedsLayout();
  } 
}
```

For the things with color we simply call `markNeedsPaint()` and for the one where the size changes we are going to call `markNeedsLayout()`. We have some things left and then we can move on to actually doing the painting!

We need to decide the size this `RenderObject` is going to have and by that we follow the rules of:
Constraints go down
Sizes go up
Parents sets position!

To do this we need to implement the `performLayout()` method and that is pretty simple, here is how that one will look.

```dart
  @override
  void performLayout() {
    final desiredWidth = constraints.maxWidth;
    final desiredHeight = thumbSize;
    final desiredSize = Size(desiredWidth, desiredHeight);
    size = constraints.constrain(desiredSize);
  }
```

This will make this `RenderObject` take the full size of the parent but take the height of our `thumbSize` that is passed down when we use this `RenderObject`.

Now we can begin the painting!

## Painting

Now I am not the best at math (pretty bad tbh) but this worked so if you come up with a better solution make sure to share that!

Let's take a look at the implementation

```dart
  // This is used to set the thumb value later.
  double _currentThumbValue = 0.5

  @override
  void paint(PaintingContext context, Offset offset) {
    final canvas = context.canvas;
    canvas.save();
    canvas.translate(offset.dx, offset.dy);

    // paint dots
    final dotPaint = Paint()
      ..color = dotColor
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 4;

    final barPaint = Paint()
      ..color = Colors.red
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 4;

    final spacing = size.width / 10;
    for (var i = 0; i < 11; i++) {
      var upperPoint = Offset(spacing * i, size.height * 0.75);
      final lowerPoint = Offset(spacing * i, size.height);

      if (i % 5 == 0) {
        upperPoint = Offset(spacing * i, size.height * 0.25);
      }
      if (upperPoint.dx <= _currentThumbValue * size.width) {
        canvas.drawLine(upperPoint, lowerPoint, barPaint);
      } else {
        canvas.drawLine(upperPoint, lowerPoint, dotPaint);
      }
    }

    // setup thumb
    final thumbPaint = Paint()..color = thumbColor;
    final thumbDx = _currentThumbValue * size.width;

    // draw the bar from left to thumb position
    final point1 = Offset(0, size.height / 2);
    final point2 = Offset(thumbDx, size.height / 2);
    canvas.drawLine(point1, point2, barPaint);

    // paint thumb
    final center = Offset(thumbDx, size.height / 2);
    canvas.drawCircle(center, thumbSize / 2, thumbPaint);

    canvas.restore();
  }
```

First we `Save` the canvas and the reason for that is because we are going to change the size of it and in the end we want to restore it so that other `RenderObjects` can paint correctly.

Next we define some Paint, and that is to be used for the actual painting.

The first section with the `for loop` we draw the dots indicating our 10% 20% 30% and so on. We will later on make the thumb snap to those values.

After this has been done we paint the thumb as well as the line. Make sure that the line is painted first or else the line will be above the thumb which will look pretty weird. The next step is to add some hit detection so we can actually drag that thumb.

## Gesture Recognition
This is probably simpler then you think but first we have to make our `RenderObject` be hit detected and to do that we add the following code.

```dart
  // define our variable
  HorizontalDragGestureRecognizer _drag;
  
  // Render object can be hit
  @override
  bool hitTestSelf(Offset position) => true;

  // Handle the hit event and send that to our HorizontalDragGestureRecognizer.
  @override
  void handleEvent(PointerEvent event, BoxHitTestEntry entry) {
    assert(debugHandleEvent(event, entry));
    if (event is PointerDownEvent) {
      _drag.addPointer(event);
    }
  }
```

I added some comments here to make it simpler to understand, and we also have to dispose this `HorizontalDragGestureRecognizer` which can be done in the `Detach` method.

```dart
  @override
  void detach() {
    _drag.dispose();
    super.detach();
  }
```

Now we initialize this `HorizontalDragGestureRecognizer` that we just created, which we do at the top. We can then use the `onStart` and `onUpdate` to call a method that we are going to create!

```dart
  RenderProgressBar({
    Color dotColor,
    Color thumbColor,
    double thumbSize,
  })  : _dotColor = dotColor,
        _thumbColor = thumbColor,
        _thumbSize = thumbSize {
    _drag = HorizontalDragGestureRecognizer()
      ..onStart = (DragStartDetails details) {
        _updateThumbPosition(details.localPosition);
      }
      ..onUpdate = (DragUpdateDetails details) {
        _updateThumbPosition(details.localPosition);
      };
  }
```

Let's take a look at the `_updateThumbPosition` method.

```dart
  void _updateThumbPosition(Offset localPosition) {
    // clamp the position between the full width of the renderobject
    // to avoid if you drag the mouse out of the window.
    var dx = localPosition.dx.clamp(0, size.width);

    // make the size between 0 and 1 with only 1 decimal
    // example 0.4 or 0.7.
    _currentThumbValue = double.parse((dx / size.width).toStringAsFixed(1));

    markNeedsPaint();
    markNeedsSemanticsUpdate();
  }
```

Now this is all there is to it, let's take a look at the final implementation of everything!

```dart
class ProgressBar extends LeafRenderObjectWidget {
  const ProgressBar({
    Key key,
    this.dotColor,
    this.thumbColor,
    this.thumbSize,
  }) : super(key: key);

  final Color dotColor;
  final Color thumbColor;
  final double thumbSize;

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderProgressBar(
      dotColor: dotColor,
      thumbColor: thumbColor,
      thumbSize: thumbSize,
    );
  }

  @override
  void updateRenderObject(BuildContext context, covariant RenderProgressBar renderObject) {
    renderObject
      ..dotColor = dotColor
      ..thumbColor = thumbColor
      ..thumbSize = thumbSize;
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(ColorProperty('dotColor', dotColor));
    properties.add(ColorProperty('thumbColor', thumbColor));
    properties.add(DoubleProperty('thumbSize', thumbSize));
  }
}

class RenderProgressBar extends RenderBox {
  RenderProgressBar({
    Color dotColor,
    Color thumbColor,
    double thumbSize,
  })  : _dotColor = dotColor,
        _thumbColor = thumbColor,
        _thumbSize = thumbSize {
    _drag = HorizontalDragGestureRecognizer()
      ..onStart = (DragStartDetails details) {
        _updateThumbPosition(details.localPosition);
      }
      ..onUpdate = (DragUpdateDetails details) {
        _updateThumbPosition(details.localPosition);
      };
  }

  double _currentThumbValue = 0.5;

  Color get dotColor => _dotColor;
  Color _dotColor;
  set dotColor(Color value) {
    if (_dotColor == value) {
      return;
    }
    _dotColor = value;
    markNeedsPaint();
  }

  Color get thumbColor => _thumbColor;
  Color _thumbColor;
  set thumbColor(Color value) {
    if (_thumbColor == value) {
      return;
    }
    _thumbColor = value;
    markNeedsPaint();
  }

  double get thumbSize => _thumbSize;
  double _thumbSize;
  set thumbSize(double value) {
    if (_thumbSize == value) {
      return;
    }
    _thumbSize = value;
    markNeedsLayout();
  }

  @override
  void performLayout() {
    final desiredWidth = constraints.maxWidth;
    final desiredHeight = thumbSize;
    final desiredSize = Size(desiredWidth, desiredHeight);
    size = constraints.constrain(desiredSize);
  }

  @override
  void paint(PaintingContext context, Offset offset) {
    final canvas = context.canvas;
    canvas.save();
    canvas.translate(offset.dx, offset.dy);

    // paint dots
    final dotPaint = Paint()
      ..color = dotColor
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 4;

    final barPaint = Paint()
      ..color = Colors.red
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 4;

    final spacing = size.width / 10;
    for (var i = 0; i < 11; i++) {
      var upperPoint = Offset(spacing * i, size.height * 0.75);
      final lowerPoint = Offset(spacing * i, size.height);

      if (i % 5 == 0) {
        upperPoint = Offset(spacing * i, size.height * 0.25);
      }
      if (upperPoint.dx <= _currentThumbValue * size.width) {
        canvas.drawLine(upperPoint, lowerPoint, barPaint);
      } else {
        canvas.drawLine(upperPoint, lowerPoint, dotPaint);
      }
    }

    // setup thumb
    final thumbPaint = Paint()..color = thumbColor;
    final thumbDx = _currentThumbValue * size.width;

    // draw the bar from left to thumb position
    final point1 = Offset(0, size.height / 2);
    final point2 = Offset(thumbDx, size.height / 2);
    canvas.drawLine(point1, point2, barPaint);

    // paint thumb
    final center = Offset(thumbDx, size.height / 2);
    canvas.drawCircle(center, thumbSize / 2, thumbPaint);

    canvas.restore();
  }

  HorizontalDragGestureRecognizer _drag;
  @override
  bool hitTestSelf(Offset position) => true;

  @override
  void handleEvent(PointerEvent event, BoxHitTestEntry entry) {
    assert(debugHandleEvent(event, entry));
    if (event is PointerDownEvent) {
      _drag.addPointer(event);
    }
  }

  void _updateThumbPosition(Offset localPosition) {
    // clamp the position between the full width of the renderobject
    // to avoid if you drag the mouse out of the window.
    var dx = localPosition.dx.clamp(0, size.width);

    // make the size between 0 and 1 with only 1 decimal
    // example 0.4 or 0.7.
    _currentThumbValue = double.parse((dx / size.width).toStringAsFixed(1));

    markNeedsPaint();
    markNeedsSemanticsUpdate();
  }

  @override
  void detach() {
    _drag.dispose();
    super.detach();
  }
}
```

Congratulations, you have now created your own `RenderObject`! I urge you to check out <a href="https://www.youtube.com/watch?v=HqXNGawzSbY" target="_blank" rel="noopener">creativecreatorormaybenot's video</a> where he has made a full guide to `RenderObject`. Here is where I learned most of the things so make sure to subscribe to him!