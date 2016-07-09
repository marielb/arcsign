from setuptools import setup

setup(
    name='arcsign',
    version='1.0',
    long_description=__doc__,
    packages=['arcsign'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Flask',
        'Flask-Assets',
        'Flask-Cache',
        'Flask-DebugToolbar',
        'Flask-Login',
        'Flask-SQLAlchemy',
        'Flask-Script',
        'Flask-WTF',
        'itsdangerous',
        'cssmin',
        'jsmin',
        'pytest-cov',
        'mccabe',
        'flake8']
)

