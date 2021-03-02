let apiDomain = "";
if (process.env.NODE_ENV === "production") {
  apiDomain = process.env.NEXT_PUBLIC_ENV_BASE_URL;
} else {
  apiDomain = process.env.NEXT_PUBLIC_ENV_PROD_BASE_URL;
}

class UrlService {
  static loginUrl() {
    return apiDomain + "api/login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "api/user";
  }
  static saveUserProfileUrl() {
    return apiDomain + "api/user";
  }
  static getCurrentUserAcitiviesUrl() {
    return apiDomain + "api/activities";
  }
  static getTodoUrl() {
    return apiDomain + "api/todos";
  }
  static markTodoCompleteUrl(id) {
    return apiDomain + "api/todo/complete/" + id;
  }
  static changeTodoOrderUrl() {
    return apiDomain + "api/todo/reorder";
  }
  static saveTodoUrl() {
    return apiDomain + "api/todo/save";
  }
  static removeTodoUrl() {
    return apiDomain + "api/todo/remove";
  }
}

export default UrlService;
