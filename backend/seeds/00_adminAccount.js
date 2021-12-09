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
          profilePath:
            "https://utopius.s3.ap-southeast-1.amazonaws.com/admin.png",
          grade: "-",
          token: 0,
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
          token: 0,
          blacklist: false,
        },
      ]);
    });
};
