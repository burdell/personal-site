---
tags: [post]
layout: post
title: Building whatdidnathanread.com
date: 2020-01-31
permalink: posts/what-did-nathan-read/index.html
---

This is a somewhat high level overview of how I've built [What Did Nathan Read](https://whatdidnathanread.com), an app for tracking reading data from Goodreads. The transition from being simply a frontend to a (mostly) real time record was pretty fun to write

# Humble Beginnings

Goodreads has an API you can access your reading data with but I found the data to be not great. At the time the web interface didn't even handle re-reads (they do now, but it's kind of hacky once you realize what's going on under the hood). Their interface does allow exporting your full library as a CSV file so I did that and then used a tool online to convert that data to a standard JavaScript object.

The [official first commit](https://github.com/burdell/reading-data/commit/935900c1c2593f342ead86d41d450b590a5d440c) is from October 2017, but this project actually started as a project to learn [Vue](https://vuejs.org/). I don't remember how far I actually got with that but I did end up just taking the [filtering logic](https://github.com/burdell/reading-data/commit/935900c1c2593f342ead86d41d450b590a5d440c#diff-01ae582016d356eabe49ad94e7185931) from that initial attempt.

The initially build was a pretty basic [create-react-app](https://github.com/burdell/reading-data/commit/935900c1c2593f342ead86d41d450b590a5d440c#diff-01ae582016d356eabe49ad94e7185931) with TypeScript.

Didn't really touch it the entirety of 2018 and ended up [manually updating the data and switching to Parcel](https://github.com/burdell/reading-data/commit/d9c0c885510ad48222e740b51d2499a24a0ae879) at the end of the year. Babel 7 was released around this time so I used that for the TypeScript compilation.

Made some small updates like using [hooks](https://github.com/burdell/reading-data/commit/acefbdc6b9729ad2c517ef8725ba084679618004) after they were released and [turned on strict mode](https://github.com/burdell/reading-data/commit/c84df02fb5cddd52d10b200c5d88057200cc8ee5)

# A Better Way

Manually updating the dataset every single year is pretty painful, plus it'd be cool if I could see my reading data throughout the year. This means some sort of backend solution for fetching data.

First, however, the frontend needed to to change to handle asyncronous data from a backend and not just reading a very large data object locally.

## Forging a new frontend

For some reason all the data filtering happened in the sidebar and it passed the data over to the results page. [The first step was to pull all of that into the root of the App tree](https://github.com/burdell/reading-data/commit/ee77a30bd1153256952f745c10957d47c86de7bc). This way the sidebar will call back to the root when the data needs to change and it will propogate that data to the actual reading results.

Seond, the app needed to handle asyncronous data. [This was just a matter of using Promise.resolve when returning data](https://github.com/burdell/reading-data/commit/4a340348c9ba0fa62d0230576117b024d519d53b#diff-20b9f33d854d53201446c834cb88c3bfL86). TypeScript was pretty clutch here in telling me where I wasn't handling data asyncronously.

## Blazing a new backend
