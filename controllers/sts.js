const Core = require("@alicloud/pop-core");

const OSS = require("ali-oss");

exports.getDownloadLink = async (req, res) => {
    const {filename} = req.body;
    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
        region: "oss-cn-hangzhou",
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: "LTAI5tCbNAQSZ2uAaz2jFtLk",
        accessKeySecret: "H4evE0nAeJpkXsO6Q142Ssk4952ZAO",
        // 填写Bucket名称。
        bucket: "qrcode-portal",
    });

    // 获取下载exampleobject.txt文件的签名URL，使用浏览器访问时默认直接预览要下载的文件。
    // 填写不包含Bucket名称在内的Object完整路径。
    const url = client.signatureUrl("cert-image/" + filename, { expires: 180 });
    res.status(200).json({
        message: "get link successful",
        data: url,
    });
};

exports.getUploadLink = async (req, res) => {
    const { filename, mimeString } = req.body;
    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
        region: "oss-cn-hangzhou",
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: "LTAI5tCbNAQSZ2uAaz2jFtLk",
        accessKeySecret: "H4evE0nAeJpkXsO6Q142Ssk4952ZAO",
        // 填写Bucket名称。
        bucket: "qrcode-portal",
    });

    // 获取下载exampleobject.txt文件的签名URL，使用浏览器访问时默认直接预览要下载的文件。
    // 填写不包含Bucket名称在内的Object完整路径。
    const url = client.signatureUrl(filename, {
        expires: 1800,
        method: "PUT",
        "Content-Type": mimeString,
    });
    res.status(200).send(url);
};

exports.getSTSToken = async (req, res) => {
    const params = {
        RoleArn: "acs:ram::1299153890650559:role/sts-oss",
        RoleSessionName: "test",
        Policy: `{
        "Version": "1",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "oss:PutObject",
                "Resource": [
                    "acs:oss:*:*:qrcode-portal/profile-photo",
                    "acs:oss:*:*:qrcode-portal/profile-photo/*"
                ]
            }
        ]
    }`,
        DurationSeconds: 3600,
    };

    var requestOption = {
        method: "POST",
    };

    var client = new Core({
        accessKeyId: "LTAI5tCbNAQSZ2uAaz2jFtLk",
        accessKeySecret: "H4evE0nAeJpkXsO6Q142Ssk4952ZAO",
        endpoint: "https://sts.aliyuncs.com",
        apiVersion: "2015-04-01",
    });

    client.request("AssumeRole", params, requestOption).then(
        (result) => {
            res.status(200).json({
                message: "get sts token successfully",
                data: result,
            });
        },
        (err) => {
            res.status(500).json({
                message: `failed to get sts token!, reason: ${err}`,
            });
        }
    );
};

//构建一个阿里云客户端, 用于发起请求。
//设置调用者（RAM用户或RAM角色）的AccessKey ID和AccessKey Secret。

//设置参数。关于参数含义和设置方法，请参见《API参考》。

//发起请求，并得到响应。
