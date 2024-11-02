import { requestVerifiablePresentation, VerifiablePresentationResponse } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { Principal } from "@dfinity/principal";
import { jwtDecode } from "jwt-decode";
import { CredentialRequestSpec } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { internet_identity_url} from "../lib/constants";

export default function requestVC(userPrincipal: string, course: string): Promise<any> {
    const issuer_canister_id: string = "bu5ax-5iaaa-aaaam-qbgcq-cai";   
    const issuer_frontend_origin_url :string = "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io";
    const credentialType = `Verified ${course} completion on Dacade`;
    const credentialArguments = {
        course: course,
    }
    const vc_spec: CredentialRequestSpec = {
        credentialType: credentialType,
        arguments: credentialArguments
    }

    return new Promise((resolve, reject) => {
        requestVerifiablePresentation({
            onSuccess: async (res: VerifiablePresentationResponse) => {
                try {
                    let token: any;
                    let decodedToken: any
                    if("Ok" in res) {
                        token = res.Ok;
                        decodedToken = jwtDecode(token);
                    } else {
                        reject("Error in presentation response");
                    }
                    resolve(token);
                } catch (error) {
                    reject(error);
                }
            },
            onError: (e: any) => {
                console.log("Error: ", e);
                reject(e); // Reject the promise if there is an error
            },
            issuerData: {
                origin: issuer_frontend_origin_url,
                canisterId: Principal.fromText(issuer_canister_id),
            },
            credentialData: {
                credentialSpec: vc_spec,
                credentialSubject: Principal.fromText(userPrincipal),
            },
            identityProvider: new URL(internet_identity_url),
        });
    });
}
