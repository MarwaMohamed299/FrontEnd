import { Input } from "@heroui/react";
import { Button, Radio, RadioGroup } from "@heroui/react";
import { useForm } from "react-hook-form";
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
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
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
            required: {
              value: true,
              message:
                "Name must be at least 2 characters long and not exceed 30 characters.",
            },
            minLength: { value: 2, message: "Name must be at least 2 characters long." },
            maxLength: { value: 30, message: "Name must not exceed 30 characters." },
          })}
          fullWidth
          aria-label="Name"
          placeholder="Enter your name"
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
        <Input
          {...register("username", {
            required: {
              value: true,
              message:
                "Username must be at least 2 characters long and not exceed 30 characters.",
            },
            minLength: { value: 2, message: "Username must be at least 2 characters long." },
            maxLength: { value: 30, message: "Username must not exceed 30 characters." },
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
            required: {
              value: true,
              message: "Email must be a valid email address.",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              message: "Email must be a valid email address.",
            },
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
            required: {
              value: true,
              message: "Password is required.",
            },
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
              message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
            },
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
            required: {
              value: true,
              message: "Please confirm your password.",
            },
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
              message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.",
            },
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
            required: "Date of Birth is required.",
            validate: function(value){
             const currYear = new Date().getFullYear();
             const userYear = new Date(value).getFullYear();
             return currYear - userYear >= 16 ? true : 'Your age is less than 16'
            }
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
        <Button type="submit" fullWidth>
          Save
        </Button>
      </form>
    </div>
  );
}
