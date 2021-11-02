import { postWithURLAndBody } from "./utils";


export const encryptMessage = async (
    image: File,
    message: string
): Promise<Response> => {
    return postWithURLAndBody(
        "/encrypt/encrypt_message",
        {
            image,
            message,
        }
    );
};

export const decryptMessage = async (
    image: File
): Promise<Response> => {
    return postWithURLAndBody(
        "/decrypt/decrypt_message",
        {
            image,
        }
    );
};
