# Log Yo' Workouts 

Project Link: https://workoutsql.herokuapp.com/report

## Using Node Code & SQL DB

+ [Node](https://nodejs.org/en/)
+ [ExpressJS](http://expressjs.com/)
+ [MySQL](https://github.com/mysqljs/mysql)
+ [JawsDB](https://devcenter.heroku.com/articles/jawsdb)
+ [KnockoutJS](http://knockoutjs.com/)
+ [Bootstrap](http://getbootstrap.com/)
+ [SCSS](http://sass-lang.com/)
+ [EJS](http://www.ejs.co/)

## Demo: A Workout For Your Eyes

UI Component


![UI](/client/images/views.gif)

---

Seeding DB


![seed](/client/images/seed.gif)

---

CLI Component


![CLI](/client/images/cli.gif)

## Your Turn: Setup Instructions

> "I thought those workouts were cardio before I seeded this database"
> _you in 10 minutes_

```
git clone https://github.com/krosenk729/Node-SQL-Workout-Logger.git
npm install

cd server/database
node schema.js
(pause and wait)

node seed.js 
(pause and go workout)
```


## Up & Running: Pun Intended

You have three choices: 
1. Log a workout (spin, run or lift)
2. Report on workouts (yeah buddy)
3. Update an exisiting workout (only do this if you know the workout_id)

```
cd server/
node cli.js
```

