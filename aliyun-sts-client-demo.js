const OSS = require("ali-oss");

const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "yourRegion",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: "STS.NUttvNqrGh6bimUmmLEadzQQo",
    accessKeySecret: "HR2JeevFSoRnSzPaDSBNGQnfVgKSvjUjDKutxEpjwz3",
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken:
        "CAISyQJ1q6Ft5B2yfSjIr5bBP8z6nK1m3/SJa0vkiW0ZSe5IlZT6jTz2IH9PendpBe4WtP42lG1S7vcclq1vRoRZHcUU93qOtsY5yxioRqackQzcj9Vd+lfMewW6Dxr8w7WdAYHQR8/cffGAck3NkjQJr5LxaTSlWS7CU/iOkoU1VskLeQO6YDFafs80QDFvs8gHL3DcGO+wOxrx+ArqAVFvpxB3hBFDi+u2ydbO7QHF3h+oiL0MvY/2LpXhd852IJ57FM+v2+J3cqeEyC5X9x8ota59l/5D4iyV/IPfUUBL6BKKPq/M9cdzJQs+frI9Fa9Aob3klfpkvauRtfyukUccZLwOA3WHGt34nZaVIo7zaIZlL4ScEm/Wz9WCOqPytw4Zen8BPGtIAYF+cSEuUEByGmuAc//6ogibPB3MULSelaYtyoqidJkxOABFTRqAAbCvVQrMeLRJ4VvTGGGk9QdHWTOll7owqFU84oVkRKuKoSRJB7yYp5+UiX1Ygp1DAH4asF5moEis5fBwg+H8u0cIqiT6pR+4f0O5984CwgifmAT3U5MeOfePdXJaDtr0yGohwj30Vd73qDmTCFv970ozis+UiqUjWH/KOz3RJHnG",

    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 300000,
    // 填写Bucket名称。
    bucket: "qrcode-portal",
});

async function put() {
    try {
        // object表示上传到OSS的文件名称。
        // file表示浏览器中需要上传的文件，支持HTML5 file和Blob类型。
        const r1 = await client.put("object", "file");
        console.log("put success: %j", r1);
        const r2 = await client.get("object");
        console.log("get success: %j", r2);
    } catch (e) {
        console.error("error: %j", e);
    }
}

put();
