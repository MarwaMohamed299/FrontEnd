import { Button, Input, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LineWave } from "react-loader-spinner";
import { loginSchema } from "../../../schema/login";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { LoginFormValues } from "../../../types/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
  
      email: "",
      password: "", 
      
    },
    resolver: zodResolver(loginSchema),
  });

  let{updateToken} = useContext(AuthContext);
  let navigate = useNavigate();
  async function onSubmit(loginData: LoginFormValues) {
    try {
      let {data}=await axios.post(`https://route-posts.routemisr.com/users/signin`, loginData);
      updateToken(data.data.token)
      toast.success("Logged in successfully!");
      setTimeout(() =>{

        navigate("/");
      },1000)

    } catch (error) {
      if(isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "Failed to login.";
        toast.danger(errorMessage);
      } else {
        toast.danger("Unable to log in. Please check your connection and try again.");
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <p className="text-gray-600 mb-4">
        Enter your email and password to log in.
      </p>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
               <Input
          {...register("email", {})}
          fullWidth
          aria-label="Email"
          placeholder="Enter your email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
        <Input
          {...register("password", {})}
          fullWidth
          aria-label="Password"
          placeholder="Enter your password"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
       
        <Button type="submit" fullWidth isDisabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <LineWave
                height={32}
                width={32}
                color="currentColor"
                ariaLabel="Logging in"
              />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>
    </div>
  );
}
