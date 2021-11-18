class MemberService {
  constructor(knex) {
    this.knex = knex;
  }

  getMemberInfo(userId) {
    return this.knex("account")
      .select(
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "phone",
        "district",
        "profilePath",
        "grade",
        "token"
      )
      .where("account.id", userId);
  }

  putMemberInfo(
    userId,
    username,
    firstName,
    lastName,
    phone,
    district,
    profilePath
  ) {
    return this.knex("account")
      .update({
        username: username,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        district: district,
        profilePath: profilePath,
      })
      .where("account.id", userId)
      .returning("account.id");
  }
}

module.exports = MemberService;
