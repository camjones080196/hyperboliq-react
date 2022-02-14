import React from "react";

export default function Search(searchValue) {
  fetch(
    `https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchValue}&r=json&page=1`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "1e21edf8a6mshcb25c7f96a47d5dp1a0c65jsna990dddefe5c",
      },
    },
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
