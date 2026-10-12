import { Input } from '@heroui/react';
import { Button, Radio, RadioGroup} from "@heroui/react";
import { useForm } from "react-hook-form";
export default function Register() {
  const {register , handleSubmit} = useForm();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-gray-600 mb-4">Please fill in the information below to create your account.</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => console.log(data))}>

      <Input {...register('name')} fullWidth aria-label="Name"  placeholder="Enter your name" type="text" />
      <Input {...register('username')} fullWidth aria-label="Username"  placeholder="Enter your username" type="text" />
      <Input {...register('email')} fullWidth aria-label="Email"placeholder="Enter your email" type="email" />
      <Input {...register('password')} fullWidth aria-label="Password"  placeholder="Enter your password" type="password" />
      <Input {...register('confirmPassword')} fullWidth aria-label="Confirm Password" placeholder="Confirm your password" type="password" />
      <Input {...register('dateOfBirth')} fullWidth type="date" aria-label="Date of Birth" placeholder='Enter Your Date Of Birth' />
        <div className="m-3">
      <RadioGroup defaultValue="Female" name="gender" orientation="horizontal">
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
  )
}
