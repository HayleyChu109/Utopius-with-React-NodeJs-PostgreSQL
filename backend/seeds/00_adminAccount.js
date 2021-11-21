exports.seed = function (knex) {
  return knex("account")
    .del()
    .then(function () {
      return knex("account").insert([
        {
          isAdmin: true,
          username: "admin1",
          email: "admin1@admin.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Admin",
          lastName: "One",
          phone: 21800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
        {
          isAdmin: true,
          username: "admin2",
          email: "admin2@admin.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Admin",
          lastName: "Two",
          phone: 22800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
        {
          isAdmin: true,
          username: "admin3",
          email: "admin3@admin.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Admin",
          lastName: "Three",
          phone: 23800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
        {
          isAdmin: false,
          username: "test1",
          email: "test1@test.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Test",
          lastName: "One",
          phone: 23800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
        {
          isAdmin: false,
          username: "test2",
          email: "test2@test.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Test",
          lastName: "Two",
          phone: 23800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
        {
          isAdmin: false,
          username: "test3",
          email: "test3@test.com",
          password:
            "$2b$10$FGus74upQ7c4mp9st46sVuCDMvhFiwHJJaO.ztYiQNDxDoq5HfDgO",
          firstName: "Test",
          lastName: "Three",
          phone: 23800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 5000,
          blacklist: false,
        },
      ]);
    });
};
