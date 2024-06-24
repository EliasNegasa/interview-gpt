import { z } from 'zod';

export const verificationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is Required')
    .email('Invalid email address')
    .max(255),
});
