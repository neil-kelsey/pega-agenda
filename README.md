This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone this repo to your local machine, open a terminal and cd in to the root of this project then run

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

## Running the tests

The projects components are fully covered by unit tests, you can run the tests yourself with

```bash
npm test
```

## Linting

There is also a linter which you can use with

```bash
npm run lint
```

---

## Project requirements and work done

Here's the work I've done against the project requirements with explanations of what I've done

- [x] Build a React-based application using provided content

  > I have built the project in React for the core front end technology, I've also made use of Typescript as I find this helps me catch errors while coding earlier and makes projects more robust - if a different developer was to pick this project up it should be much easier for them to understand. I've also built the project in Next.js - this provides me by default with server side rendering which reduces load times which improves the apps performance which is important if a lot of people will be viewing this app at the same time

- [x] We need an app good for both presenters and attendees

  > I've made the project device agnostic - all views work well on all devices

- [x] The design needs to visually distinguish the different categories on the schedule

  > I gave the data different 'categories' numbered 1-7 for the 7 different groupings provided to me in the UI exercise briefing document

- [x] Attendees need to view the agenda 'at a glance'

  > The main view when initially loading the app gives a week calendar view of all the activities where users can view every single activity for the week and clearly see when they take place, the colour coding helps distinguish the type of activity, the user can then click on any activity to view further details, or they can use the filters at the top of the screen to view activities for a single day. I have also given users the option to switch the view from a calendar view to a list view - the calendar view enables users to view the agenda at a glance and then the list view enables users to view the adenda in further detail

- [x] Presenters want to display the entire week's agenda via a laptop and projector.

  > All users can view the entire weeks agenda on desktop, laptop, projector and even on mobile via the main screen week calendar view - this will always show on a single screen

- [x] Attendees and presenters seek the ability to view a single day's events

  > The default view is 'Week' - and the user can use the filters at the top of the screen to switch to a single day view

- [x] On Wednesday attendees will be split into 2 parallel tracks – the agenda needs to show the split tracks where appropriate

  > Wednesdays events are split into two columns clearly showing the events running in parallel - this is shown both in the calendar view and the details view

## Things to improve

- Category styling is hard coded - I have hard coded the different colours for the 7 categories, I'd like to make these dynamic, what happens if the data passed in has say 8 categories? We need to dynamically create different colours - I'd also like to give te use the option to set their own colours for the categories as prop values on the main <Agenda /> component
- Colour guide modal - In my original designs I had a link "View the colour code key", this would have been a modal showing the different colours and which category they represent
- Filter functionality - Another idea from my original design was to have a filter which enabled users to filter the events. The use case is that some event attendees may only be interested in say "mobile" activities and "break" categories so could filter out results they are not interested in
- Full width functionality - On the main <Agenda /> component a developer can set if they want the break category to display full width, this is so that we can highly a paticular category most people will be interested in, this is useful but I would like to make this dynamic, it's currently hard coded to category 2 but this could easily be upgraded if this project were to be further developed
- Parallel activities - I'm pretty pleased with the current functionality where events happening at the same time will automatically display side by side but what happens if there were 3 events at the same time or more? This is some functionality that could be expanded if this project were to be further developed
- Pagination - if the event data has three days then three days are rendered in the week view, if there's 5 then 5 are rendered and so on. This works well up to around 7 days maximum - anymore then that and I would implement some sort of pagination system - view week 1, view week 2 and so on
- Reusable testing data - I've recreated some of the test data in the unit tests, would be nice to have a universal test data set
- Language strings - All of the text is currently just test strings throughout the application, I would like to strip all of those out and use language strings, this makes maintaining / changing text easier in the future and also if we need to update the app to support multi languages much easier
- Right to left languages functionality - if we were to support multi languages then we would need to create right-to-left languages and render the app accordingly
- Accessibility - I have done an accessibility audit using the Wave audit tool and there are no errors, not even a contrast error. There are likely improvements given a deeper audit
- Select list styling - the day select drop down styling is ok, but I could improve this given more time
- CSS modules - I've made limited use of CSS modules. For example with the Model component I have encapsulated all of the styles needed for that component in it's own file - Module.module.css. Given move time I would break down all of the styles in globals.css and give all of the components the same treatment
- List view box heights - In the list view for Wednesday when we have activities displayed side by side the activities heights don't match, should be able to easily improve that with flex box

## Testing

Tested on Windows Chrome, Edge and simulated iPhone SE/XR and Samsung Galaxy in Chrome dev tools
