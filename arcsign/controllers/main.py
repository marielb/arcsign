from flask import Blueprint, render_template, flash, request, redirect, url_for

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return render_template('index.html')

@main.route('/console')
def console():
    fingers = ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky']
    hand_props = ['grabStrength', 'palmNormal', 'palmPosition', 'palmVelocity']
    return render_template('console.html', fingers=fingers, hand_props=hand_props)
