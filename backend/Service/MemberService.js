class MemberService {
  constructor(knex) {
    this.knex = knex;
  }

  postMemberInfo(
    userId,
    username,
    firstName,
    lastName,
    phone,
    district,
    profilePath
  ) {
    return this.knex
      .insert({
        username: username,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        district: district,
        profilePath: profilePath,
      })
      .into("account")
      .where("account.id", userId)
      .returning("account.id");
  }
}

module.exports = MemberService;
