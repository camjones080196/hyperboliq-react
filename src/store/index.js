import { action, createStore, thunk, persist } from "easy-peasy";

export const store = createStore(
  persist({
    list: true,
    setList: action((state) => {
      return {
        ...state,
        list: !state.list,
      };
    }),
    searchResults: [],
    addSearchResults: action((state, payload) => {
      return {
        ...state,
        searchResults: payload,
      };
    }),
    search: thunk(async (actions, payload) => {
      await fetch(
        `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${payload}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key":
              "1e21edf8a6mshcb25c7f96a47d5dp1a0c65jsna990dddefe5c",
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          actions.addSearchResults(data.Search);
        })
        .catch((err) => {
          console.error(err);
        });
    }),
    selectedMovie: [],
    addSelectedMovie: action((state, payload) => {
      return {
        ...state,
        selectedMovie: payload,
      };
    }),
    getSelectedMovie: thunk(async (actions, payload) => {
      await fetch(
        `https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${payload}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key":
              "1e21edf8a6mshcb25c7f96a47d5dp1a0c65jsna990dddefe5c",
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          actions.addSelectedMovie(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }),
    favourites: [],
    addToFavourites: action((state, payload) => {
      state.favourites.push(payload);
    }),
    removeFromFavourites: action((state, payload) => {
      return {
        ...state,
        favourites: state.favourites.filter(
          (obj) => obj.imdbID !== payload.imdbID,
        ),
      };
    }),
  }),
);
