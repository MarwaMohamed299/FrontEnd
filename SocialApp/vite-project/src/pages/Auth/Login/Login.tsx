import { Button, Input, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { LineWave } from "react-loader-spinner";
import { loginSchema } from "../../../schema/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
type RegisterFormValues = {
  email: string;
  password: string;
};
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
  
      email: "",
      password: "",
      
    },
    resolver: zodResolver(loginSchema),
  });
  let navigate = useNavigate();
  async function onSubmit(data: RegisterFormValues) {
    if(isSubmitting) return;
    try {
      await axios.post(`https://route-posts.routemisr.com/users/signin`, data);
      console.log(data);
      toast.success("Logged in successfully!");
      setTimeout(() =>{

            navigate("/home");
      },1000)

    } catch (error) {
      if(isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "Failed to login.";
        toast.danger(errorMessage);
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-gray-600 mb-4">
        Please fill in the information below to create your account.
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
                ariaLabel="Creating account"
              />
              Logging in...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
}
