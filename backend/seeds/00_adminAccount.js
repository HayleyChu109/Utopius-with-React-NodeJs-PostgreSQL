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
          username: "member01",
          email: "m@m.com",
          password:
            "$2b$10$eIsSPB1MpW9XCK1fndJcPOpwKLPdWQluLkf5aYMBO8sCV70aqPS7S",
          firstName: "Member",
          lastName: "One",
          phone: 23800000,
          district: "Tsuen Wan",
          grade: "-",
          token: 100,
          blacklist: false,
        },
        {
          isAdmin: false,
          username: "member02",
          email: "m2@m.com",
          password:
            "$2b$10$eIsSPB1MpW9XCK1fndJcPOpwKLPdWQluLkf5aYMBO8sCV70aqPS7S",
          firstName: "Member",
          lastName: "Two",
          phone: 23800001,
          district: "Central and Western",
          grade: "-",
          token: 100,
          blacklist: false,
        },
      ]);
    });
};
