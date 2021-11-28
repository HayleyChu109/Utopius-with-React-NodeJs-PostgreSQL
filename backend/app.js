// Require node modules
const express = require("express");
const app = express();

const getLinkPreview=require('link-preview-js').getLinkPreview
// Setup middlewares
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup knex with postgreSQL database
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Setup auth
const auth = require("./Auth/auth")(knex);
app.use(auth.initialize());

// Setup auth service and router
const AuthService = require("./Service/AuthService");
const AuthRouter = require("./Router/AuthRouter");
const authService = new AuthService(knex);
const authRouter = new AuthRouter(authService);

// Setup admin service and router
const AdminService = require("./Service/AdminService");
const AdminRouter = require("./Router/AdminRouter");
const adminService = new AdminService(knex);
const adminRouter = new AdminRouter(adminService);

// Setup member service and router
const MemberService = require("./Service/MemberService");
const MemberRouter = require("./Router/MemberRouter");
const memberService = new MemberService(knex);
const memberRouter = new MemberRouter(memberService);
// Setup announce service and router
const AnnounceService = require("./Service/AnnounceService");
const AnnounceRouter = require("./Router/AnnounceRouter");
const announceService = new AnnounceService(knex);
const announceRouter = new AnnounceRouter(announceService);

// Setup request service and router
const RequestService = require("./Service/RequestService");
const RequestRouter = require("./Router/RequestRouter");
const requestService = new RequestService(knex);
const requestRouter = new RequestRouter(requestService);

// Setup public service and router
const PublicService = require("./Service/PublicService");
const PublicRouter = require("./Router/PublicRouter");
const publicService = new PublicService(knex);
const publicRouter = new PublicRouter(publicService, requestService);

const TagService = require("./Service/TagService");
const TagRouter = require("./Router/TagRouter");
const tagService = new TagService(knex);
const tagRouter = new TagRouter(tagService);

const AdminRequestService = require("./Service/adminRequestService");
const AdminRequestRouter = require("./Router/adminRequestRouter");
const adminRequestService = new AdminRequestService(knex);
const adminRequestRouter = new AdminRequestRouter(adminRequestService);

app.use("/", authRouter.router());
app.use("/", publicRouter.router());
app.use("/admin", auth.authenticate(), adminRouter.router());
app.use("/announce", auth.authenticate(), announceRouter.router());
app.use("/member", auth.authenticate(), memberRouter.router());
app.use("/member", auth.authenticate(), requestRouter.router());
app.use("/tag", auth.authenticate(), tagRouter.router());
app.use("/request", adminRequestRouter.router());


// Set up port
const port = 8080;
app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});

module.exports = app;
