import { requestVerifiablePresentation, VerifiablePresentationResponse } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { Principal } from "@dfinity/principal";
import { CredentialRequestSpec } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { demo_frontend_url, internet_identity_url} from "@/lib/constants";
import { Credential } from "@/lib/types";
import { popupCenter } from "../utils";

export default function requestVerifiableCredential(userPrincipal: string, courseProp: Credential): Promise<string> {
    const vc_spec: CredentialRequestSpec = courseProp.credentialSpec;

    return new Promise((resolve, reject) => {
        requestVerifiablePresentation({
            onSuccess: async (res: VerifiablePresentationResponse) => {
                try {
                    if("Ok" in res) {
                        const token: string = res.Ok;
                        resolve(token);
                    } else {
                        const error = res.Err;
                        reject(error);
                    }
                } catch(error) {
                    console.log(error);
                    reject("Error in credential process");
                }

            },
            onError: (error) => {
                reject(error);
            },
            issuerData: {
                origin: courseProp.derivationUrl,
                canisterId: Principal.fromText(courseProp.canisterId),
            },
            credentialData: {
                credentialSpec: vc_spec,
                // Principal of the user
                credentialSubject: Principal.fromText(userPrincipal),
            },
            identityProvider: new URL(internet_identity_url),
            windowOpenerFeatures: popupCenter(),
        });
    });
}
