# Welcome to Movie Time

This is a demo app built with Remix. This app uses a provided movie database API to display images and information about movies.

A live version of the app can be found [here](https://dwcarr-movie-db.fly.dev).

## Minimum Requirements

The minimum requirements for this app are:
As a user,

- I can search for movies and see a paginated list of results
- I can filter search results by genre
- I can navigate through the next and previous pages of the paginated results.
- I can see the total count of search results
- I see notable information for each search result, such as the summary, poster, duration, rating, etc.

The app indeed accomplishes all of the above.

## Implementation

### Key Features -- Data Fetching With Remix

The app is built with Remix. It uses the provided movie database API to fetch data. All data fetching happens on the client side, using the `clientLoader` function exposed by remix. You can think of a `clientLoader` as a backend for the client. It is a function that is executed on the client side, and it returns a response object that is then used to render the page. The clientloader can greatly simplify code, especially for react, as is it allows us to operate in a natively async manner, without introducing extra `useEffect` hooks. Putting the data fetching in the clientLoader is especially useful in apps such as these that are interacting with an external API, as it avoids the extra hop of going to the server to fetch data.

In order to get the counts for the genres and the total number of pages, we utilize a remix fetcher. This is another client side fetching pattern that is not tied to a route, making it transportable across the app, with only one additional `useEffect` hook. The fetcher can retrieve data from one of the apps routes without triggering a navigation to that route. In this case, we have a route that returns the counts for the genres, which is found at `/genres/1`. The fetcher is then used to retrieve the data from this route, and is passed to the clientLoader function.

### Site Navigation and Search Functionality

The main movie listing route is found at `/movies`, or in the route file `app/routes/movies.($page).($genre).tsx`. This route is a dynamic route, meaning that it can handle any page and genre combination. The page and genre are passed as parameters to the route, and are used to fetch the appropriate data from the API. If no page is provided, the page will redirect to the first page. If no genre is provided, then all movies in the database are returned.

Searches can be entered in the search bar at the top of the movies listing page. The search will execute on every keystroke, and the results will be updated in real time. The search results are paginated, and the user can navigate through the pages using the pagination controls at the bottom of the page.

The user can also select a genre from the dropdown at the top of the page. The genre will be used to filter the search results. The genre is passed as a parameter to the route, and is used to fetch the appropriate data from the API. If no genre is provided, then all movies in the database are returned.

The user can also click on a movie to see more information about it. This information includes the movie's title, summary, poster, duration, rating, and genre. The user can also click on the "Back" button to return to the movies listing page.

### Prefetching

All of the links on the page are prefetched, meaning that the data for the page is fetched in the background just before the user navigates to the page. This is done using the `Link` component from remix with `prefetch="intent"`. This is a powerful feature that allows us to fetch data for a page as the user's cursor hovers over the link. This can greatly improve the user experience, as the data will be ready by the time the user navigates to the page, making the page feel more responsive.

## Design

The design of the app is minimal and clean, aiming for functionality over aesthetics. The app is responsive, and the design will adapt to the screen size of the device. This is accomplished using tailwindcss and shadcn ui, a library of pre-built components that are styled using tailwindcss.

## Future Improvements

- Add a search history to the app
- Add a favorites list to the app
- Add a dark mode to the app
- Implement automated testing
- Aesthetic improvements (through collaboration with a designer)
