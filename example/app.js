// Set up our wrapper
var phone = new Layer({ width: 640, height: 1136 });

// Set up the scrolling layer
var scroll = new Layer({ superLayer: phone, width: 640, height: 1136, y: 100, backgroundColor: '#eee' });
scroll.scrollVertical = true;

// And the content that will be scrolled
var scrollContent = new Layer({ superLayer: scroll, width: scroll.width, height: scroll.height * 2, backgroundColor: '#eee' });
var commonStyle = { fontSize: '36px', textAlign: 'center', lineHeight: '100px', color: '#999' };

var a = new Layer({ superLayer: scrollContent, width: scroll.width, height: 100, x: 0, y: 100, backgroundColor: '#ddd' });
a.html = 'Scroll up/down';
a.style = commonStyle;
var b = new Layer({ superLayer: scrollContent, width: scroll.width, height: 100, x: 0, y: 600, backgroundColor: '#ddd' });
b.html = 'The page won’t bounce';
b.style = commonStyle;
var c = new Layer({ superLayer: scrollContent, width: scroll.width, height: 100, x: 0, y: 1100, backgroundColor: '#ddd' });
c.html = 'And the header won’t move';
c.style = commonStyle;
var d = new Layer({ superLayer: scrollContent, width: scroll.width, height: 100, x: 0, y: 1600, backgroundColor: '#ddd' });
d.html = 'Nice, huh?';
d.style = commonStyle;

// Finally, add the fixed header
var header = new Layer({ superLayer: phone, width: scroll.width, height: 100, backgroundColor: '#4A90E2' });
header.html = 'Header';
header.style = { fontSize: '30px', color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', lineHeight: '100px', fontWeight: 'bold', textAlign: 'center' };
