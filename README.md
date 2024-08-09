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

There is also a linter which you can fun with

```bash
npm run lint
```

## Brain dump of things to improve

Fully width functionality is fun and useful but hard coded to category-2 - expand this to be dynamic
Category styling again is hard coded - I'd like to give options to set your own colours for your categories
colour guide modal
select list styling
filter functionality
Boxes match height in list view
Reusable testing data - I've recreated lots of the test data in the tests, would be nice to have a universal test data set
Talk about how modals could have loads more details like location and speaker name etc which is why a modal is needed

- Pagination
- Linting
- Language strings - All the text
- Right to left languages functionality
- There's no menu / mobile burger menu .. currently it's a single page so that doesn't matter but if this were to be developed further that would be required
- Language select functionality - once I implement language strings, introducing multilanguage is pretty easy
- The branding is ok, colours and fonts, look and feel etc but I'd like to refine it further
- Accessibility - I have done an accessibility audit using the Wave audit tool and there are no errors, not even a contrast error. There are likely improvements I could make given more time
  Text strings
- CSS modules - I've made limited use of CSS modules. For example with the Model component I have encapsulated all of the styles needed for that component in it's own file - Module.module.css. Given move time I would break down all of the styles in globals.css and give all of the components the same treatment

## Testing

Tested on Windows Chrome, Edge and simulated iPhone SE/XR and Samsung Galaxy in Chrome dev tools

TODO

Code review
Create README
YouTube video
