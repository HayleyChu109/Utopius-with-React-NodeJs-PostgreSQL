exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("review")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("review").insert([
        {
          requestId: 1,
          reviewerId: 4,
          revieweeId: 5,
          rating: 3.5,
          ratingComment: "Quite good",
        },
        {
          requestId: 3,
          reviewerId: 4,
          revieweeId: 5,
          rating: 4,
          ratingComment: "Quite good",
        },
        {
          requestId: 3,
          reviewerId: 4,
          revieweeId: 5,
          rating: 4,
          ratingComment: "Quite good",
        },
      ]);
    });
};
