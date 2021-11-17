class MemberService {
  constructor(knex) {
    this.knex = knex;
  }

  postMemberInfo(
    userId,
    isAdmin,
    username,
    firstName,
    lastName,
    phone,
    district,
    profilePath,
    token,
    blacklist
  ) {
    return this.knex
      .insert({
        isAdmin: isAdmin,
        username: username,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        district: district,
        profilePath: profilePath,
        token: token,
        blacklist: blacklist,
      })
      .into("account")
      .where("account.id", id)
      .returning("account.id");
  }
}

module.exports = MemberService;
