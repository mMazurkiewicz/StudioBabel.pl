$(document).ready(function(e) {
  var $logo = $('.logo');
  var $navbarElements = $('.navbar div');
  var $socialMedia = $('.social-media');
  var $aboutUs = $('.about-us');
  var $gallery = $('.gallery');
  var $offer = $('.offer');
  var $contact = $('.contact');
  var $closeButton = $('.close-button');
  var $closeButtonWhite = $('.close-button-white');

  // fade in logo and navbar elements sequentially
  $logo.delay(1000).fadeIn(700, function() {
    $navbarElements.delay(200).each(function(index){
      $(this).delay(index * 100).fadeTo(400, 1, function(){
        $socialMedia.each(function(i){
          $(this).delay(i * 100).fadeTo(400, 1);
        })
      });
    })
  });

  // toggle on/off section
  function toggleSection() {
      if ($(this).hasClass('about-us-button')) $aboutUs.fadeToggle(300).addClass('on');
      if ($(this).hasClass('gallery-button')) {
        $gallery.fadeToggle(300).addClass('on');
      }
      if ($(this).hasClass('offer-button')) $offer.fadeToggle(300).addClass('on');
      if ($(this).hasClass('contact-button')) $contact.fadeToggle(300).addClass('on');
  }

  // show section when nav button clicked
  $navbarElements.click(toggleSection)

  // press esc to close section
  $(document).keyup(function(e){
    if (e.keyCode == 27 && $lightbox.hasClass('lightbox-to-close')) {
      closeLightbox();
      return;
    } else if (e.keyCode == 27){
      closeSection();
    }
  });

  function closeLightbox() {
    $lightbox.fadeOut(200).removeClass('lightbox-to-close');
  }

  function closeSection() {
    if ($('section').hasClass('on')) {
      $('.on').fadeOut(200).removeClass('on');
    } else {
      return;
    }
  }

  // close element when X clicked
  $closeButton.click(function(e) {
    $(this).parent().fadeToggle(200).removeClass('on');
  })
  $closeButtonWhite.click(function(e) {
    $(this).parent().fadeToggle(200).removeClass('lightbox-to-close');
  })

  // gallery slider
  var $galleryItems = $('.item');
  var $lightbox = $('.lightbox');
  var $slider = $('.slider');
  var $sliderElements = $('.slider li');
  var elementWidth = $(document).outerWidth();
  var sliderWidth = elementWidth * $sliderElements.length;
  var $next = $('.next');
  var $prev = $('.prev');
  var index = 0;
  var currentPosition = 0;

  // set slider width
  $slider.css({'width': sliderWidth});

  // change variables values to prevent correct slideshow in case of resizeing web browser window
  $(window).resize(function(e) {
    elementWidth = e.currentTarget.innerWidth;
    sliderWidth = elementWidth * $sliderElements.length;
    currentPosition = elementWidth * index;
    $slider.css({
      'width': sliderWidth,
      'right': currentPosition + 'px'
    });
  })

  function nextSlide() {
    if (index >= $sliderElements.length - 1) return;
    currentPosition += elementWidth;
    $slider.animate({
      'right': currentPosition + 'px'
    }, 'fast')
    index++;
  }
  function prevSlide() {
    if (index <= 0) return;
    currentPosition -= elementWidth;
    $slider.animate({
      'right': currentPosition + 'px'
    }, 'fast')
    index--;
  }
  // show lightbox with clicked image
  $galleryItems.click(function(e) {
    index = $(this).index(); // set index to index of clicked photo
    currentPosition = elementWidth * index; // current position of slider
    $slider.css({'right': '0px'}); // reset slider position
    $slider.css({
      'right': elementWidth * index + 'px'
    });
    $lightbox.fadeToggle(200).addClass('lightbox-to-close');
  })

  // animate slider
  $next.click(nextSlide);
  $prev.click(prevSlide);
  $(document).keyup(function(e) { // slide left or right on keybord arrows
    if (e.originalEvent.keyCode == 39) nextSlide();
    if (e.originalEvent.keyCode == 37) prevSlide();
  })

  // MOBILE SWIPE
  var x, y, lastX, lastY = 0;
  var isSwiping = false;

  // get coordinates from touch start position
  $sliderElements.on('touchstart', function(e) {
    x = e.touches["0"].screenX;
    y = e.touches["0"].screenY;
  })
  // get coordinates from touch end position and start swipe
  $sliderElements.on('touchend', function(e) {
    lastX =  e.changedTouches["0"].screenX;
    lastY =  e.changedTouches["0"].screenY;
    swipe(x, y, lastX, lastY);
  })

  // swipe function
  function swipe(x, y, lastX, lastY) {
    if (y - lastY < 40 && y - lastY > -40) { //prevent from vertical swipe
      if (x - lastX < 0) { //check for left or right swipe
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }

})
