import base64
import cv2
import logging
import json
import os
from http import HTTPStatus
from tkinter import filedialog

import numpy as np
from flask import Flask, jsonify, request

app = Flask(__name__)


def text_to_binary(message):
    """converts the user's inputed message to binary"""
    if isinstance(message, str):
        return "".join([format(ord(i), "08b") for i in message])
    elif isinstance(message, bytes) or isinstance(message, np.ndarray):
        return [format(i, "08b") for i in message]
    elif isinstance(message, int) or isinstance(message, np.uint8):
        return format(message, "08b")
    else:
        raise TypeError("Input type not supported")


def hide_message(image, message):
    """function that hides the message in the image"""
    # calculate the maximum bytes
    n_bytes = image.shape[0] * image.shape[1] * 3 // 8
    print("Maximum bytes to encode : ", n_bytes)

    # cheching if the number of bytes to encode is less then max
    if len(message) > n_bytes:
        raise ValueError("Error: message length is too long for the image")

    message += "~~~~~"

    # convert input data to binary
    binary_message = text_to_binary(message)

    data_index = 0
    data_length = len(binary_message)
    for value in image:
        for pixel in value:
            # converting RGB values to binary
            red, green, blue = text_to_binary(pixel)

            # modify the least significant bit
            if data_index < data_length:
                # hide the data into least significant bit of red pixel
                pixel[0] = int(red[:-1] + binary_message[data_index], 2)
                data_index += 1
            if data_index < data_length:
                # hide the data into least significant bit of green pixel
                pixel[1] = int(green[:-1] + binary_message[data_index], 2)
                data_index += 1
            if data_index < data_length:
                # hide the data into least significant bit of blue pixel
                pixel[2] = int(blue[:-1] + binary_message[data_index], 2)
                data_index += 1

            # if all data is encoded, break loop
            if data_index >= data_length:
                break

    return image


def show_message(image):
    """function that pulls the hidden message from the image"""
    binary_message = ""
    for values in image:
        for pixel in values:
            red, green, blue = text_to_binary(pixel)
            # get all the data from the least significant bits of the red, green, and blue pixels
            binary_message += red[-1]
            binary_message += green[-1]
            binary_message += blue[-1]

    # split by 8 bits
    all_bytes = [binary_message[i : i + 8] for i in range(0, len(binary_message), 8)]

    # convert from bits to chars
    decrypted_message = ""

    for byte in all_bytes:
        decrypted_message += chr(int(byte, 2))

        # checking delimeter we put at the end of the original message,
        #  if so we decrypted the whole message
        if decrypted_message[-5:] == "~~~~~":
            break

    # backend check to test if done properly
    print("\n\n", decrypted_message, "\n\n")

    return decrypted_message[:-5]  # removing delimeter


def save_file(image, file_type):
    """opens the typical save dialog box to save the encrypted image"""
    # give the new image a name, notifying user that this is the new image and to change the name
    file_name = "Secret_Message_CHANGE_NAME" + file_type
    cv2.imwrite(file_name, image)


def get_image(image):
    """saves it locally so we can read it with cv2 as binary array"""
    # splitting the image data from json blob
    image_data_list = image["file"]["thumbUrl"].split(",", 1)

    # getting the base64 data, other part is not part of the image data
    base64_image = image_data_list[1]
    base64_image_bytes = base64_image.encode("utf-8")
    decoded_image_data = base64.decodebytes(base64_image_bytes)

    # writing the temporary image to the current working directory
    temp_image = open(image["file"]["name"], "wb")
    temp_image.write(decoded_image_data)
    temp_image.close()


def delete_temp_image(image):
    """Delete the temp_image that needed to be writen locally"""
    try:
        image_name = image["file"]["name"]
        if os.path.exists(image_name):
            os.remove(image_name)
    except ValueError as error:
        print("Error: Did not delete the temporary image is it existed: ", error)


@app.route("/", methods=["GET", "POST"])
@app.route("/encrypt/encrypt_message", methods=["POST"])
def encrypt_message():
    """Encryption function that is called when button click on the frontend in the encrpyt page"""

    # get the data from the frontend
    try:
        data = request.json
        image = data.get("image")
        image_name = image["file"]["name"]
        get_image(image)
        message = data.get("message")
        if len(message) == 0:
            raise ValueError('Message is empty')
    except ValueError as error:
        logging.error(error)
        return str(error), HTTPStatus.BAD_REQUEST


    # get the temp image and file type
    temp_image = cv2.imread(image_name)
    image_file_type = image_name[-4:]

    # encrypt the message into the image
    encrypted_image = hide_message(temp_image, message)

    # save the new image that has encrypted message
    save_file(encrypted_image, image_file_type)

    # delete the temporary image
    delete_temp_image(image)

    return ("Image saved!"), HTTPStatus.OK


@app.route("/decrypt/decrypt_message", methods=["POST"])
def decrypt_message():
    """Decryption function that is called when button click on the frontend in the decrypt page"""

    # get the data from the frontend
    try:
        data = request.json
        image = data.get("image")
        image_name = image["file"]["name"]
        get_image(image)
    except ValueError as error:
        logging.error(error)
        return str(error), HTTPStatus.BAD_REQUEST

    # get temp steganography image
    temp_image = cv2.imread(image_name)

    # decrypt the message from the image
    decrypted_message = show_message(temp_image)

    print("Decrypted message: ", decrypted_message)

    return (jsonify({"message": decrypted_message}), HTTPStatus.OK)


if __name__ == "__main__":
    app.run(debug=True)
