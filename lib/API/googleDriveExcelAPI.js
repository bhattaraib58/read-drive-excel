"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readExcelFileById = readExcelFileById;

var _googleSpreadsheet = _interopRequireDefault(require("google-spreadsheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var credentials = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0ip4IFW0s/Scd\nd4g7q6iXFfU65RDy6f0bwR1IXjuAzF5iaCne/rC+lVnNRyyxR6cjO6AE8+ALPW63\nssiRofOuAzxCGOqmWE0tgV3SW6xWyuGEXbNuKC6F1JNVXNAZWZzyre/DuMM2mHGA\nYePnvLmCuxTFPiLqq7loEMBVymrpJP2zQntIlPg19WETAwYmn0bPI8iotmgCUouN\nOhb2aeuuaDKUXRJLOKUXZecwJRbZQtmzzrqPTC7+8PkfrkRB4oD70TPs9CF8zBVW\naPf0/Cf9H0aJrKXXi5mYXVFQ4nh3AbN3pK7N7MYN2r/RzBJQvfNEehD4BPZbUyew\np5GjlF/HAgMBAAECggEAWjlR24lVq5+BnjS/tM5G7OZQzNNv4m10C5w5FZLeGrJH\nUtdqYWIXks7Rd4hjud6slKt1/zOfGg7j11K18C2muSYtxXxtO58yRpT5fahJmoA+\nLmejRWA4S7JdxNGiv6BskkzBXyblC9IoGrgQ7J0Aemgi66VvTqZt/Ccu71C+l+8H\nsQi8d6Qrl17X4Cf68wTnyuoEU2NQDSoGLNtOdUT3xL+gDrphWPb7r5wOD76SxLW4\n2LvtR1oRkaj/45+glrZ4uIN7+frjrS0xE8H6aG2OC4hJWbYw89yV3Wu7KXsmG0hd\npzH7p3n0utoCvFI5ijMd8h3ZkJBjgQkql0UJFwdvgQKBgQDxlg3I4Ld72oHrT5pi\n3oTY74hzSrQ2/xP2vyjiZ+BapIrYMpbt2QXtLrUc/lZDbW8I/YNGavFYMLqjKuZi\nlUIvttQFdmGefx51E1gDiZ4Y0ZbfDrBEleeHQP9fN402hqAI4F7RlcDcxssZLYt4\nqBXD+AGcGexv7gMwzF8LLH9ZRwKBgQC/UC1pdrUfsGyLYTJED9R3OyyEmkmvWZOP\nFJFUcX74mMf9BAguztf/6clzB/kp2mcWlWOqPMVKr7FDtC6Few/OxjJtWL/viInK\nIpCnjKVsbGEZpfTV9JQP0wex0J9DTbHACup/vjP351TUYnwznqeU7hqza1TTEFej\noK2OxQYFgQKBgBDNTNwhtOEqS0rgWG5z521nC2hpU6tXhj3tAZzteI8VTorGyfR0\n2ZKrYvFHRxydadGIQC8PlQV7Lh/XBfrpQpcq8ggHObbaRHYECGUGlzZGrWWKEfxT\nKK0heiFXLb0TE+JKKI4PCkDQmqN/pWmY1xqwDvyaWPVX6mTkcd/HEnxVAoGBAK6Q\n4l8RSkQYH3MuxUcFisEg5YY5onK2Mcak5dc/mLQN9K4SN8U+SCnjkUW9SMW/28Dn\nn4F+4ic8GWvFxY1WtR3gC7Nq//f5hoFC+OtpkqhUXGWi4L055sBptuOxkSFAi6jI\nTSEy1QintOf21Y3kftWOTh7ZGRVeHBnaS4Oyk8QBAoGAFa7GUvswTu82iknfC+9w\nomTLkAiXNXcjYiw0r90Ak1EU7G+i3y9SIoaa+tut4nCvyLpslxt8Zmxs++9QEd+e\n7Jaza+ky1K9sTORv5QxYXrWYhIIZJUp1Iy5ouujvCapX42owexPQ7K/ToUFAWxQp\nBGIEgv+H58sW3brdtGx6PgY=\n-----END PRIVATE KEY-----\n",
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url
};
var link = "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"; //its file id is 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

function readExcelFileById(fileId) {
  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new _googleSpreadsheet["default"](fileId);
  return new Promise(function (resolve, reject) {
    doc.useServiceAccountAuth(credentials, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      doc.getRows(1, function (error, dataRows) {
        if (error) {
          console.log(error);
          reject(error);
        }

        resolve(dataRows);
      });
    });
  });
}