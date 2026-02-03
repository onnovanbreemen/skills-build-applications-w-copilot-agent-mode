from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (superheroes)
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', first_name='Tony', last_name='Stark'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', first_name='Peter', last_name='Parker'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', first_name='Bruce', last_name='Wayne'),
            User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='password', first_name='Diana', last_name='Prince'),
        ]

        # Create activities
        Activity.objects.create(user=users[0], activity_type='Running', duration=30, team=marvel)
        Activity.objects.create(user=users[1], activity_type='Cycling', duration=45, team=marvel)
        Activity.objects.create(user=users[2], activity_type='Swimming', duration=60, team=dc)
        Activity.objects.create(user=users[3], activity_type='Yoga', duration=50, team=dc)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=75)
        Leaderboard.objects.create(team=dc, points=110)

        # Create workouts
        Workout.objects.create(name='Super Strength', description='Strength training for superheroes', difficulty='Hard')
        Workout.objects.create(name='Agility Boost', description='Agility and flexibility exercises', difficulty='Medium')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
