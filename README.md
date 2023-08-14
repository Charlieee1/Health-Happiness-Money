# Health-Happiness-Money
You are a small company that is forced keep your employee's mental and physical healths up to continue making those sweet, sweet profits. Be careful though, as you don't want you employee's to be too happy. Let's see how long you last, as one thing's for certain: that dead counter likes big numbers.

## How to play
Download `index.html`, `style.css`, `frontend.js` and `script.js` and put them in the same directory, then open index.html. Start clicking buttons and changing sliders to see what happens.

## Inspiration
I thought of managing the health of something, and I thought of a game where you manage the health of 100 employees. It seemed like a fun idea at the time, and turned out to become a fun game.

## What it does
In this game, you play as a company that cares mostly about profits, but you are forced to manage the mental and physical healths of your employees. If you fail at this task, your employees will either die, become depressed and overthrow you, or become too happy for you to contain, so don't fail. The result is a frantic scramble to monitor your employees healths while generating as much profit as possible.

Your company name is shown in the top left and is randomized.

The game runs on a loop where it constantly update the employees. You have the ability to control the following:
- At what point do you consider the health of the employees low enough to let them go home
- How much support you want to give to employees to support them in their work
- How much do you want to pay to heal the employees that are close to death and won't recover on their own
- How much do you want to pay for therapy for your depressed employees (don't look at me! It wasn't **my** fault)
- How much do you want to pay for health support for your employees

The game will get faster and faster, and won't ever stop getting faster. Eventually, you won't have time to click the support button, or you'll simply forget to do it in the madness of the simulation.

I created a desmos graph that shows the stats of the simulation if left untouched:

[Desmos Graph](https://www.desmos.com/calculator/bxrqnzvv1g)

You can see that eventually, all stats will reach rock-bottom, which is why the player has to maintain the stats and get ever increasing amounts of money.

The health and money graphs will generally have very sharp and sudden changes and is not very curvy, but the happiness graph will be curvy. The health and happiness panels have orange lines, showing the current least healthy or least happy employee. The black lines show the average health or happiness. The bottom of the money panels is always 0, but the top changes dynamically.

My high score is 393, with time elapsed 81 and 100 dead! Let's see if you can beat me! Oh and also, I got two endings at once: depression and too happy. The graph went for a dive and then went straight to space.

## How we built it
As the game would be simple, I went for a simple html and javascript website, with javascript for the functionality and html for the looks. Later, I had to add css to make things look decent. The slider is copied from w3schools.

## Challenges we ran into
Because the game was limited in scope, there was no serious time pressure. However, I lost about a half-day's time, which I then had to compensate for. I'm primarily a backend dev, so the frontend was a challenge for me, especially flexboxes.

## Accomplishments that we're proud of
This is the first game/project that I am proud of, because it is finished and fun to play. I'm also proud of the html and css, as I'm not very good at frontend.

## What we learned
It is my first hackathon, so I learned how to:
- Quickly come up with an idea that I want to follow
- Code under time pressure
- Learn how to use flexboxes (css)
- Participate in a mega-awesome hackathon!

## What's next for Happiness-Health-Money
The code should be optimized on the backend to prevent race conditions with the frontend and other bugs. Other stats can be included in the game, such as trauma (caused by depression or near-death incidents, limited with therapy, never cured), willingness to work (how hard the employees work, can be solved with encouragement and special programs), and more to go absolutely bonkers with the amount of data the player has to process. There's a giant gap on the right side of the screen, which should be filled in with something.
