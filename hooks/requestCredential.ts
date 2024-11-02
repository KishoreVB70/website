import { requestVerifiablePresentation, VerifiablePresentationResponse } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { Principal } from "@dfinity/principal";
import { jwtDecode } from "jwt-decode";
import { CredentialRequestSpec } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { internet_identity_url} from "../lib/constants";
import { Credential } from "@/lib/types";

export default function requestVerifiableCredential(userPrincipal: string, courseProp: Credential): Promise<any> {
    const vc_spec: CredentialRequestSpec = courseProp.credentialSpec;

    return new Promise((resolve, reject) => {
        requestVerifiablePresentation({
            onSuccess: async (res: VerifiablePresentationResponse) => {
                try {
                    let token: string;
                    let decodedToken: any;
                    if("Ok" in res) {
                        token = res.Ok;
                        decodedToken = jwtDecode(token);
                        resolve(token);
                    }
                } catch (error) {
                    reject(error);
                }
            },
            onError: (error: any) => {
                console.log("Error: ", error);
                reject(error); // Reject the promise if there is an error
            },
            issuerData: {
                origin: courseProp.derivationUrl,
                canisterId: Principal.fromText(courseProp.canisterId),
            },
            credentialData: {
                credentialSpec: vc_spec,
                credentialSubject: Principal.fromText(userPrincipal),
            },
            identityProvider: new URL(internet_identity_url),
        });
    });
}
