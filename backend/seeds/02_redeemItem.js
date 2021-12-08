exports.seed = function (knex) {
  return knex("redeemItem")
    .del()
    .then(function () {
      return knex("redeemItem").insert([
        {
          name: "Iphone 13 Pro (256GB)",
          requiredToken: 90000,
          stock: 10,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/iphone13.png",
        },
        {
          name: "PlayStation 5",
          requiredToken: 60000,
          stock: 10,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/ps5.png",
        },
        {
          name: "Stream & Grill Oven",
          requiredToken: 55000,
          stock: 10,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/oven.jpeg",
        },
        {
          name: "Dyson V12 Detect Slim vacuum cleanser",
          requiredToken: 50000,
          stock: 10,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/dyson.png",
        },
        {
          name: "Airpod pro",
          requiredToken: 15000,
          stock: 10,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/airpod.jpeg",
        },
        {
          name: "Delongchi Pump Espresso Coffee Machine",
          requiredToken: 11000,
          stock: 20,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/coffee_machine.png",
        },
        {
          name: "Bruno Compact Hot Plate",
          requiredToken: 10000,
          stock: 20,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/bruno.jpeg",
        },
        {
          name: "ParknShop coupon",
          requiredToken: 1000,
          stock: 2000,
          itemPhotoPath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/PnS-coupon.jpeg",
        },
      ]);
    });
};
