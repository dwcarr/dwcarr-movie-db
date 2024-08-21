# Welcome to Movie Time

This is a demo app built with Remix. This app uses a provided movie database API to display images and information about movies.

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

The app is built with Remix. It uses the provided movie database API to fetch data. All data fetching happens on the client side, using the `clientLoader` function exposed by remix. You can think of a `clientLoader` as a backend for the client. It is a function that is executed on the client side, and it returns a response object that is then used to render the page. The clientloader can greatly simplify code, especially for react, as is it allows us to operate in a natively async manner, without introducing extra `useEffect` hooks.

In order to get the counts for the genres and the total number of pages, we utilize a remix fetcher. This is another client side fetching pattern that is not tied to a route, making it transportable across the app, with only one additional `useEffect` hook.

The main movie listing route is found at `/movies`, or in the route file `app/routes/movies.($page).($genre).tsx`. This route is a dynamic route, meaning that it can handle any page and genre combination. The page and genre are passed as parameters to the route, and are used to fetch the appropriate data from the API. If no page is provided, the page will redirect to the first page. If no genre is provided, then all movies in the database are returned.

Searches can be entered in the search bar at the top of the movies listing page. The search will execute on every keystroke, and the results will be updated in real time. The search results are paginated, and the user can navigate through the pages using the pagination controls at the bottom of the page.

The user can also select a genre from the dropdown at the top of the page. The genre will be used to filter the search results. The genre is passed as a parameter to the route, and is used to fetch the appropriate data from the API. If no genre is provided, then all movies in the database are returned.

The user can also click on a movie to see more information about it. This information includes the movie's title, summary, poster, duration, rating, and genre. The user can also click on the "Back" button to return to the movies listing page.
