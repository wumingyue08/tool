var lazy = {
    checkShow: function(){
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var offsetTop = $img.offset().top;
        if (offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) {
            return true;
        }
        return false;
    },
    isLoaded: function($img){
        return $img.attr('data-src') === $img.attr('src');
    },
    loadImg: function() {
        $img.attr('src', $img.attr('data-src'));
    }
}
$(window).on('scroll', function () {
    $('.content img').each(function () {
        if (lazy.checkShow($(this)) && !lazy.isLoaded($(this))) {
            lazy.loadImg($(this));
        }
    })
});