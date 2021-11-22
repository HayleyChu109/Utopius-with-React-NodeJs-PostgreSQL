exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("request")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("request").insert([
        {
          requesterId: 4,
          title: "testing1",
          detail: "testing1",
          reward: 10,
          requiredPpl: 2,
          district: "North",
          status: "open",
          reqPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/help.png",
        },
        {
          requesterId: 4,
          title: "testing2",
          detail: "testing2",
          reward: 20,
          requiredPpl: 3,
          district: "Wan Chai",
          status: "completed",
          reqPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/help.png",
        },
        {
          requesterId: 4,
          title: "testing3",
          detail: "testing3",
          reward: 30,
          requiredPpl: 5,
          district: "Islands",
          status: "cancelled",
          reqPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/help.png",
        },
        {
          requesterId: 4,
          title: "testing4",
          detail: "testing4",
          reward: 30,
          requiredPpl: 5,
          district: "Central and Western",
          status: "matched",
          reqPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/help.png",
        },
      ]);
    });
};
