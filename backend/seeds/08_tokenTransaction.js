exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tokenTransaction")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tokenTransaction").insert([
        { requestId: 2, payerId: 4, payeeId: 5, amount: 20 },
        { requestId: 3, payerId: 4, payeeId: 5, amount: 30 },
      ]);
    });
};
