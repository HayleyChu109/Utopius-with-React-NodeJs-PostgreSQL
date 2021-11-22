exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("response")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("response").insert([
        {
          responserId: 5,
          requestId: "1",
          detail: "Hello, I would like to join",
          matched: "true",
        },
        {
          responserId: 5,
          requestId: "2",
          detail: "Hello, I would like to join",
          matched: "false",
        },
        {
          responserId: 5,
          requestId: "3",
          detail: "Hello, I would like to join",
          matched: "true",
        },
        {
          responserId: 5,
          requestId: "4",
          detail: "Hello, I would like to join",
          matched: "false",
        },
      ]);
    });
};
