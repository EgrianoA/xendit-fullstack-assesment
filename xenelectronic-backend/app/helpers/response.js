const success = "success";

module.exports = data => {
  try {
    return { status: success, statusCode: 200, errorCode: 0, data: data };
  } catch (error) {
    return { status: success, statusCode: 400, errorCode: 0, data: error };
  }
};
