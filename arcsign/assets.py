from flask_assets import Bundle

common_css = Bundle(
    'css/vendor/bootstrap.min.css',
    'css/vendor/helper.css',
    'css/main.css',
    filters='cssmin',
    output='public/css/common.css'
)

common_js = Bundle(
    'js/vendor/underscore-min.js',
    'js/vendor/jquery.min.js',
    'js/vendor/bootstrap.min.js',
    'js/vendor/leap-0.6.4.min.js',
    'js/vendor/backbone-min.js',
    'js/vendor/backbone.localStorage.js',
    Bundle(
        'js/main.js',
        'js/gestures.js',
        'js/lesson.json',
        filters='jsmin'
    ),
    output='public/js/common.js'
)
