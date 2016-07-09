from flask.ext.cache import Cache
from flask_assets import Environment

from arcsign.models import User

# Setup flask cache
cache = Cache()

# init flask assets
assets_env = Environment()