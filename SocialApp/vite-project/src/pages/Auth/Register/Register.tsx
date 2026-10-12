import { Input } from '@heroui/react';
import { Button, Radio, RadioGroup} from "@heroui/react";

export default function Register() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <p className="text-gray-600 mb-4">Please fill in the information below to create your account.</p>
      <form className="flex flex-col gap-4">

      <Input fullWidth aria-label="Name"  placeholder="Enter your name" type="text" />
      <Input fullWidth aria-label="Username"  placeholder="Enter your username" type="text" />
      <Input fullWidth aria-label="Email"placeholder="Enter your email" type="email" />
      <Input fullWidth aria-label="Password"  placeholder="Enter your password" type="password" />
      <Input fullWidth aria-label="Confirm Password" placeholder="Confirm your password" type="password" />
      <Input fullWidth type="date" aria-label="Date of Birth" placeholder='Enter Your Date Of Birth' />
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
       <Button fullWidth onPress={() => console.log("Button pressed")}>Save</Button>
      </form>

    </div>
  )
}
