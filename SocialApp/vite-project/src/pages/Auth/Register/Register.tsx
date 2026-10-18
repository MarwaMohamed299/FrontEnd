import { Input } from "@heroui/react";
import { Button, Radio, RadioGroup } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schema/register";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
type RegisterFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female";
};

export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "female",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormValues) {
    console.log(data);
    try {
      await axios.post(`https://route-posts.routemisr.com/users/signup`, data);
    } catch (error) {
      console.error(error);
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
          {...register("name", {})}
          fullWidth
          aria-label="Name"
          placeholder="Enter your name"
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
        <Input
          {...register("username", {})}
          fullWidth
          aria-label="Username"
          placeholder="Enter your username"
          type="text"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username?.message}</p>
        )}
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
        <Input
          {...register("rePassword", {})}
          fullWidth
          aria-label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
        {errors.rePassword && (
          <p className="text-red-500">{errors.rePassword?.message}</p>
        )}
        <Input
          {...register("dateOfBirth", {})}
          fullWidth
          type="date"
          aria-label="Date of Birth"
          placeholder="Enter Your Date Of Birth"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500"> {errors.dateOfBirth?.message} </p>
        )}
        <div className="m-3">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-label="Gender"
                orientation="horizontal"
              >
                <Radio value="male">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    Male
                  </Radio.Content>
                </Radio>
                <Radio value="female">
                  <Radio.Content>
                    <Radio.Control pl-3>
                      <Radio.Indicator />
                    </Radio.Control>
                    Female
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>
        <Button type="submit" fullWidth isDisabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <LineWave
                height={32}
                width={32}
                color="currentColor"
                ariaLabel="Creating account"
              />
              Creating account…
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
}
