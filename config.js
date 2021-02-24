module.exports = {
    OT_API_KEY: process.env.PROJECT_CODEC === "H264" ? process.env.OT_H264_API_KEY : process.env.OT_VP8_API_KEY,
    OT_API_SECRET: process.env.PROJECT_CODEC === "H264" ? process.env.OT_H264_API_SECRET : process.env.OT_VP8_API_SECRET,
    OT_SESSION: process.env.PROJECT_CODEC === "H264" ? process.env.OT_H264_SESSION : process.env.OT_VP8_SESSION,
    USERS: [
        process.env.U01,
        process.env.U02,
        process.env.U03,
        process.env.U04,
    ]
};