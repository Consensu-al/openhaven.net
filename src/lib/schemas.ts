import { z } from 'zod';

export const DomainSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  isPrimary: z.boolean(),
});

export const ProtocolSchema = z.object({
  id: z.string(),
  name: z.string(),
  domainIds: z.array(z.string()),
  entityType: z.string(),
  description: z.string().optional(),
  devStatus: z.string().optional(),
  owner: z.string().optional(),
  country: z.string().optional(),
  startYear: z.number().int().optional(),
  stack: z.array(z.string()).default([]),
  license: z.string().optional(),
  funding: z.array(z.string()).default([]),
  governanceModel: z.enum(['foundation', 'dao', 'single-company', 'open-standard-body', 'community']),
  captureRisk: z.enum(['low', 'medium', 'high']),
  architectureType: z.enum(['fully-p2p', 'federated', 'hybrid']),
  lastInvestigated: z.string(),
  communityLink: z.string().url().optional(),
  affordanceIds: z.array(z.string()).default([]),
  entityAttributes: z.record(z.string(), z.string().or(z.null())).optional(),
});

export const AffordanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  domainIds: z.array(z.string()),
});

export const EntityTypeSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  abbr: z.string(),
  definition: z.string(),
  examples: z.string().optional(),
});

export const AttributeDefSchema = z.object({
  column: z.string(),
  key: z.string(),
  definition: z.string(),
  formatOptions: z.string().optional(),
  notes: z.string().optional(),
  appliesToEntityTypes: z.array(z.string()),
});
