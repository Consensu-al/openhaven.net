import type { z } from 'zod';
import type { DomainSchema, ProtocolSchema, AffordanceSchema } from './schemas';

export type Domain = z.infer<typeof DomainSchema>;
export type Protocol = z.infer<typeof ProtocolSchema>;
export type Affordance = z.infer<typeof AffordanceSchema>;
