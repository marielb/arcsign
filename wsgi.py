import os
from arcsign import create_app

env = os.environ.get('APP_ENV', 'dev')
app = create_app('arcsign.settings.%sConfig' % env.capitalize())

if __name__ == '__main__':
    app.run()
