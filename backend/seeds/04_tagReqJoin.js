exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tagReqJoin")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tagReqJoin").insert([
        { tagId: 1, requestId: "1" },
        { tagId: 2, requestId: "1" },
        { tagId: 3, requestId: "1" },
        { tagId: 1, requestId: "2" },
        { tagId: 2, requestId: "2" },
        { tagId: 3, requestId: "2" },
        { tagId: 1, requestId: "3" },
        { tagId: 2, requestId: "3" },
        { tagId: 3, requestId: "3" },
        { tagId: 1, requestId: "4" },
        { tagId: 2, requestId: "4" },
        { tagId: 3, requestId: "4" },
      ]);
    });
};
