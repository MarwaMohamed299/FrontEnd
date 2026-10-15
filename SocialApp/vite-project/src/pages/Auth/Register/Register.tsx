import { Input } from "@heroui/react";
import { Button, Radio, RadioGroup } from "@heroui/react";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schema/register";
type RegisterFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors  },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
    },
    resolver : zodResolver(registerSchema),
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-gray-600 mb-4">
        Please fill in the information below to create your account.
      </p>
      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Input
          {...register("name", {
            
          })}
          fullWidth
          aria-label="Name"
          placeholder="Enter your name"
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
        <Input
          {...register("username", {
            
          })}
          fullWidth
          aria-label="Username"
          placeholder="Enter your username"
          type="text"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username?.message}</p>
        )}
        <Input
          {...register("email", {
           
          })}
          fullWidth
          aria-label="Email"
          placeholder="Enter your email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
        <Input
          {...register("password", {
           
          })}
          fullWidth
          aria-label="Password"
          placeholder="Enter your password"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}
        <Input
          {...register("confirmPassword", {
           
          })}
          fullWidth
          aria-label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}
        <Input
          {...register("dateOfBirth",{
            
            
          })}
          fullWidth
          type="date"
          aria-label="Date of Birth"
          placeholder="Enter Your Date Of Birth"
        />
        {errors.dateOfBirth && <p className="text-red-500"> {errors.dateOfBirth?.message} </p>}
        <div className="m-3">
          <RadioGroup
            defaultValue="Female"
            name="gender"
            orientation="horizontal"
          >
            <Radio value="Male">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Male
              </Radio.Content>
            </Radio>
            <Radio value="Female">
              <Radio.Content>
                <Radio.Control pl-3>
                  <Radio.Indicator />
                </Radio.Control>
                Female
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>
        <Button  type="submit" fullWidth>
          Save
        </Button>
      </form>
    </div>
  );
}
