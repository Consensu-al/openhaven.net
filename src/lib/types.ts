import type { z } from 'zod';
import type { DomainSchema, ProtocolSchema, AffordanceSchema, EntityTypeSchema, AttributeDefSchema } from './schemas';

export type Domain = z.infer<typeof DomainSchema>;
export type Protocol = z.infer<typeof ProtocolSchema>;
export type Affordance = z.infer<typeof AffordanceSchema>;
export type EntityType = z.infer<typeof EntityTypeSchema>;
export type AttributeDef = z.infer<typeof AttributeDefSchema>;
