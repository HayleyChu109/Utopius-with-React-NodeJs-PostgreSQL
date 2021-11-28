exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tokenPurchaseRecord")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tokenPurchaseRecord").insert([
        { accountId: 4, tokenPlanId: 1 },
        { accountId: 4, tokenPlanId: 2 },
        { accountId: 5, tokenPlanId: 2 },
        { accountId: 5, tokenPlanId: 3 },
      ]);
    });
};
