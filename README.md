# Prevent Bouncing in your Framer Prototypes

A small script that gets rid of the Mobile Safari's full page bounce when you drag beyond the boundaries of the page.

<img src="http://tisho.co/framer-prevent-bounce/images/framer-prevent-bounce-demo.gif" width="278">

## Usage

1. Download [framer-prevent-bounce.js](http://tisho.co/framer-prevent-bounce/framer-prevent-bounce.js) to your prototype's directory.

2. Open your `index.html` in a text editor and link to the file using a `<script>` tag. The file should be included *after* the `framer.js` script and *before* your `app.js` script:

  ```html
  <script src="framer/framer.js"></script>

  <!-- Link to the template script: -->
  <script src="framer-prevent-bounce.js"></script>

  <script src="app.js"></script>

  ```
3. Load `index.html` in Mobile Safari/Chrome. The page shouldn't bounce when pulled down, but scroll layers should still work as expected.

## How It Works

All `touchmove` events that reach Framer's root element have `preventDefault()` called, effectively preventing normal scrolling.
This, however, makes scroll layers lose their ability to be scrolled, so we patch the Layer's scrollVertical setter to register an additional event handler every time a layer is made scrollable.
All this handler does is stop the `touchmove` event from bubbling all the way to the top and have `preventDefault()` called on it.

This makes it possible to have normal scrolling in layers while disabling full-page scrolling, and leaves us only with the problem of iOS re-enabling the full-page scrolling whenever an inner element is scrolled past its boundaries.
To get around that, we use a clever trick described by Joe Lambert in his [ScrollFix library](https://github.com/joelambert/ScrollFix), and scroll the layer by a single pixel whenever the layer is at a scroll boundary (scrolled to the very top or bottom), making it impossible to ever meet the condition under which a full-page scroll occurs.
