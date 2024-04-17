## Task Overview
This task requires you to make a lot of choices. At the most basic level, you must develop 
a React application that allows the user to interact with all the available endpoints, 
but without the user ever being aware of the underlying calls to the API.

You should think of this task as a series of increasingly challenging steps, with each step 
allowing you the opportunity to achieve greater success. You should think very carefully about 
how users will input things into your app, the components that you will use to display the 
API data, and how users will navigate between pages.

## Landing Page
What will your users see when they first launch your app? Often there will be a hero image
and a welcome message. The navigation choices available to the user should be clear. What
can they access in your app and how? Your layout should be chosen to facilitate the
information that is available at the endpoints.

## Volcano List Page
The Volcano List page utilises data available from the /countries and /volcanoes endpoints.
The purpose of this page is to allow the user to search for volcanoes in a specified country,
and optionally filter the list of volcanoes to those that have people living within a specified
radius. Well-suited components for this page are a form and table.

You will need to decide how the user will input the country name to search for. Can you
provide a dropdown with the countries listed? Are there too many options to show in a
dropdown? Will you just support free text input? If so, how will you handle an invalid
country? Can you support auto complete suggestions for this field? Some of these ideas are
easy, others are more challenging. Try to get something working in the first instance and
experiment from there. Similar considerations apply when dealing with the populated
within distance.

We will look favourably on implementations that use a sophisticated table component such as
Ag Grid and implement pagination (some countries such as Japan have 122 recorded
volcanoes), as well as client-side filtering and sorting.

You will also need to decide how the user will select an individual volcano. In our example
we are utilising AG Grid’s row click handler to navigate to an individual volcano page.

## Individual Volcano Page
The individual volcano page utilises data from the /volcano/{id} endpoint. Of note on this
page is the use of a map component to display the volcano’s location and display a marker
at its provided latitude and longitude.
If the user is authenticated, then the population density data will also be available to them.
This data can be visualised in a bar chart, or similar, component. As the user is logged in,
notice in the navigation bar that the user should now only see an option to log out.

## Login and Register pages
The login and register pages should utilise the two POST authentication endpoints:
/user/login and /user/register. You can combine the login and register pages into one page
should you wish. You will need to build a form component to allow the user to enter their
email and password. You should also consider and appropriately handle any error cases -
e.g., email is already in use, password is missing etc. See the Swagger docs for the full list of
possible error responses.

# Some Guidance on Website Design

## CSS
We anticipate most participants will use a component library that comes with some included
styling, such as Reactstrap. Utilising a component library will allow you to design a clean and
modern website without having to write much CSS. If you have prior experience with CSS,
then you may wish to write most of the styling yourself – this is an acceptable approach too.

## Routing
You should think about how you are going to handle each route in your client-side
application. Have a look at the React Router examples in the lectures and worksheets. You
may use a basic HTML menu as a last resort, but the use of React Router will attract much
more credit.

## Choice of Inputs/Widgets
Some of the endpoints need parameters and you will need to choose how to specify them.
Have a look at the example screenshots above and their associated commentary. Are you
going to use drop downs? Text boxes? Radio buttons? What makes sense for the choices
you are making? Are you making consistent choices across the app? Draw some screens on
paper or in a drawing tool before you start any programming.

## Table Components
As discussed in the Application Breakdown section, the table component plays a crucial role 
in displaying the data from the server. Using a sophisticated table component like AG Grid
means that you can offer rich functionality on the client-side (e.g., filtering, sorting, and
pagination). Pay particular attention to the practical worksheet which walks you through
this material.

We will not look favourably on apps which attempt to immediately load all 1,343 entries
from the server when it is opened and from thereon handle everything client-side. You
should strike a balance between client-side interactions and proper use of the API
endpoints.

## Mapping
We recommend using Pigeon Maps (https://pigeon-maps.js.org/docs/) to show a map of
the volcano’s location. Pigeon Maps is open source, easy to use, and designed specifically to
work with React. There are, of course, other mapping alternatives such as Google Maps and
Leaflet.

## Charting
To display the population density data, a bar chart or some other form of visualisation will
be very well received. You may use standard chart libraries to produce these. We
recommend the use of [chartJS](https://www.chartjs.org/), especially via the
widely used React wrapper which you can find [here](https://www.npmjs.com/package/react-chartjs-2) 
[d3js](https://d3js.org/) is also a popular choice, but it does have a steep learning curve and 
we therefore don’t recommend using it unless you have prior experience.

# The Report
We will expect a short report and user guide, generally running to 10 pages or so, including
a lot of screenshots. Mostly this is just to help us better understand your application, but we
will also require you to assess critically the quality of your UI design, and to analyse it from
the perspective of accessibility, and the changes that would be needed for the application to
be compliant. We will give more guidance on this in the report guide and template which
sits alongside this specification on Blackboard. However, to make one thing clear, you can
be as brutal and self-critical as you like in these sections without noticeably affecting your UI marks. 
In fact, this is very much encouraged.