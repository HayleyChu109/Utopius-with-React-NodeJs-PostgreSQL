exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tokenPlan")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tokenPlan").insert([
        {
          planName: "Basic",
          noOfToken: 100,
          hkd: 10,
          detail: "",
          photoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/dollar.png",
        },
        {
          planName: "Middle",
          noOfToken: 1000,
          hkd: 100,
          detail: "",
          photoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/money-middle.png",
        },
        {
          planName: "Monopoly",
          noOfToken: 5000,
          hkd: 400,
          detail: "20% off",
          photoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/money-large.png",
        },
      ]);
    });
};
