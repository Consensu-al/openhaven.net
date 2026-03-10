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
});

export const AffordanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  domainIds: z.array(z.string()),
});
