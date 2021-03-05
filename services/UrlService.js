let apiDomain = "";
if (process.env.NODE_ENV === "production") {
  apiDomain = process.env.NEXT_PUBLIC_ENV_BASE_URL;
} else {
  apiDomain = process.env.NEXT_PUBLIC_ENV_PROD_BASE_URL;
}

class UrlService {
  static loginUrl() {
    return apiDomain + "api/v1/login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "api/v1/user";
  }
  static getUsersList() {
    return apiDomain + "api/v1/users";
  }
  static saveUserProfileUrl() {
    return apiDomain + "api/v1/user";
  }
  static getCurrentUserAcitiviesUrl() {
    return apiDomain + "api/v1/activities";
  }
  static getTodoUrl() {
    return apiDomain + "api/v1/todos";
  }
  static markTodoCompleteUrl(id) {
    return apiDomain + "api/v1/todo/complete/" + id;
  }
  static changeTodoOrderUrl() {
    return apiDomain + "api/v1/todo/reorder";
  }
  static saveTodoUrl() {
    return apiDomain + "api/v1/todo/save";
  }
  static removeTodoUrl() {
    return apiDomain + "api/v1/todo/remove";
  }
}

export default UrlService;
