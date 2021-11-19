class MemberService {
  constructor(knex) {
    this.knex = knex;
  }

  async getMemberInfo(userId) {
    try {
      let memberInfo = await this.knex("account")
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
        .where("id", userId);
      console.log(memberInfo);
      if (memberInfo.length > 0) {
        return memberInfo[0];
      } else {
        return "No such member";
      }
    } catch (err) {
      throw new Error(err);
    }
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
