import { z } from 'zod';
import { DomainSchema, ProtocolSchema, AffordanceSchema, EntityTypeSchema, AttributeDefSchema } from './schemas';
import type { Domain, Protocol, Affordance, EntityType, AttributeDef } from './types';

import domainsRaw from '../data/domains.json';
import protocolsRaw from '../data/protocols.json';
import affordancesRaw from '../data/affordances.json';
import entityTypesRaw from '../data/entity-types.json';
import attributeDefsRaw from '../data/attribute-defs.json';

export function loadDomains(): Domain[] {
  return z.array(DomainSchema).parse(domainsRaw);
}

export function loadProtocols(): Protocol[] {
  return z.array(ProtocolSchema).parse(protocolsRaw);
}

export function loadAffordances(): Affordance[] {
  return z.array(AffordanceSchema).parse(affordancesRaw);
}

export function loadEntityTypes(): EntityType[] {
  return z.array(EntityTypeSchema).parse(entityTypesRaw);
}

export function loadAttributeDefs(): AttributeDef[] {
  return z.array(AttributeDefSchema).parse(attributeDefsRaw);
}

export function loadProtocolsByDomain(domainId: string): Protocol[] {
  return loadProtocols().filter((p) => p.domainIds.includes(domainId));
}

export function loadAffordancesByDomain(domainSlug: string): Affordance[] {
  return loadAffordances().filter((a) => a.domainIds.includes(domainSlug));
}
