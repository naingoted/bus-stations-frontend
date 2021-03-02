import { useState } from "react";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/router";
import { useAuthDispatch } from "@/contexts/authContext";

const Login = () => {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await AuthService.doUserLogin(dispatch, formInput);
    if (response) {
    //   AuthService.handleLoginSuccess(response, formInput.remember);
      router.push("/");
    } else {
      alert("Please check your credentials and try agian");
    }
  };
  console.log(formInput);
  const updateFormInput = (e) => {
    e.persist();
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: value }));
  };
  return (
    <div>
      Sign in
      <form onSubmit={(e) => handleFormSubmit(e)} method="post">
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={updateFormInput}
          placeholder="email address"
          required
        />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={updateFormInput}
          placeholder="password"
          required
        />
        <label htmlFor="remember"> Remember me</label>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          checked={formInput.remember}
          onChange={updateFormInput}
          id=""
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
