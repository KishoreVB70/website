import { CredentialRequestSpec } from "@dfinity/verifiable-credentials/request-verifiable-presentation";

export interface Credential {
    id: string;
    name: string;
    description: string;
    issuer: string;
    link: string;
    derivationUrl: string;
    issuerUrl: string;
    credentialSpec: CredentialRequestSpec;
    canisterId: string;
  }
  
  export interface Opportunity {
    id: string;
    postedDate: number;
    title: string;
    description: string;
    company: string;
    requiredCredentials: Credential[];
    markdownContent: string; // New field
  }

export type ICPAuthReturn = {
  loginWithInternetIdentity: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};
