import z from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2 , 'Name must be at least 2 characters long').max(100, 'Name must not exceed 100 characters'),
    username: z.string().min(2, 'Username must be at least 2 characters long').max(100, 'Username must not exceed 100 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(100, 'Password must not exceed 100 characters').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must include uppercase, lowercase, a number, and a special character'),
    rePassword: z.string().min(8, 'Confirm Password must be at least 8 characters long').max(100, 'Confirm Password must not exceed 100 characters').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Confirm Password must include uppercase, lowercase, a number, and a special character'),
    dateOfBirth: z.string().date('Please enter a valid date of birth').nonempty('Date of Birth is required').refine((value) => {
        const currYear = new Date().getFullYear();
        const userYear = new Date(value).getFullYear();
        return currYear - userYear >= 16;
    }, {
        message: 'Your age is less than 16',
    }),
    gender: z.enum(['male', 'female'], { required_error: 'Please select your gender' }),
    
}).refine((data) => data.password === data.rePassword ,{
    path: ['rePassword'],
    message: 'Passwords do not match',
})
