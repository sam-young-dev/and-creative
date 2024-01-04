import { ClientInterface } from "@crystallize/js-api-client";
import fetchTenantConfig from "./fetchTenantConfig";

export type CrystallizeAPIContext = {
  apiClient: ClientInterface;
  locale?: string;
  isPreview?: boolean;
  language: string;
};

export const CrystallizeAPI = ({
  apiClient,
  language,
  locale = language,
  isPreview = false,
}: CrystallizeAPIContext) => {
  const version = isPreview ? 'draft' : 'published';

  return {
    fetchTenantConfig: (tenantIdentifier: string) => fetchTenantConfig(apiClient, tenantIdentifier),
  }
}